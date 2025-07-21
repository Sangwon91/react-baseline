from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

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
    return {"error": "Item not found"}

# 아이템 삭제
@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    global items_db
    items_db = [item for item in items_db if item.id != item_id]
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 