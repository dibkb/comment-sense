interface Sentiment {
  label: string;
  score: number;
}

interface Emotion {
  label: string;
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
  sentiment: Sentiment;
  emotion: Emotion;
}
