# React Baseline Backend

웹개발 프로젝트 템플릿용 간단한 FastAPI 백엔드입니다.

## 기능

- FastAPI 기반의 REST API
- CORS 설정으로 프론트엔드 연결 지원
- 간단한 CRUD가 가능한 아이템 관리 API
- 자동 API 문서 생성 (Swagger UI)
- 개발용 테스트 데이터 시딩

## 요구사항

- Python 3.11+
- uv (패키지 관리)

## 설치 및 실행

### 1. 의존성 설치

```bash
# backend 폴더로 이동
cd backend

# uv를 사용해 의존성 설치
uv sync
```

### 2. 개발 서버 실행

```bash
# 방법 1: Python 스크립트 사용
uv run python run_dev.py

# 방법 2: uvicorn 직접 사용
uv run uvicorn src.backend.main:app --host 0.0.0.0 --port 8000 --reload
```

서버가 시작되면 다음 URL에서 접근할 수 있습니다:

- **API 서버**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs
- **ReDoc 문서**: http://localhost:8000/redoc

## API 엔드포인트

### 기본 엔드포인트
- `GET /` - API 기본 정보
- `GET /health` - 헬스 체크
- `GET /api/info` - API 정보 및 사용 가능한 엔드포인트 목록

### 아이템 관리 API
- `GET /api/items` - 모든 아이템 조회
- `POST /api/items` - 새 아이템 생성
- `GET /api/items/{item_id}` - 특정 아이템 조회
- `DELETE /api/items/{item_id}` - 아이템 삭제

### 개발 도구
- `POST /api/dev/seed` - 테스트 데이터 생성

## 프론트엔드 연결

이 백엔드는 다음 포트에서 실행되는 프론트엔드와 연결할 수 있도록 CORS가 설정되어 있습니다:
- http://localhost:3000 (Create React App)
- http://localhost:5173 (Vite)

## 개발 참고사항

- 코드는 `src/backend/` 폴더에 위치합니다
- 메인 애플리케이션 파일: `src/backend/main.py`
- 개발 모드에서는 코드 변경 시 자동으로 서버가 재시작됩니다
- 데이터는 인메모리에 저장되므로 서버 재시작 시 초기화됩니다

## 예시 사용법

### 테스트 데이터 생성
```bash
curl -X POST http://localhost:8000/api/dev/seed
```

### 아이템 생성
```bash
curl -X POST http://localhost:8000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "새 아이템", "description": "설명"}'
```

### 아이템 목록 조회
```bash
curl http://localhost:8000/api/items
```
