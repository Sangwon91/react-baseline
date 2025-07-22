from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import os

# FastAPI 앱 인스턴스 생성
app = FastAPI(
    title="React Baseline Backend",
    description="웹개발 프로젝트 템플릿용 간단한 FastAPI 백엔드",
    version="1.0.0"
)

# CORS 설정 (프론트엔드 연결을 위해)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React 개발 서버 포트들
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 경로 설정
STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "static")
BACKEND_ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "assets")

# 데이터 모델들
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    created_at: Optional[datetime] = None

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

# 간단한 인메모리 데이터 저장소
items_db: List[Item] = []
next_id = 1

# 루트 엔드포인트
@app.get("/")
async def root():
    return {
        "message": "React Baseline Backend API",
        "version": "1.0.0",
        "status": "running"
    }

# Health Check 엔드포인트
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

# API 정보 엔드포인트
@app.get("/api/info")
async def api_info():
    return {
        "api_name": "React Baseline Backend",
        "endpoints": [
            "GET /",
            "GET /health",
            "GET /api/info",
            "GET /api/items",
            "POST /api/items",
            "GET /api/items/{item_id}",
            "DELETE /api/items/{item_id}"
        ]
    }

# 아이템 목록 조회
@app.get("/api/items", response_model=List[Item])
async def get_items():
    return items_db

# 아이템 생성
@app.post("/api/items", response_model=Item)
async def create_item(item: ItemCreate):
    global next_id
    new_item = Item(
        id=next_id,
        name=item.name,
        description=item.description,
        created_at=datetime.now()
    )
    items_db.append(new_item)
    next_id += 1
    return new_item

# 특정 아이템 조회
@app.get("/api/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

# 아이템 삭제
@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    global items_db
    original_length = len(items_db)
    items_db = [item for item in items_db if item.id != item_id]
    if len(items_db) == original_length:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": f"Item {item_id} deleted successfully"}

# 개발용 테스트 데이터 생성 엔드포인트
@app.post("/api/dev/seed")
async def seed_data():
    global items_db, next_id
    
    # 기존 데이터 초기화
    items_db.clear()
    next_id = 1
    
    # 테스트 데이터 생성
    sample_items = [
        ItemCreate(name="첫 번째 아이템", description="테스트용 첫 번째 아이템입니다."),
        ItemCreate(name="두 번째 아이템", description="테스트용 두 번째 아이템입니다."),
        ItemCreate(name="세 번째 아이템", description="테스트용 세 번째 아이템입니다.")
    ]
    
    created_items = []
    for item_data in sample_items:
        new_item = Item(
            id=next_id,
            name=item_data.name,
            description=item_data.description,
            created_at=datetime.now()
        )
        items_db.append(new_item)
        created_items.append(new_item)
        next_id += 1
    
    return {
        "message": "테스트 데이터가 생성되었습니다.",
        "created_items": created_items
    }

# 프로덕션 환경 디버깅용 엔드포인트
@app.get("/api/dev/status")
async def production_status():
    """프로덕션 환경의 파일 상태를 확인합니다."""
    status = {
        "static_dir_exists": os.path.exists(STATIC_DIR),
        "static_dir_path": STATIC_DIR,
        "backend_assets_dir_exists": os.path.exists(BACKEND_ASSETS_DIR),
        "backend_assets_dir_path": BACKEND_ASSETS_DIR,
        "index_html_exists": False,
        "frontend_assets_dir_exists": False,
        "files_in_static": [],
        "files_in_backend_assets": []
    }
    
    if os.path.exists(STATIC_DIR):
        status["files_in_static"] = os.listdir(STATIC_DIR)
        status["index_html_exists"] = os.path.exists(os.path.join(STATIC_DIR, "index.html"))
        status["frontend_assets_dir_exists"] = os.path.exists(os.path.join(STATIC_DIR, "assets"))
    
    if os.path.exists(BACKEND_ASSETS_DIR):
        status["files_in_backend_assets"] = os.listdir(BACKEND_ASSETS_DIR)
    
    return status

# 정적 파일 서빙 설정
# 1. 백엔드 전용 정적 파일 (항상 서빙)
if os.path.exists(BACKEND_ASSETS_DIR):
    app.mount("/backend-assets", StaticFiles(directory=BACKEND_ASSETS_DIR), name="backend-assets")

# 2. 프론트엔드 빌드 파일 (프로덕션 환경)
if os.path.exists(STATIC_DIR):
    # assets 폴더가 있으면 마운트 (CSS, JS 파일들)
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="frontend-assets")
    
    # vite.svg, favicon 등 루트 레벨 정적 파일들 서빙
    @app.get("/vite.svg")
    async def serve_vite_svg():
        file_path = os.path.join(STATIC_DIR, "vite.svg")
        if os.path.exists(file_path):
            return FileResponse(file_path)
        raise HTTPException(status_code=404, detail="File not found")
    
    @app.get("/favicon.ico")
    async def serve_favicon():
        file_path = os.path.join(STATIC_DIR, "favicon.ico")
        if os.path.exists(file_path):
            return FileResponse(file_path)
        raise HTTPException(status_code=404, detail="File not found")

# 프로덕션 환경: React 앱의 index.html 서빙 (SPA 라우팅)
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """
    프로덕션 환경에서 React 앱을 서빙합니다.
    모든 경로에 대해 index.html을 반환하여 React Router가 클라이언트 사이드 라우팅을 처리할 수 있게 합니다.
    """
    # API 경로와 문서 경로, 정적 파일 경로는 제외
    if (full_path.startswith("api/") or 
        full_path in ["health", "docs", "redoc", "openapi.json"] or
        full_path.startswith("assets/") or
        full_path.startswith("backend-assets/") or
        full_path in ["vite.svg", "favicon.ico"]):
        raise HTTPException(status_code=404, detail="Not found")
    
    # 정적 파일 경로에 index.html이 있는지 확인
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    else:
        return {
            "message": "React 앱이 빌드되지 않았습니다.", 
            "instructions": "다음 명령어를 실행해주세요: ./build_and_run.sh"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 