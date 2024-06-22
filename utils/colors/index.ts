import { emotionType, sentimentType } from "@/types/fastapi";

export const colorMap: Record<sentimentType, string> = {
  positive: "#00CD4C",
  negative: "#FE5E57",
  neutral: "#FDBB35",
};
export const emotionBgColor: Record<emotionType, string> = {
  admiration: "#FCE7A7", // Light yellow
  amusement: "#FAD2D2", // Light red
  anger: "#FFADAD", // Light coral
  annoyance: "#FFD6A5", // Light orange
  approval: "#C6F6D5", // Light green
  caring: "#D0E6A5", // Light lime
  confusion: "#E2F0CB", // Light greenish yellow
  curiosity: "#C9CCF5", // Light lavender
  desire: "#AED9E0", // Light cyan
  disappointment: "#F8B8B8", // Light pink
  disapproval: "#F6E7D2", // Light peach
  disgust: "#E8C5DC", // Light lavender pink
  embarrassment: "#F9CC9D", // Light apricot
  excitement: "#FFDAC1", // Light apricot
  fear: "#C2DFFF", // Light sky blue
  gratitude: "#D5ECC2", // Light moss green
  grief: "#F3C4F3", // Light mauve
  joy: "#FFECB3", // Light yellowish
  love: "#FFD3E0", // Light pinkish
  nervousness: "#C7CEEA", // Light slate blue
  optimism: "#D6E9C6", // Light pistachio
  pride: "#F4D6FF", // Light orchid
  realization: "#B5EAD7", // Light seafoam green
  relief: "#E5FFDB", // Light mint
  remorse: "#FFD1DC", // Light pink
  sadness: "#C4C4C4", // Light gray
  surprise: "#D3D3D3", // Light grayish
  neutral: "#F0F0F0", // Light gray
};
