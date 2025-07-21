#!/usr/bin/env python3
"""
React Baseline Backend 개발 서버 실행 스크립트
"""

import uvicorn
import sys
import os

# src 폴더를 Python path에 추가
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

if __name__ == "__main__":
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # 코드 변경 시 자동 재시작
        log_level="info"
    ) 