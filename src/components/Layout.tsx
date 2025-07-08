import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/mode-toggle"
import { 
  Home, 
  BookOpen, 
  User, 
  Github, 
  Twitter,
  Mail
} from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Tech Blog</h1>
                <p className="text-xs text-muted-foreground">개발자의 기술 여행기</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/">
                  <Button 
                    variant={isActiveRoute('/') ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Home className="w-4 h-4" />
                    홈
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button 
                    variant={isActiveRoute('/blog') ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    블로그
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    variant={isActiveRoute('/about') ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    소개
                  </Button>
                </Link>
              </nav>

              <ModeToggle />

              {/* Mobile menu button - 실제 구현시 상태 관리 필요 */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <BookOpen className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Tech Blog</h3>
              <p className="text-sm text-muted-foreground">
                현대적인 웹 개발 기술과 경험을 공유하는 공간입니다.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">빠른 링크</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground">
                  홈
                </Link>
                <Link to="/blog" className="block text-sm text-muted-foreground hover:text-foreground">
                  모든 글
                </Link>
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground">
                  소개
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">연결</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Tech Blog. shadcn UI와 React Router로 제작되었습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 