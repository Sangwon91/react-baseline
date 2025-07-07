import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllPosts } from '@/data/posts'
import { ArrowRight, Clock, Calendar } from "lucide-react"

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          개발자의 기술 블로그
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          현대적인 웹 개발 기술, 도구, 그리고 경험을 공유합니다. 
          React, TypeScript, 그리고 최신 프론트엔드 생태계에 대한 인사이트를 만나보세요.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/blog">
            <Button size="lg" className="gap-2">
              모든 글 보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              소개 보기
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">최근 글</h2>
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              모든 글 보기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}분 읽기
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">주요 주제</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚛️</span>
              </div>
              <CardTitle>React & TypeScript</CardTitle>
              <CardDescription>
                현대적인 React 개발과 TypeScript를 활용한 타입 안전한 코드 작성법
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>UI/UX 개발</CardTitle>
              <CardDescription>
                shadcn UI, Tailwind CSS를 활용한 아름답고 접근성 높은 인터페이스 구축
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <CardTitle>개발 도구</CardTitle>
              <CardDescription>
                Vite, 빌드 도구, 그리고 개발 생산성을 높이는 다양한 도구들
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
} 