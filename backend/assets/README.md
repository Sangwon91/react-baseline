# Backend Assets

이 폴더는 **백엔드 전용 정적 파일**을 저장하는 곳입니다.

## 📁 폴더 구조

```
backend/
├── assets/          # 백엔드 전용 정적 파일 (Git 추적됨)
│   ├── images/      # 서버에서 제공하는 이미지들
│   ├── docs/        # API 문서, 스키마 파일 등
│   └── templates/   # 이메일 템플릿, HTML 템플릿 등
└── static/          # 프론트엔드 빌드 파일 (Git 무시됨)
    ├── index.html   # React 앱 메인 파일
    └── assets/      # CSS, JS 번들 파일들
```

## 🎯 사용 예시

### 백엔드 정적 파일 (이 폴더)
- 로고 이미지: `/backend-assets/logo.png`
- API 스키마: `/backend-assets/api-schema.json`
- 이메일 템플릿: `assets/templates/welcome.html`

### 프론트엔드 빌드 파일 (`static/` 폴더)
- React 앱: `/`
- CSS/JS 번들: `/assets/main-abc123.js`

## 📝 FastAPI 설정

```python
# 백엔드 assets 서빙
app.mount("/backend-assets", StaticFiles(directory="assets"), name="backend-assets")

# 프론트엔드 빌드 파일 서빙
app.mount("/assets", StaticFiles(directory="static/assets"), name="frontend-assets")
``` 