/**
 * rPPG 대시보드 검사 데이터의 전체 구조
 */
export interface DashboardData {
  /** 이전 측정(rPPG) 데이터 */
  previousRPPG: RppgData;
  /** 현재 측정(rPPG) 데이터 */
  currentRPPG: RppgData;
  /** 우울증 점수 */
  depressionScore: DepressionScore;
  /** 상세 트레이닝 결과 */
  detailed: DetailedReport;
}

// 감정의 종류 (문자열 리터럴 타입)
export type EmotionType =
  | 'Angry'
  | 'Disgusted'
  | 'Fearful'
  | 'Happy'
  | 'Neutral'
  | 'Sad'
  | 'Surprised';

// 스트레스 수준
export type StressLevel = 'Low' | 'Medium' | 'High';

// 감정 분석 결과 (확률)
export interface EmotionResult {
  Angry: number;
  Disgusted: number;
  Fearful: number;
  Happy: number;
  Neutral: number;
  Sad: number;
  Surprised: number;
}


// 훈련 전/후 점수
export interface ScoreBeforeAfter {
  before: number;
  after: number;
}

// rPPG 및 점수 타입


// rPPG 측정 세션 데이터
export interface RppgData {
  /** 심박수 (문자열) */
  hr: string;
  /** 심박수 시계열 데이터 */
  hrValues: number[];
  /** 심박 변이도 (문자열) */
  hrv: string;
  /** 주요 감정 */
  emotion: EmotionType;
  /** 스트레스 수준 */
  stress: StressLevel;
  /** 감정 분석 상세 */
  emotionResult: EmotionResult;
}

//우울증 점수 (이전/현재)
export interface DepressionScore {
  previous: number;
  current: number;
}

// 상세 트레이닝 결과

export interface DetailedReport {
  empathy: EmpathyDetail;
  mimic: MimicDetail;
  recognition: RecognitionDetail;
  replication: ReplicationDetail;
}

// 공감하기
export interface AiAnalysis {
  emotion: EmotionType;
  percentage: number;
}

export interface EmpathyRow {
  aiAnalysis: AiAnalysis;
  myEmotion: EmotionType;
}

export interface EmpathyDetail {
  emotionRows: EmpathyRow[];
  empathyScores: ScoreBeforeAfter[];
}

// 따라하기
export interface MimicMatchScore extends ScoreBeforeAfter {
  emotion: EmotionType;
}

export interface MimicDetail {
  matchScores: MimicMatchScore[];
}

// 인지하기
export interface RecognitionRow {
  proposedEmotion: EmotionType;
  myEmotion: EmotionType;
}

export interface RecognitionDetail {
  recognitionRows: RecognitionRow[];
  accuracyBefore: number;
  accuracyAfter: number;
  responseTime: number;
}

// 재현하기
export interface ReplicationAiAnalysis {
  emotion: EmotionType;
  previous: number;
  current: number;
}

export interface ReplicationRow {
  proposedEmotion: EmotionType;
  aiAnalysis: ReplicationAiAnalysis;
}

export interface ReplicationDetail {
  replicationRows: ReplicationRow[];
}
