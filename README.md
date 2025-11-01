# 정신건강 검사 결과 조회 페이지

## 배포 URL
- 프론트엔드: [이동하기](https://r-ppg-facial-expression-analysis-fr.vercel.app)
- 백엔드: [이동하기](https://r-ppg-facial-expression-analysis-ba.vercel.app/)

## 기술 스택
### Frontend
- React 18
- TypeScript
- Vite
- Tanstack Query
### Backend 
- Nestjs
- TypeORM
- class-validator

### 기술 선택 이유

- React를 선택한 이유:
    - 컴포넌트 기반 아키텍처, 선언적 UI등 복잡한 UI를 개발하는데 편합니다.
    - 익숙한 기술이어서 입니다.
- Tanstack Query를 선택한 이유:
    - api 데이터를 자동으로 caching, refetching, invalidation하는 것을 통해 항상 최신상태로 유지해주는 편리한 라이브러리 입니다.
    - 이런 상태를 관리하기 위한것을 편리하게 만들어 놓아 반복적인코드들을 많이 줄여주어서 좋습니다.
- 차트 라이브러리 선택 이유:
    - React Component 기반이고 차트의 각 부분이 React 컴포넌트로 제공되어서 선언적이고 간단하게 개발이 됩니다.
    - 또, Mantine Rechart는 Mantine의 테마에 맞게 래핑한 라이브러리로, UI적으로 통일성을 제공하여 좋습니다.
- TypeORM 선택이유
    - Java,Spring 개발자 이면서 JPA, Hibernate(ORM)을 사용해본 입장으로서 ORM 기술에 학습을 안하고 바로 사용하기가 편했습니다.
    - Jpa처럼 TypeORM에서 보일러플레이트 코드들을 직접 작성을 해주는것이 편리하게 느껴졌습니다.
    - 비록, 복잡한 비즈니스 로직을 객체지향적으로 짜지 못했지만(회원가입, 로그인 기능만 개발해서) 추후에 있을 개발 확장성에 있어서
    - 비즈니스 로직을 객체지향 적으로 짤수있는것은 객체지향 개발자로서 가장 큰 이점이라고 생각합니다.
- NestJs 선택 이유
    - 관심사의 분리를 통해서 견고한 아키텍처를 제공하고 의존성 주입을 통해 코드간 결합도를 낮출수 있는 장점이 있습니다.
- SQLLite 선택이유
    - 단순히 개발을 하고 PoC를 하기위해서 파일 DB를 선택했습니다.
    - ORM 기술을 이용했기 때문에 추후 데이터베이스를 변경한다고 해도 간단한 설정 변경으로 마이그레이션이 가능합니다.

## 설치 및 실행
***필수**: env 설정이 필요합니다.
```
# backend/.env
JWT_SECRET=
PORT=
DASHBOARD_URL=https://core.lucycare.co.kr/api/pre-assignment/session-result-report

# frontend/.env
VITE_API_URL= #backend server 도메인 입력
VITE_DASHBOARD_API=/api/sessions/result-report
```
**Command 실행**
```ssh
# backend 시작방법
npm run start:backend

# frontend 시작방법
npm run start:frontend
```

## 프로젝트 구조
```
src/        
├── components/           # 컴포넌트
│   ├── common/           # 범용 공통 컴포넌트    
│   └── layout/           # 레이아웃 컴포넌트   
├── features/             # 각 기능 별 패키지            
│   ├── auth/             # 인증 기능 패키지   
│   │   ├── api/          # 인증 API
│   │   ├── hooks/        # 인증 훅
│   │   └── types/        # 인증 Type 정의
│   └── auth/             # 대시보드 기능 패키지   
│       ├── components/   # 대시보드 컴포넌트
│       ├── api/          # 대시보드 API
│       ├── hooks/        # 대시보드 훅
│       ├── utils/        # 대시보드 유틸
│       └── types/        # 대시보드 Type 정의
├── pages/                # 라우트 별 페이지   
│   ├── login.ts          # 로그인 페이지
│   ├── signup.ts         # 회원가입 페이지
│   └── dashboard.ts      # 대시보드 페이지
├── utils/                # 글로벌 유틸 
│   ├── axios.ts          # axios 인스턴스
│   └── constants.ts      # 글로벌 상수
├── store/                # 상태 관리 
└── App.tsx               # 라우팅 컴포넌트

```

## 주요 기능
- rPPG 생체신호 데이터 시각화 (심박수 그래프)
- 감정 분석 결과 표시 (파이차트 또는 바차트)
- 이전/현재 측정값 비교
- 우울증 점수 변화 추이
- 스트레스 점수
- 감정, 표정에 대한 훈련 결과

## 구현 상세
- 인증
  - JWT를 사용한 인증 서버
  - 회원가입시 디바운스를 사용한 아이디 중복검사
- 정신건강 대시보드
  - Mantine UI, ReChart를 활용하여 rPPG 생체신호 데이터 시각화
  - 감정, 우울증, 스트레스 분석 결과
  - 각 훈련에 대한 세부정보 결과 표시

### 에러 핸들링
- Tanstack Query의 retry 옵션 활용

### 상태 관리
- 서버 상태: Tanstack Query
- 클라이언트 상태: Context API

### 데이터 시각화
- 심박수 시계열 차트: hrValues 배열 활용
- 감정 분석: emotionResult 객체를 차트로 시각화

###  
<!--
## 개선 사항 (선택)
실제 프로덕션 환경이라면 추가하고 싶은 기능이나 개선 방향
- PDF 리포트 생성
- 이메일 공유 기능
- 과거 세션 비교 기능
-->