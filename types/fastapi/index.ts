export type sentimentType = "negative" | "neutral" | "positive";
export type emotionType =
  | "admiration"
  | "amusement"
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
  | "neutral"
  | "optimism"
  | "pride"
  | "realization"
  | "relief"
  | "remorse"
  | "sadness"
  | "surprise";

export interface SentimentObj {
  label: sentimentType;
  score: number;
}

export interface EmotionObj {
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
