import { useCommentContext } from "@/context/CommentContext";
import { calculateSentiment } from "@/utils";
import React, { useMemo, useState } from "react";
import SingleComment from "../SingleComment";
import SentimentBar from "../Sentimentbar";
import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
// import { mockData } from "../mock";
import { sentimentType } from "@/types/fastapi";
import { colorMap } from "@/utils/colors";
import { cn } from "@/lib/utils";

const SentimentTab = () => {
  const { data } = useCommentContext();
  const sentimentCounts = useMemo(() => calculateSentiment(data), []);
  const [select, setSelect] = useState<sentimentType | "all">("all");

  const commentsToDisplay = useMemo(() => {
    if (select === "all") return data;
    else return data.filter((d) => d.sentiment.label === select);
  }, [select]);
  const commentsRender = commentsToDisplay.map((c) => {
    return <SingleComment key={c.cid} comment={c} />;
  });
  const selectOptions: (sentimentType | "all")[] = [
    "all",
    "positive",
    "neutral",
    "negative",
  ];
  return (
    <div className="flex flex-col gap-4 mt-4">
      <SentimentBar {...sentimentCounts} />
      <div className="mx-auto">
        <Select onValueChange={(v: sentimentType | "all") => setSelect(v)}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="Filter by sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter Options</SelectLabel>
              {selectOptions.map((s) => {
                return (
                  <SelectItem key={s} value={s} className="capitalize">
                    <span className="flex gap-2 items-center">
                      {s}
                      {s !== "all" && (
                        <span
                          className={cn(
                            "size-3 rounded-full",
                            `bg-[${colorMap[s]}]`
                          )}
                        />
                      )}
                      <p className="text-xs text-stone-500">
                        ({s === "all" ? data.length : sentimentCounts[s]})
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

export default SentimentTab;
