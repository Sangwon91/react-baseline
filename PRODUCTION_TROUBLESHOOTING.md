# 프로덕션 환경 문제 해결 가이드

React Baseline 프로덕션 환경에서 웹페이지가 표시되지 않는 문제를 해결하는 방법입니다.

## 📁 폴더 구조 이해

```
backend/
├── assets/          # 백엔드 전용 정적 파일 (Git 추적됨)
│   ├── images/      # 서버 이미지들
│   ├── docs/        # API 문서 등
│   └── README.md    # 사용법 안내
└── static/          # 프론트엔드 빌드 파일 (Git 무시됨)
    ├── index.html   # React 앱
    └── assets/      # CSS, JS 번들
```

## 🔍 문제 진단하기

### 1단계: 백엔드 서버 상태 확인

프로덕션 서버가 실행된 후 다음 URL들을 브라우저에서 확인해보세요:

```
http://localhost:8000/health
```
**예상 결과**: `{"status": "healthy", "timestamp": "..."}`

```
http://localhost:8000/api/dev/status
```
**예상 결과**: 정적 파일 상태 정보

```
http://localhost:8000/backend-assets/docs/api-info.json
```
**예상 결과**: 백엔드 API 정보 (백엔드 정적 파일 테스트)

### 2단계: 정적 파일 상태 확인

`/api/dev/status` 엔드포인트의 응답을 확인하세요:

```json
{
  "static_dir_exists": true,
  "static_dir_path": "/path/to/backend/static",
  "backend_assets_dir_exists": true,
  "backend_assets_dir_path": "/path/to/backend/assets",
  "index_html_exists": true,
  "frontend_assets_dir_exists": true,
  "files_in_static": ["index.html", "assets", "vite.svg"],
  "files_in_backend_assets": ["README.md", "docs", "images"]
}
```

## 🛠️ 문제별 해결방법

### 문제 1: `static_dir_exists: false`

**원인**: 프론트엔드가 빌드되지 않았거나 파일이 복사되지 않음

**해결방법**:
```bash
# 프로젝트 루트에서 실행
./build_and_run.sh
```

또는 수동으로:
```bash
cd frontend
npm run build
cd ..
cp -r frontend/dist backend/static
```

### 문제 2: `backend_assets_dir_exists: false`

**원인**: Git 클론 후 backend/assets 폴더가 없음

**해결방법**:
```bash
mkdir -p backend/assets/images backend/assets/docs
```

### 문제 3: `index_html_exists: false`

**원인**: 빌드된 파일이 제대로 복사되지 않음

**해결방법**:
```bash
# 빌드 폴더 확인
ls -la frontend/dist/

# 백엔드 static 폴더 확인
ls -la backend/static/

# 수동 복사
rm -rf backend/static
cp -r frontend/dist backend/static
```

### 문제 4: 웹페이지는 뜨지만 스타일이 깨짐

**원인**: CSS/JS 파일들이 제대로 로드되지 않음

**해결방법**:
1. 브라우저 개발자 도구 열기 (F12)
2. Network 탭에서 실패한 요청 확인
3. frontend assets 폴더가 제대로 생성되었는지 확인:
   ```bash
   ls -la backend/static/assets/
   ```

### 문제 5: API 연동이 안됨

**원인**: 프론트엔드에서 잘못된 API URL 사용

**확인방법**:
1. 브라우저 개발자 도구 → Console 탭
2. 네트워크 요청 오류 확인

**해결방법**: 이미 수정되었음 (동적 URL 설정)

## 🔧 수동 디버깅 단계

### 1. 빌드 폴더 내용 확인
```bash
cd frontend
npm run build
ls -la dist/
```

예상 결과:
```
index.html
assets/
vite.svg
```

### 2. 복사 과정 확인
```bash
cp -r frontend/dist backend/static
ls -la backend/static/
ls -la backend/assets/
```

### 3. 서버 재시작
```bash
cd backend
uv run python run_dev.py
```

### 4. 브라우저에서 확인
- http://localhost:8000 (메인 페이지)
- http://localhost:8000/api/dev/status (상태 확인)
- http://localhost:8000/backend-assets/docs/api-info.json (백엔드 정적 파일 확인)

## 🚨 일반적인 실수들

### 1. 빌드하지 않고 서버 실행
```bash
# ❌ 잘못된 방법
cd backend
uv run python run_dev.py

# ✅ 올바른 방법
./build_and_run.sh
```

### 2. 파일 복사 경로 실수
```bash
# ❌ 잘못된 복사
cp -r frontend/dist/* backend/static/

# ✅ 올바른 복사
cp -r frontend/dist backend/static
```

### 3. backend/static을 Git에 추가
```bash
# ✅ 올바른 .gitignore 설정
echo "backend/static/" >> .gitignore
```

### 4. 캐시 문제
브라우저 캐시를 강제 새로고침: `Ctrl+F5` (Windows) 또는 `Cmd+Shift+R` (Mac)

## 📝 최종 체크리스트

- [ ] `./build_and_run.sh` 실행했는가?
- [ ] `/api/dev/status`에서 모든 파일이 `true`인가?
- [ ] `backend/static/`이 .gitignore에 추가되었는가?
- [ ] 브라우저 개발자 도구에서 404 오류가 없는가?
- [ ] 서버 콘솔에 오류가 없는가?

## 🆘 여전히 안되면...

다음 정보를 확인해서 보고해주세요:

1. `/api/dev/status` 응답 전체
2. 브라우저 개발자 도구 Console 탭의 오류
3. 브라우저 개발자 도구 Network 탭의 실패한 요청들
4. `ls -la backend/static/` 결과
5. `ls -la backend/assets/` 결과 