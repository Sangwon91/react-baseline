import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Server, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Database
} from "lucide-react"

interface Item {
  id: number
  name: string
  description?: string
  created_at: string
}

// API 기본 URL을 동적으로 설정
const getApiBaseUrl = () => {
  // 프로덕션 환경에서는 현재 호스트를 사용
  if (import.meta.env.PROD) {
    return window.location.origin
  }
  // 개발 환경에서는 백엔드 서버 주소 사용
  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

export function ApiDemo() {
  const [items, setItems] = useState<Item[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemDescription, setNewItemDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  // API 연결 상태 확인
  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        setApiStatus('connected')
        setError(null)
      } else {
        setApiStatus('disconnected')
      }
    } catch (err) {
      setApiStatus('disconnected')
      setError('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
  }

  // 아이템 목록 가져오기
  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`)
      if (response.ok) {
        const data = await response.json()
        setItems(data)
        setError(null)
      } else {
        throw new Error('아이템을 가져오는데 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 새 아이템 생성
  const createItem = async () => {
    if (!newItemName.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newItemName,
          description: newItemDescription || undefined
        })
      })

      if (response.ok) {
        setNewItemName('')
        setNewItemDescription('')
        await fetchItems()
        setError(null)
      } else {
        throw new Error('아이템 생성에 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 아이템 삭제
  const deleteItem = async (id: number) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchItems()
        setError(null)
      } else {
        throw new Error('아이템 삭제에 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 테스트 데이터 생성
  const seedData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/dev/seed`, {
        method: 'POST'
      })

      if (response.ok) {
        await fetchItems()
        setError(null)
      } else {
        throw new Error('테스트 데이터 생성에 실패했습니다.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    checkApiStatus()
  }, [])

  useEffect(() => {
    if (apiStatus === 'connected') {
      fetchItems()
    }
  }, [apiStatus])

  return (
    <div className="space-y-6">
      {/* API 연결 상태 */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5" />
          <span className="font-medium">백엔드 서버 상태</span>
        </div>
        <div className="flex items-center gap-2">
          {apiStatus === 'checking' && (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">확인 중...</span>
            </>
          )}
          {apiStatus === 'connected' && (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">연결됨</span>
              <Badge variant="secondary" className="text-xs">{API_BASE_URL}</Badge>
            </>
          )}
          {apiStatus === 'disconnected' && (
            <>
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">연결 실패</span>
            </>
          )}
          <Button onClick={checkApiStatus} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 오류 표시 */}
      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* API 연결된 경우에만 표시 */}
      {apiStatus === 'connected' && (
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* 새 아이템 생성 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                아이템 생성
              </CardTitle>
              <CardDescription>
                새로운 아이템을 생성하거나 테스트 데이터를 만들어보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="아이템 이름"
                  value={newItemName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value)}
                />
                <Input
                  placeholder="아이템 설명 (선택사항)"
                  value={newItemDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemDescription(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={createItem}
                  disabled={loading || !newItemName.trim()}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  생성
                </Button>
                
                <Button 
                  onClick={seedData}
                  variant="outline"
                  disabled={loading}
                >
                  <Database className="w-4 h-4 mr-2" />
                  테스트 데이터
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 아이템 목록 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  아이템 목록
                </div>
                <Badge variant="outline">
                  {items.length}개
                </Badge>
              </CardTitle>
              <CardDescription>
                생성된 아이템들을 확인하고 관리할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                  <span>로딩 중...</span>
                </div>
              )}
              
              {!loading && items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  아이템이 없습니다.<br />
                  새 아이템을 생성하거나 테스트 데이터를 만들어보세요.
                </div>
              )}
              
              {!loading && items.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 truncate">
                              {item.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(item.created_at).toLocaleString('ko-KR')}
                          </p>
                        </div>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          variant="destructive"
                          size="sm"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {index < items.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={fetchItems}
                variant="outline"
                disabled={loading}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                새로고침
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 