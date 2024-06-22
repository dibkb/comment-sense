export type sentimentType = "negative" | "neutral" | "positive";
export type emotionType =
  | "admiration"
  | "admiration"
  | "anger"
  | "annoyance"
  | "approval"
  | "caring"
  | "confusion"
  | "curiosity"
  | "desire"
  | "disappointment"
  | "disapproval"
  | "disgust"
  | "embarrassment"
  | "excitement"
  | "fear"
  | "gratitude"
  | "grief"
  | "joy"
  | "love"
  | "nervousness"
  | "optimism"
  | "pride"
  | "realization"
  | "relief"
  | "remorse"
  | "sadness"
  | "surprise"
  | "neutral";
export interface SentimentObj {
  label: sentimentType;
  score: number;
}

interface EmotionObj {
  label: emotionType;
  score: number;
}

export interface Comment {
  cid: string;
  text: string;
  time: string;
  author: string;
  channel: string;
  votes: string;
  replies: string;
  photo: string;
  heart: boolean;
  reply: boolean;
  time_parsed: number;
  translated: string | false;
  sentiment: SentimentObj;
  emotion: EmotionObj;
}
