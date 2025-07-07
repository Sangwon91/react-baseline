import { useState } from 'react'
import './App.css'
import { useBearStore } from './store/useStore'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Minus, 
  MousePointer, 
  Target, 
  TrendingUp, 
  Heart, 
  Settings, 
  User,
  Calendar,
  Star
} from "lucide-react"

function App() {
  const [count, setCount] = useState(0)
  const bears = useBearStore((state) => state.bears)
  const increase = useBearStore((state) => state.increase)
  const decrease = useBearStore((state) => state.decrease)

  // 베어 카운트에 따른 진행률 계산 (최대 100으로 가정)
  const progressValue = Math.min((bears / 100) * 100, 100)

  return (
    <TooltipProvider>
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
                <p className="text-muted-foreground text-sm">수려한 shadcn UI와 함께하는 카운터 앱</p>
              </div>
            </div>
            
            {bears > 10 && (
              <Alert className="max-w-md mx-auto mb-4">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  축하합니다! 베어 카운트가 {bears}개에 도달했습니다! 🎉
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Tabs defaultValue="counter" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="counter">카운터</TabsTrigger>
              <TabsTrigger value="bears">베어 관리</TabsTrigger>
              <TabsTrigger value="stats">통계</TabsTrigger>
            </TabsList>

            {/* 카운터 탭 */}
            <TabsContent value="counter" className="space-y-6">
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <MousePointer className="w-5 h-5" />
                    클릭 카운터
                  </CardTitle>
                  <CardDescription>
                    버튼을 클릭하여 카운트를 증가시켜보세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">
                      {count}
                    </div>
                    <Badge variant="secondary">
                      총 클릭 수
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={() => setCount(count + 1)}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        클릭하기
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>카운터를 1 증가시킵니다</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {count > 0 && (
                    <Button 
                      onClick={() => setCount(0)}
                      variant="outline"
                      className="w-full"
                    >
                      초기화
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 베어 관리 탭 */}
            <TabsContent value="bears" className="space-y-6">
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Target className="w-5 h-5" />
                    베어 관리
                  </CardTitle>
                  <CardDescription>
                    베어의 수를 관리하고 진행 상황을 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">
                      🐻 {bears}
                    </div>
                    <Badge variant="outline">
                      현재 베어 수
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>진행률</span>
                      <span>{progressValue.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressValue} />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={() => increase(1)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          증가
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>베어 수를 1 증가시킵니다</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={() => decrease(1)}
                          variant="destructive"
                          disabled={bears <= 0}
                        >
                          <Minus className="w-4 h-4 mr-2" />
                          감소
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>베어 수를 1 감소시킵니다</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => increase(5)}
                      variant="outline"
                    >
                      +5
                    </Button>
                    <Button 
                      onClick={() => decrease(5)}
                      variant="outline"
                      disabled={bears < 5}
                    >
                      -5
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 통계 탭 */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      사용자 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>사용자</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">React 개발자</p>
                        <p className="text-sm text-muted-foreground">shadcn UI 사용자</p>
                      </div>
                    </div>
                    
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="p-0 h-auto">
                          더 많은 정보 보기
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <Avatar>
                            <AvatarFallback>사용자</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">React 개발자</h4>
                            <p className="text-sm">
                              shadcn UI를 사용한 현대적인 React 애플리케이션 개발
                            </p>
                            <div className="flex items-center pt-2">
                              <Calendar className="mr-2 h-4 w-4 opacity-70" />
                              <span className="text-xs text-muted-foreground">
                                2024년 1월부터 사용
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      앱 통계
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold">{count}</div>
                        <div className="text-sm text-muted-foreground">클릭 수</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold">{bears}</div>
                        <div className="text-sm text-muted-foreground">베어 수</div>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold">{count + bears}</div>
                      <div className="text-sm text-muted-foreground">총 액션 수</div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>shadcn UI로 제작</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* 푸터 */}
          <div className="text-center mt-12 text-muted-foreground text-sm">
            <p>© 2024 React Baseline - shadcn UI와 함께하는 현대적인 React 앱</p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App
