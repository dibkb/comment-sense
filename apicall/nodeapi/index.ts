import { nodeApiInstance } from "@/axios";
import { VideoInfo } from "@/types/nodeapi";

export const getVideoInfo = async (id: string): Promise<VideoInfo> => {
  const res = await nodeApiInstance.get(`get-info/${id}`);
  return res.data;
};
