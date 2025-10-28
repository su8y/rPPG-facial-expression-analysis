# 정신건강 검사 결과 조회 페이지

## 배포 URL
- 프론트엔드: [TOBE UPDATE](#)

## 기술 스택
### Frontend
- React 18
- TypeScript
- Vite
- Tanstack Query
### Backend 
- Nestjs
- TypeORM

### 기술 선택 이유
- React를 선택한 이유: ...
- Tanstack Query를 선택한 이유: ...
- 차트 라이브러리 선택 이유: ...

## 설치 및 실행
npm install
npm run dev

## 프로젝트 구조
src/        
├── components/     
│   ├── RPPGChart/        # rPPG 데이터 차트     
│   ├── EmotionAnalysis/  # 감정 분석 표시    
│   └── AssignmentCard/   # 과제별 결과 카드   
├── hooks/  
├── api/    
├── types/  
└── ... 

## 주요 기능
- rPPG 생체신호 데이터 시각화 (심박수 그래프)
- 감정 분석 결과 표시 (파이차트 또는 바차트)
- 이전/현재 측정값 비교
- 우울증 점수 변화 추이
- 과제별(A/B/C/D) 결과 비교
- ...

## 구현 상세

### 에러 핸들링
- Tanstack Query의 retry 옵션 활용
- ErrorBoundary 구현
- ...

### 상태 관리
- 서버 상태: Tanstack Query
- 클라이언트 상태: ...

### 데이터 시각화
- 심박수 시계열 차트: hrValues 배열 활용
- 감정 분석: emotionResult 객체를 차트로 시각화

<!--
## 개선 사항 (선택)
실제 프로덕션 환경이라면 추가하고 싶은 기능이나 개선 방향
- PDF 리포트 생성
- 이메일 공유 기능
- 과거 세션 비교 기능
-->