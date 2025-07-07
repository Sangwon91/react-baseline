import { useParams, Link, Navigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getBlogPost, getAllPosts } from '@/data/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react"

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/blog" replace />
  }
  
  const post = getBlogPost(slug)
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">글을 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mb-6">
          요청하신 블로그 글이 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <Link to="/blog">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            블로그로 돌아가기
          </Button>
        </Link>
      </div>
    )
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link to="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            블로그로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}분 읽기
            </div>
            <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto">
              <Share2 className="w-4 h-4" />
              공유하기
            </Button>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Post Content */}
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => (
                <h1 className="text-3xl font-bold mt-8 mb-4 first:mt-0">{children}</h1>
              ),
              h2: ({children}) => (
                <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
              ),
              h3: ({children}) => (
                <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
              ),
              p: ({children}) => (
                <p className="mb-4 leading-7">{children}</p>
              ),
              ul: ({children}) => (
                <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
              ),
              ol: ({children}) => (
                <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
              ),
              li: ({children}) => (
                <li className="leading-7">{children}</li>
              ),
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-muted pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
              code: ({children, className}) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={`${className} block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono`}>
                    {children}
                  </code>
                )
              },
              pre: ({children}) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              a: ({children, href}) => (
                <a 
                  href={href} 
                  className="text-primary hover:underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevPost && (
            <Link to={`/blog/${prevPost.slug}`}>
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">이전 글</div>
                <div className="font-medium">{prevPost.title}</div>
              </div>
            </Link>
          )}
          
          {nextPost && (
            <Link to={`/blog/${nextPost.slug}`} className="md:ml-auto">
              <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors text-right">
                <div className="text-sm text-muted-foreground mb-1">다음 글</div>
                <div className="font-medium">{nextPost.title}</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 