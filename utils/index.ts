import { isYouTubeLink } from "./regx";

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
