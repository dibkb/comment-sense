import { nodeApiInstance } from "@/axios";
import {
  SearchResults,
  YouTubeChannelResponse,
  YouTubeVideoResponse,
} from "@/types/nodeapi";
import axios from "axios";

// const search = await fetch(
//   `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=Hello&type=video&key=${apiKey}`
// ).then((response) => response.json());
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
export const getVideoInfo = async (
  id: string
): Promise<YouTubeVideoResponse> => {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&id=${id}&key=${apiKey}`
  );
  return res.data;
};
export const getChannelInfo = async (
  id: string
): Promise<YouTubeChannelResponse> => {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,status&id=${id}&key=${apiKey}`
  );
  return res.data;
};

export const getRelatedVideo = async (
  title: string
): Promise<SearchResults> => {
  const res = await nodeApiInstance.get(`search-video/${title}`);
  return res.data;
};
