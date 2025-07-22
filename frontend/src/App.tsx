import './App.css'
import { ApiDemo } from './components/ApiDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더 섹션 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Avatar>
              <AvatarFallback>
                <Star className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">
                React Baseline
              </h1>
              <p className="text-muted-foreground text-sm">FastAPI + React 풀스택 템플릿</p>
            </div>
          </div>
        </div>

        {/* API 연동 데모 */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle>백엔드 API 연동 데모</CardTitle>
              <CardDescription>
                FastAPI 백엔드와 React 프론트엔드가 실시간으로 통신하는 예제입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiDemo />
            </CardContent>
          </Card>
        </div>

        {/* 푸터 */}
        <div className="text-center mt-12 text-muted-foreground text-sm">
          <p>© 2024 React Baseline - FastAPI + React 풀스택 템플릿</p>
        </div>
      </div>
    </div>
  )
}

export default App
