import { instance } from "@/axios";
import { VideoInfo } from "@/types/nodeapi";

export const getVideoInfo = async (id: string): Promise<VideoInfo> => {
  const res = await instance.get(`get-info/${id}`);
  return res.data;
};
