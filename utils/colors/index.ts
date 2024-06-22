import { sentimentType } from "@/types/fastapi";

export const colorMap: Record<sentimentType, string> = {
  positive: "#00CD4C",
  negative: "#FE5E57",
  neutral: "#FDBB35",
};
