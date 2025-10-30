import type { EmotionType } from '../types/rppg.type';

export const EMOTION_NAMES: Record<EmotionType, string> = {
    Angry: '분노',
    Disgusted: '혐오',
    Fearful: '두려움',
    Happy: '행복',
    Neutral: '중립',
    Sad: '슬픔',
    Surprised: '놀람',
} as const;

export const EMOTION_EMOJI: Record<EmotionType, string> = {
    Angry: '😠',
    Disgusted: '🤢',
    Fearful: '😨',
    Happy: '😊',
    Neutral: '😐',
    Sad: '😢',
    Surprised: '😮',
} as const;

export const SUCCESS_STATUS = {
    SUCCESS: '성공',
    FAILURE: '실패',
} as const;

export const MATCH_STATUS = {
    MATCH: '일치',
    MISMATCH: '불일치',
} as const;