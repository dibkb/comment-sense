import React, { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { emotionType } from "@/types/fastapi";
import emotionEmojiMap from "@/utils/emojimap";
import SingleComment from "../SingleComment";
// import { mockData } from "../mock";
import { calculateEmotions } from "@/utils";
import { useCommentContext } from "@/context/CommentContext";

const EmotionTab = () => {
  const { data } = useCommentContext();
  // State to manage selected emotion filter
  const [select, setSelect] = useState<emotionType | "all">("all");

  // Memoized calculation of emotion counts
  const emotionCounts = useMemo(() => calculateEmotions(data), [data]);

  // Memoized selection of comments to display based on current filter
  const commentsToDisplay = useMemo(() => {
    if (select === "all") {
      return data;
    } else {
      return data.filter((d) => d.emotion.label === select);
    }
  }, [select, data]);

  // Rendering comments based on filtered data
  const commentsRender = commentsToDisplay.map((c) => (
    <SingleComment key={c.cid} comment={c} type="emotion" />
  ));

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Emotion filter dropdown */}
      <div className="mx-auto">
        <Select onValueChange={(emo: emotionType | "all") => setSelect(emo)}>
          <SelectTrigger className="w-[260px] capitalize">
            <SelectValue placeholder="Filter by Emotion" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Emotion Options</SelectLabel>
              {/* Option to display all comments */}
              <SelectItem value={"all"} className="capitalize">
                <span className="flex gap-2 items-center">
                  <span className="ml-6">all</span>
                  <p className="text-xs text-stone-500">({data.length})</p>
                </span>
              </SelectItem>
              {/* Options for each emotion type */}
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
      {/* Main comment section */}
      <main className="flex flex-col gap-4">{commentsRender}</main>
    </div>
  );
};

export default EmotionTab;
