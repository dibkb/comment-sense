import { nodeApiInstance } from "@/axios";
import { SearchResults, VideoInfo } from "@/types/nodeapi";

export const getVideoInfo = async (id: string): Promise<VideoInfo> => {
  const res = await nodeApiInstance.get(`get-info/${id}`);
  return res.data;
};
export const getRelatedVideo = async (
  title: string
): Promise<SearchResults> => {
  const res = await nodeApiInstance.get(`search-video/${title}`);
  return res.data;
};
