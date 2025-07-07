import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Mail, Linkedin, Code2, Zap, Target } from "lucide-react"

export default function AboutPage() {
  const skills = [
    'React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS',
    'shadcn UI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB',
    'Docker', 'AWS', 'Git', 'Figma'
  ]

  const achievements = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "오픈소스 기여",
      description: "다양한 오픈소스 프로젝트에 기여하며 개발자 커뮤니티와 함께 성장"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "성능 최적화",
      description: "웹 애플리케이션 성능을 평균 40% 향상시키는 최적화 기법 개발"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "프로젝트 리드",
      description: "10+ 개의 웹 프로젝트를 성공적으로 완료하며 팀을 이끌어 온 경험"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">개</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">안녕하세요, 개발자입니다</h1>
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          현대적인 웹 기술로 사용자 경험을 개선하고,<br />
          복잡한 문제를 우아한 코드로 해결하는 것을 좋아합니다.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="gap-2">
            <Mail className="w-4 h-4" />
            연락하기
          </Button>
          <Button variant="outline" className="gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
        </div>
      </div>

      {/* About Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>소개</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-7">
                5년 이상의 웹 개발 경험을 바탕으로 React, TypeScript, Next.js를 주력으로 
                사용하여 현대적이고 성능 좋은 웹 애플리케이션을 개발하고 있습니다.
              </p>
              <p className="leading-7">
                사용자 중심의 UI/UX 디자인과 클린 코드 작성을 중시하며, 
                새로운 기술을 학습하고 팀과 지식을 공유하는 것을 즐깁니다.
              </p>
              <p className="leading-7">
                최근에는 shadcn UI를 활용한 디자인 시스템 구축과 
                Vite를 이용한 빌드 최적화에 관심을 가지고 연구하고 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>연락처</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>developer@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-muted-foreground" />
                <span>github.com/developer</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-muted-foreground" />
                <span>linkedin.com/in/developer</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">주요 성과</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  {achievement.icon}
                </div>
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>경력</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-2.5 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold">시니어 프론트엔드 개발자</h3>
                <span className="text-sm text-muted-foreground">2022.03 - 현재</span>
              </div>
              <p className="text-muted-foreground mb-2">테크 컴퍼니 A</p>
              <p className="text-sm leading-relaxed">
                React 기반 대규모 웹 애플리케이션 개발 및 팀 리딩. 
                성능 최적화를 통해 로딩 시간 40% 단축 달성.
              </p>
            </div>
            
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-2.5 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold">프론트엔드 개발자</h3>
                <span className="text-sm text-muted-foreground">2020.01 - 2022.02</span>
              </div>
              <p className="text-muted-foreground mb-2">스타트업 B</p>
              <p className="text-sm leading-relaxed">
                Vue.js에서 React로 마이그레이션 프로젝트 주도. 
                사용자 인터페이스 개선으로 전환율 25% 향상.
              </p>
            </div>
            
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-2.5 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="font-semibold">주니어 웹 개발자</h3>
                <span className="text-sm text-muted-foreground">2019.03 - 2019.12</span>
              </div>
              <p className="text-muted-foreground mb-2">에이전시 C</p>
              <p className="text-sm leading-relaxed">
                다양한 클라이언트 웹사이트 개발 및 유지보수. 
                반응형 웹 디자인과 크로스 브라우저 호환성 확보.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 