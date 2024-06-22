import { Comment, type emotionType, sentimentType } from "@/types/fastapi";
import { isYouTubeLink, timestampRegex, urlRegex } from "./regx";

export function getYouTubeVideoId(url: string) {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[5]) {
    return match[5];
  }
  return null;
}
export function getYoutubeLinkFromId(id: string) {
  if (!id) {
    throw new Error("No id provided");
  }
  if (
    typeof id !== "string" ||
    id.length !== 11 ||
    !/^[a-zA-Z0-9_-]+$/.test(id)
  ) {
    throw new Error("Not a valid id");
  }
  const link = `https://www.youtube.com/watch?v=${id}`;
  if (isYouTubeLink(link)) {
    return link;
  } else {
    throw new Error("Not a valid id");
  }
}
export function formatDuration(seconds: any) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ${remainingSeconds} ${
      remainingSeconds > 1 ? "s" : ""
    }`;
  } else {
    return `${remainingSeconds} ${remainingSeconds > 1 ? "s" : ""}`;
  }
}

export const processText = (text: string) => {
  const parts = text
    .replace(urlRegex, "{{url_content}}")
    .split("{{url_content}}");
  const urls = text.match(urlRegex);
  return { parts, urls };
};

export const processPart = (part: string) => {
  const timeParts = part
    .replace(timestampRegex, "{{timestamp_content}}")
    .split("{{timestamp_content}}");
  const times = part.match(timestampRegex);
  return { timeParts, times };
};

export const calculateSentiment = (
  comments: Comment[]
): Record<sentimentType, number> => {
  const sentimentCounts = comments.reduce(
    (acc, c) => {
      switch (c.sentiment.label) {
        case "negative":
          acc.negative++;
          break;
        case "neutral":
          acc.neutral++;
          break;
        case "positive":
          acc.positive++;
          break;
      }
      return acc;
    },
    {
      positive: 0,
      neutral: 0,
      negative: 0,
    }
  );
  return sentimentCounts;
};
type EmotionCounts = Record<emotionType, number>;
export const calculateEmotions = (comments: Comment[]): EmotionCounts => {
  // Extract the key of the emotionType to an initialize the accumulator
  const initialCount: EmotionCounts = {
    neutral: 0,
    admiration: 0,
    amusement: 0,
    anger: 0,
    annoyance: 0,
    approval: 0,
    caring: 0,
    confusion: 0,
    curiosity: 0,
    desire: 0,
    disappointment: 0,
    disapproval: 0,
    disgust: 0,
    embarrassment: 0,
    excitement: 0,
    fear: 0,
    gratitude: 0,
    grief: 0,
    joy: 0,
    love: 0,
    nervousness: 0,
    optimism: 0,
    pride: 0,
    realization: 0,
    relief: 0,
    remorse: 0,
    sadness: 0,
    surprise: 0,
  };
  return comments.reduce((acc, c) => {
    const emotionLabel = c.emotion.label;
    acc[emotionLabel]++;
    return acc;
  }, initialCount);
};
// Helper function to format the score
export const formatScore = (score: number): string => {
  return `${(score * 100).toFixed(2)}%`;
};
