# React Baseline

웹개발 프로젝트의 시작점으로 사용할 수 있는 풀스택 템플릿입니다.

## 🚀 기술 스택

### 프론트엔드
- **React 19** + **TypeScript**
- **Vite** (빠른 개발 서버 & 빌드)
- **shadcn/ui** (현대적인 UI 컴포넌트)
- **Tailwind CSS** (유틸리티 기반 스타일링)

### 백엔드
- **FastAPI** (Python 웹 프레임워크)
- **uvicorn** (ASGI 서버)
- **uv** (Python 패키지 관리)

## 📁 프로젝트 구조

```
react-baseline/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/       # UI 컴포넌트
│   │   │   └── ApiDemo.tsx   # 백엔드 API 연동 데모
│   │   └── App.tsx          # 메인 앱 컴포넌트
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # FastAPI 백엔드
│   ├── src/backend/
│   │   └── main.py          # FastAPI 애플리케이션
│   ├── assets/              # 백엔드 전용 정적 파일 (Git 추적)
│   │   ├── images/          # 서버 이미지들
│   │   ├── docs/            # API 문서, 스키마 파일
│   │   └── README.md        # 백엔드 assets 사용법
│   ├── static/              # 프론트엔드 빌드 파일 (Git 무시)
│   ├── run_dev.py           # 개발 서버 실행 스크립트
│   └── pyproject.toml       # uv 프로젝트 설정
├── run_dev.sh               # 개발 환경 실행 스크립트
├── build_and_run.sh         # 프로덕션 빌드 & 실행 스크립트
└── README.md
```

## 📂 정적 파일 관리

### 백엔드 전용 정적 파일 (Git 추적됨)
- **경로**: `backend/assets/`
- **접근**: `/backend-assets/*`
- **용도**: 서버 로고, API 문서, 이메일 템플릿 등

### 프론트엔드 빌드 파일 (Git 무시됨)
- **경로**: `backend/static/`
- **접근**: `/` (React 앱), `/assets/*` (CSS, JS)
- **용도**: 빌드된 React 애플리케이션

### 예시
```bash
# 백엔드 정적 파일
curl http://localhost:8000/backend-assets/docs/api-info.json

# 프론트엔드 애플리케이션
curl http://localhost:8000/  # React 앱
curl http://localhost:8000/assets/main.js  # 번들 파일
```

## 🛠️ 설치 및 실행

### 사전 요구사항

- **Node.js** 18+ 및 **npm**
- **Python** 3.11+
- **uv** (Python 패키지 관리 도구)

```bash
# uv 설치 (없는 경우)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 설치 확인
uv --version
```

### 1. 의존성 설치

```bash
# 프론트엔드 의존성 설치
cd frontend
npm install
cd ..

# 백엔드 의존성 설치
cd backend
uv sync
cd ..
```

## 🚀 실행 방법

### 개발 환경 (Development)

**특징**: 프론트엔드와 백엔드가 별도 포트에서 실행되며, 핫 리로드가 지원됩니다.

#### 방법 1: 통합 스크립트 사용 (추천)

```bash
./run_dev.sh
```

이 스크립트는 다음을 자동으로 수행합니다:
- 백엔드 서버 시작 (포트 8000)
- 프론트엔드 개발 서버 시작 (포트 5173)
- Ctrl+C로 모든 서버 한번에 종료

#### 방법 2: 수동으로 각각 실행

**터미널 1 - 백엔드 서버:**
```bash
cd backend
uv run python run_dev.py
```

**터미널 2 - 프론트엔드 서버:**
```bash
cd frontend
npm run dev
```

#### 개발 환경 접속 URL

- **프론트엔드**: http://localhost:5173
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs

### 프로덕션 환경 (Production)

**특징**: 프론트엔드가 빌드되어 백엔드 서버에서 통합 서빙됩니다.

#### 방법 1: 통합 스크립트 사용 (추천)

```bash
./build_and_run.sh
```

이 스크립트는 다음을 자동으로 수행합니다:
- 프론트엔드 빌드 (`npm run build`)
- 빌드된 파일을 백엔드 static 폴더로 복사
- 통합 서버 시작

