#!/bin/bash

# React Baseline - 개발 환경 실행 스크립트
# 프론트엔드와 백엔드를 동시에 실행합니다 (핫 리로드 포함)

echo "🚀 React Baseline 개발 환경을 시작합니다..."
echo ""

# 터미널 색상 설정
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 프로세스 ID 저장을 위한 변수
BACKEND_PID=""
FRONTEND_PID=""

# 종료 시 자동으로 프로세스 정리
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 서버들을 종료합니다...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        echo -e "${RED}📡 백엔드 서버 종료 (PID: $BACKEND_PID)${NC}"
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID 2>/dev/null
            sleep 2
            if kill -0 $BACKEND_PID 2>/dev/null; then
                kill -9 $BACKEND_PID 2>/dev/null
            fi
        fi
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo -e "${BLUE}🎨 프론트엔드 서버 종료 (PID: $FRONTEND_PID)${NC}"
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID 2>/dev/null
            sleep 2
            if kill -0 $FRONTEND_PID 2>/dev/null; then
                kill -9 $FRONTEND_PID 2>/dev/null
            fi
        fi
    fi
    
    echo -e "${GREEN}✅ 모든 서버가 종료되었습니다.${NC}"
    exit 0
}

# Ctrl+C 감지 시 정리 함수 실행
trap cleanup SIGINT SIGTERM

# 백엔드 서버 시작
echo -e "${RED}📡 백엔드 서버를 시작합니다... (포트: 8000)${NC}"
cd backend
if uv run python run_dev.py & then
    BACKEND_PID=$!
    echo "백엔드 서버 PID: $BACKEND_PID"
else
    echo -e "${RED}❌ 백엔드 서버 시작에 실패했습니다.${NC}"
    exit 1
fi
cd ..

# 잠시 대기 (백엔드 서버 시작 시간)
sleep 3

# 프론트엔드 서버 시작
echo -e "${BLUE}🎨 프론트엔드 서버를 시작합니다... (포트: 5173)${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}🎉 개발 환경이 성공적으로 시작되었습니다!${NC}"
echo ""
echo "📍 접속 URL:"
echo -e "   • 프론트엔드: ${BLUE}http://localhost:5173${NC}"
echo -e "   • 백엔드 API: ${RED}http://localhost:8000${NC}"
echo -e "   • API 문서: ${RED}http://localhost:8000/docs${NC}"
echo ""
echo -e "${YELLOW}💡 팁: Ctrl+C를 눌러 모든 서버를 한번에 종료할 수 있습니다.${NC}"
echo ""

# 프로세스들이 실행 중인 동안 대기
wait 