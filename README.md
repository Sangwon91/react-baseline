# 🚀 Tech Blog - React + shadcn UI

현대적인 웹 기술로 구축된 기술 블로그입니다. React Router를 사용한 SPA(Single Page Application) 구조로, shadcn UI 컴포넌트를 활용하여 아름다우면서도 접근성 높은 사용자 인터페이스를 제공합니다.

## ✨ 주요 기능

### 📝 블로그 시스템
- **마크다운 지원**: GitHub Flavored Markdown(GFM)으로 풍부한 콘텐츠 작성
- **태그 시스템**: 글을 카테고리별로 분류 및 필터링
- **검색 기능**: 제목과 내용을 기반으로 한 실시간 검색
- **읽기 시간**: 각 글의 예상 읽기 시간 표시
- **네비게이션**: 이전/다음 글로 쉽게 이동

### 🎨 사용자 인터페이스
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화
- **다크/라이트 모드**: shadcn UI의 테마 시스템 활용
- **애니메이션**: 부드러운 전환 효과와 호버 상태
- **접근성**: 키보드 내비게이션 및 스크린 리더 지원

## 🛠️ 기술 스택

### 프론트엔드
- **React 19.1.0**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성과 개발 생산성 향상
- **Vite**: 빠른 개발 서버와 최적화된 빌드
- **React Router v7**: 클라이언트 사이드 라우팅

### UI/UX
- **shadcn UI**: 복사/붙여넣기 방식의 컴포넌트 라이브러리
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **Lucide React**: 일관된 아이콘 시스템
- **Radix UI**: 접근성 높은 기본 컴포넌트

### 콘텐츠 처리
- **React Markdown**: 마크다운 렌더링
- **Remark GFM**: GitHub Flavored Markdown 지원

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Layout.tsx          # 공통 레이아웃 (헤더, 푸터, 네비게이션)
│   └── ui/                 # shadcn UI 컴포넌트들
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       └── separator.tsx
├── pages/
│   ├── HomePage.tsx        # 메인 페이지
│   ├── BlogPage.tsx        # 블로그 목록 페이지
│   ├── BlogPostPage.tsx    # 개별 글 페이지
│   └── AboutPage.tsx       # 소개 페이지
├── data/
│   └── posts.ts           # 블로그 글 데이터와 유틸리티 함수
├── App.tsx                # 라우터 설정
└── main.tsx              # 앱 진입점
```

## 🎯 페이지별 기능

### 🏠 홈페이지 (`/`)
- 영웅 섹션: 블로그 소개와 CTA 버튼
- 최근 글: 최신 3개 글 카드 형태로 표시
- 주요 주제: React, UI/UX, 개발 도구 섹션

### 📚 블로그 목록 (`/blog`)
- 모든 글 그리드 레이아웃으로 표시
- 실시간 검색 (제목, 내용 기반)
- 태그별 필터링
- 글 개수 및 통계 정보

### 📖 개별 글 (`/blog/:slug`)
- 마크다운 콘텐츠 렌더링
- 코드 하이라이팅 지원
- 태그 표시 및 메타 정보
- 이전/다음 글 네비게이션
- 공유 기능 (준비됨)

### 👤 소개 페이지 (`/about`)
- 개발자 프로필
- 기술 스택 배지
- 주요 성과 카드
- 경력 타임라인

## 🚀 시작하기

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 개발 환경
- Node.js 20+ 권장 (현재 v18.18.0에서도 동작)
- 최신 브라우저 지원
- VS Code + TypeScript 확장 권장

## 📝 콘텐츠 관리

### 새 글 추가
`src/data/posts.ts` 파일의 `blogPosts` 배열에 새 객체 추가:

```typescript
{
  slug: 'unique-post-slug',
  title: '글 제목',
  date: '2024-01-15',
  excerpt: '글 요약',
  content: `마크다운 형식의 본문`,
  tags: ['React', 'TypeScript'],
  readTime: 5
}
```

### 마크다운 문법 지원
- 제목 (H1-H6)
- 강조 (**굵게**, *기울임*)
- 코드 블록 및 인라인 코드
- 링크 및 이미지
- 목록 (순서/무순서)
- 인용구
- 테이블 (GFM)

## 🎨 커스터마이징

### 테마 변경
`src/index.css`에서 CSS 변수 수정:
```css
:root {
  --primary: 222.2 84% 4.9%;
  --secondary: 210 40% 96%;
  /* ... */
}
```

### 컴포넌트 추가
```bash
# shadcn UI 컴포넌트 추가
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## 🔧 주요 기능 구현

### 라우팅
- React Router v7 사용
- 동적 라우팅 (`/blog/:slug`)
- 404 페이지 처리
- 네비게이션 상태 관리

### 검색 및 필터링
```typescript
const filteredPosts = allPosts.filter(post => {
  const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
  return matchesSearch && matchesTag
})
```

### 마크다운 렌더링
- 커스텀 컴포넌트 매핑
- 코드 블록 스타일링
- 외부 링크 처리
- 반응형 이미지

## 📱 반응형 디자인

- **모바일**: 320px+
- **태블릿**: 768px+
- **데스크톱**: 1024px+
- **와이드**: 1280px+

Tailwind CSS의 브레이크포인트를 활용한 완전 반응형 구현

## 🚀 배포

### Vercel (권장)
```bash
npm run build
# Vercel CLI 또는 GitHub 연동으로 배포
```

### Netlify
```bash
npm run build
# dist 폴더 업로드 또는 Git 연동
```

### GitHub Pages
```bash
npm run build
# dist 폴더를 gh-pages 브랜치로 배포
```

## 🤝 기여하기

1. 프로젝트 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🙏 감사의 말

- [shadcn](https://ui.shadcn.com/) - 훌륭한 UI 컴포넌트 라이브러리
- [Radix UI](https://www.radix-ui.com/) - 접근성 높은 기본 컴포넌트
- [Tailwind CSS](https://tailwindcss.com/) - 유연한 CSS 프레임워크
- [Lucide](https://lucide.dev/) - 아름다운 아이콘 라이브러리

---

**Made with ❤️ using React, TypeScript, and shadcn UI**
