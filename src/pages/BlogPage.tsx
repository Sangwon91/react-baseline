import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getAllPosts } from '@/data/posts'
import { Search, Clock, Calendar, Tag } from "lucide-react"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  
  const allPosts = getAllPosts()
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)))
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">기술 블로그</h1>
        <p className="text-xl text-muted-foreground">
          개발 여정에서 배운 것들을 기록하고 공유합니다
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="글 제목이나 내용으로 검색..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === '' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag('')}
          >
            전체
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.slug} className="group hover:shadow-md transition-shadow h-fit">
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs cursor-pointer hover:bg-secondary/80"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                <Link to={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('ko-KR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}분
                </div>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-primary/10">
                  읽어보기
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">검색 결과가 없습니다.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('')
              setSelectedTag('')
            }}
          >
            검색 초기화
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 text-center text-sm text-muted-foreground">
        총 {allPosts.length}개의 글 중 {filteredPosts.length}개를 표시하고 있습니다
      </div>
    </div>
  )
} 