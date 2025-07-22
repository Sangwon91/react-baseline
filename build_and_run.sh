#!/bin/bash

# React Baseline - 프로덕션 환경 빌드 및 실행 스크립트
# 프론트엔드를 빌드하고 백엔드 서버에서 통합 서빙합니다

echo "🏗️ React Baseline 프로덕션 빌드를 시작합니다..."
echo ""

# 터미널 색상 설정
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. 프론트엔드 빌드
echo -e "${BLUE}🎨 프론트엔드를 빌드합니다...${NC}"
cd frontend

# 의존성 설치 확인
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 의존성을 설치합니다...${NC}"
    npm install
fi

# 빌드 실행
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 프론트엔드 빌드에 실패했습니다.${NC}"
    exit 1
fi

cd ..

# 2. 빌드된 파일을 백엔드의 static 폴더로 복사
echo -e "${GREEN}📁 빌드된 파일을 백엔드로 복사합니다...${NC}"

# 기존 static 폴더 삭제 (있다면)
if [ -d "backend/static" ]; then
    rm -rf backend/static
fi

# 프론트엔드 빌드 파일을 백엔드 static 폴더로 복사
cp -r frontend/dist backend/static

# 3. 백엔드 서버 시작
echo -e "${RED}📡 통합 서버를 시작합니다... (포트: 8000)${NC}"
echo ""

cd backend

# 백엔드 의존성 설치 확인
echo -e "${YELLOW}📦 백엔드 의존성을 확인합니다...${NC}"
uv sync

echo ""
echo -e "${GREEN}🎉 프로덕션 빌드가 완료되었습니다!${NC}"
echo ""
echo "📍 접속 URL:"
echo -e "   • 통합 서버: ${GREEN}http://localhost:8000${NC}"
echo -e "   • API 문서: ${RED}http://localhost:8000/docs${NC}"
echo ""
echo -e "${YELLOW}💡 이제 프론트엔드와 백엔드가 하나의 서버에서 실행됩니다.${NC}"
echo -e "${YELLOW}💡 Ctrl+C를 눌러 서버를 종료할 수 있습니다.${NC}"
echo ""

# 프로덕션 서버 실행
uv run python run_dev.py 