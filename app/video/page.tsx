"use client";
import { getVideoInfo } from "@/apicall/nodeapi";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { getYoutubeLinkFromId } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Video() {
  const [ytid, setYtid] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("ytid");
    try {
      if (videoId) {
        setYtid(videoId);
      } else {
        // TODO : Error page
      }
    } catch (error) {}
  }, []);
  const { loading, apiResponse } = useGetBasicInfo(ytid);
  if (loading) return <main className="container">Video</main>;
  else return <main>{JSON.stringify(apiResponse)}</main>;
}
