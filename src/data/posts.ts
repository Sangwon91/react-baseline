export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'shadcn-ui-guide',
    title: 'shadcn UI와 React로 현대적인 UI 만들기',
    date: '2024-01-15',
    excerpt: 'shadcn UI를 사용하여 아름답고 접근성 높은 React 컴포넌트를 만드는 방법을 알아보세요.',
    tags: ['React', 'shadcn', 'UI/UX', 'TypeScript'],
    readTime: 5,
    content: `
# shadcn UI와 React로 현대적인 UI 만들기

shadcn UI는 단순한 컴포넌트 라이브러리가 아닙니다. 이는 **copy & paste** 방식으로 동작하는 혁신적인 접근법입니다.

## 주요 특징

### 1. 완전한 코드 소유권
- 컴포넌트 코드가 프로젝트에 직접 복사됩니다
- 자유로운 커스터마이징이 가능합니다
- 외부 라이브러리 의존성에서 벗어날 수 있습니다

### 2. Radix UI 기반
- 접근성(Accessibility)이 보장됩니다
- 키보드 내비게이션을 지원합니다
- 스크린 리더와 호환됩니다

### 3. Tailwind CSS 통합
\`\`\`typescript
import { Button } from "@/components/ui/button"

function App() {
  return (
    <Button variant="outline" size="lg">
      클릭하세요
    </Button>
  )
}
\`\`\`

## 설치 및 설정

1. **shadcn CLI 초기화**
\`\`\`bash
npx shadcn@latest init
\`\`\`

2. **컴포넌트 추가**
\`\`\`bash
npx shadcn@latest add button card
\`\`\`

## 실제 사용 예시

### 카드 컴포넌트
\`\`\`typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogCard({ title, content }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  )
}
\`\`\`

## 결론

shadcn UI는 현대적인 React 개발에서 매우 유용한 도구입니다. 특히 디자인 시스템을 구축하거나 빠른 프로토타이핑이 필요할 때 강력한 성능을 발휘합니다.
`
  },
  {
    slug: 'react-router-spa',
    title: 'React Router로 SPA 라우팅 마스터하기',
    date: '2024-01-10',
    excerpt: 'React Router v6의 주요 기능과 SPA에서 효과적인 라우팅 구현 방법을 살펴봅니다.',
    tags: ['React', 'Router', 'SPA', 'Navigation'],
    readTime: 7,
    content: `
# React Router로 SPA 라우팅 마스터하기

Single Page Application(SPA)에서 라우팅은 사용자 경험의 핵심입니다. React Router는 이를 위한 최고의 솔루션 중 하나입니다.

## React Router v6의 주요 변화

### 1. Routes와 Route
이전 버전의 \`Switch\`가 \`Routes\`로 변경되었습니다.

\`\`\`typescript
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}
\`\`\`

### 2. useNavigate Hook
\`useHistory\`가 \`useNavigate\`로 대체되었습니다.

\`\`\`typescript
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()
  
  const handleLogin = () => {
    // 로그인 로직
    navigate('/dashboard')
  }
  
  return <button onClick={handleLogin}>로그인</button>
}
\`\`\`

## 고급 라우팅 패턴

### 1. 중첩 라우팅
\`\`\`typescript
<Routes>
  <Route path="/blog" element={<BlogLayout />}>
    <Route index element={<BlogList />} />
    <Route path=":slug" element={<BlogPost />} />
  </Route>
</Routes>
\`\`\`

### 2. 보호된 라우트
\`\`\`typescript
function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth()
  
  return isAuthenticated ? children : <Navigate to="/login" />
}
\`\`\`

## 성능 최적화

### 코드 스플리팅
\`\`\`typescript
import { lazy, Suspense } from 'react'

const BlogPost = lazy(() => import('./BlogPost'))

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  )
}
\`\`\`

React Router는 현대적인 웹 애플리케이션 개발에서 필수적인 도구입니다. 적절한 사용으로 뛰어난 사용자 경험을 제공할 수 있습니다.
`
  },
  {
    slug: 'vite-react-setup',
    title: 'Vite로 React 개발 환경 구축하기',
    date: '2024-01-05',
    excerpt: 'Vite를 사용하여 빠르고 현대적인 React 개발 환경을 구축하는 방법을 알아보세요.',
    tags: ['Vite', 'React', 'Build Tool', 'Development'],
    readTime: 6,
    content: `
# Vite로 React 개발 환경 구축하기

Vite는 차세대 프론트엔드 빌드 도구로, 개발 중에는 ES 모듈을 활용하고 프로덕션에서는 Rollup으로 번들링합니다.

## Vite의 장점

### 1. 빠른 개발 서버
- **콜드 스타트 시간** 단축
- **핫 모듈 리플레이스먼트(HMR)** 최적화
- 파일 변경 시 즉시 반영

### 2. 최적화된 빌드
\`\`\`bash
npm run build
\`\`\`

## 프로젝트 설정

### 기본 설치
\`\`\`bash
npm create vite@latest my-react-app --template react-ts
cd my-react-app
npm install
\`\`\`

### vite.config.ts 설정
\`\`\`typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
\`\`\`

## 유용한 플러그인들

### 1. Tailwind CSS
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### 2. Path Alias
절대 경로 임포트가 가능해집니다:
\`\`\`typescript
import { Button } from '@/components/ui/button'
\`\`\`

## 성능 최적화

### 청크 분할
\`\`\`typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
\`\`\`

### 환경 변수
\`\`\`.env
VITE_API_URL=https://api.example.com
\`\`\`

\`\`\`typescript
const apiUrl = import.meta.env.VITE_API_URL
\`\`\`

Vite는 현대적인 React 애플리케이션 개발을 위한 최고의 선택 중 하나입니다. 빠른 개발 경험과 최적화된 프로덕션 빌드를 동시에 제공합니다.
`
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
} 