#### 방법 2: 수동 빌드 및 실행

```bash
# 1. 프론트엔드 빌드
cd frontend
npm run build
cd ..

# 2. 빌드된 파일을 백엔드로 복사
cp -r frontend/dist backend/static

# 3. 백엔드 서버 시작
cd backend
uv run python run_dev.py
```

#### 프로덕션 환경 접속 URL

- **통합 서버**: http://localhost:8000 (프론트엔드 + 백엔드)
- **API 문서**: http://localhost:8000/docs

## 🎯 주요 기능

### 프론트엔드

- **shadcn/ui 컴포넌트**: 현대적이고 접근성 높은 UI 컴포넌트
- **백엔드 API 연동**: 실시간 CRUD 작업 데모
- **반응형 디자인**: Tailwind CSS 기반 모바일 친화적 디자인
- **자동 환경 감지**: 개발/프로덕션 환경에 따른 API URL 자동 설정

### 백엔드

- **RESTful API**: 완전한 CRUD 작업을 위한 REST API
- **자동 API 문서**: Swagger UI 및 ReDoc 지원
- **CORS 설정**: 프론트엔드 연결을 위한 완전한 CORS 지원
- **정적 파일 서빙**: 프로덕션 환경에서 React 앱 서빙
- **디버깅 도구**: 프로덕션 환경 문제 해결을 위한 상태 확인 엔드포인트

#### API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/` | API 기본 정보 |
| GET | `/health` | 헬스 체크 |
| GET | `/api/items` | 모든 아이템 조회 |
| POST | `/api/items` | 새 아이템 생성 |
| GET | `/api/items/{id}` | 특정 아이템 조회 |
| DELETE | `/api/items/{id}` | 아이템 삭제 |
| POST | `/api/dev/seed` | 테스트 데이터 생성 |
| GET | `/api/dev/status` | 프로덕션 환경 상태 확인 |

## 🔧 개발 팁

### 코드 변경 시 자동 재시작

- **프론트엔드**: Vite가 자동으로 핫 리로드 제공
- **백엔드**: uvicorn의 `--reload` 옵션으로 자동 재시작

### API 테스트

```bash
# 헬스 체크
curl http://localhost:8000/health

# 테스트 데이터 생성
curl -X POST http://localhost:8000/api/dev/seed

# 아이템 목록 조회
curl http://localhost:8000/api/items

# 새 아이템 생성
curl -X POST http://localhost:8000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "새 아이템", "description": "설명"}'
```

### 프론트엔드 컴포넌트 추가

```bash
# shadcn/ui 컴포넌트 추가
cd frontend
npx shadcn@latest add [컴포넌트명]
```

## 🔄 개발 워크플로우

### 일반적인 개발 과정

1. **개발 시작**: `./run_dev.sh` 실행
2. **프론트엔드 개발**: `frontend/src/` 에서 React 컴포넌트 작업
3. **백엔드 개발**: `backend/src/backend/` 에서 API 엔드포인트 추가
4. **테스트**: 브라우저와 API 문서에서 기능 확인
5. **프로덕션 빌드**: `./build_and_run.sh` 실행하여 통합 테스트

### 프로덕션 배포

프로덕션 환경에서는 다음과 같이 배포할 수 있습니다:

1. **빌드**: `./build_and_run.sh` 실행
2. **서버 배포**: `backend/` 폴더와 생성된 `static/` 폴더를 서버에 업로드
3. **실행**: 서버에서 `uv run python run_dev.py` 실행

## 🔍 문제 해결

프로덕션 환경에서 문제가 발생하면 `PRODUCTION_TROUBLESHOOTING.md` 파일을 참고하세요.

## 📚 참고 자료

- [React 공식 문서](https://reactjs.org/)
- [FastAPI 공식 문서](https://fastapi.tiangolo.com/)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [uv 패키지 관리자](https://docs.astral.sh/uv/)

## 🤝 기여하기

이 템플릿을 개선하고 싶다면:

1. Fork 후 브랜치 생성
2. 기능 개발 또는 버그 수정
3. 테스트 확인
4. Pull Request 생성

---

**🎉 이제 여러분만의 웹 애플리케이션을 만들어보세요!** 