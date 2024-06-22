import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { type emotionType } from "@/types/fastapi";
import emotionEmojiMap from "@/utils/emojimap";
import React, { useMemo, useState } from "react";
import SingleComment from "../SingleComment";
import { mockData } from "../mock";
import { calculateEmotions } from "@/utils";

const EmotionTab = () => {
  const [select, setSelect] = useState<emotionType | "all">("all");
  const emotionCounts = useMemo(() => calculateEmotions(mockData), []);
  const commentsToDisplay = useMemo(() => {
    if (select === "all") return mockData;
    else return mockData.filter((d) => d.emotion.label === select);
  }, [select]);
  const commentsRender = commentsToDisplay.map((c) => {
    return <SingleComment key={c.cid} comment={c} type="emotion" />;
  });
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="mx-auto">
        <Select onValueChange={(emo: emotionType | "all") => setSelect(emo)}>
          <SelectTrigger className="w-[360px] capitalize">
            <SelectValue placeholder="Filter by Emotion" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Emotion Options</SelectLabel>
              <SelectItem value={"all"} className="capitalize">
                <span className="flex gap-2">
                  <span className="ml-6">all</span>
                  <p className="text-xs text-stone-500">({mockData.length})</p>
                </span>
              </SelectItem>
              {Object.keys(emotionEmojiMap).map((_e, i) => {
                const emo = _e as emotionType;
                return (
                  <SelectItem key={emo} value={emo} className="capitalize">
                    <span className="flex items-center gap-2">
                      {emotionEmojiMap[emo]}
                      <span>{emo}</span>
                      <p className="text-xs text-stone-500">
                        ({emotionCounts[emo]})
                      </p>
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <main className="flex flex-col gap-4">{commentsRender}</main>
    </div>
  );
};

export default EmotionTab;
