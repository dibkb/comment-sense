"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { colorMap, emotionBgColor } from "@/utils/colors";
import { useCommentContext } from "@/context/CommentContext";
import { useMemo } from "react";
import { calculateEmotions } from "@/utils";
import { EmotionObj, emotionType, sentimentType } from "@/types/fastapi";
import emotionEmojiMap from "@/utils/emojimap";
import useGetWidth from "@/hooks/useGetWidth";

const chartConfig: Record<string, { label: string }> = {
  visitors: {
    label: "Visitors",
  },
};

export function BarchartEmotion() {
  const { width } = useGetWidth();
  const { data } = useCommentContext();
  // State to manage selected emotion filter
  const emotionCounts = useMemo(() => calculateEmotions(data), [data]);
  const chartData = Object.entries(emotionCounts)
    .filter(([, count]) => count !== 0)
    .map(([emotion, count]) => ({
      label: emotionEmojiMap[emotion as emotionType],
      count,
      //   fill: "hsl(221.2 83.2% 53.3%)",
      fill: emotionBgColor[emotion as emotionType],
    }));
  Object.entries(emotionCounts)
    .filter(([, count]) => count !== 0)
    .forEach(([key, _]) => {
      chartConfig[emotionEmojiMap[key as emotionType]] = {
        label: key,
      };
    });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Count</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 32,
              right: 32,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || ""
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" layout="vertical" radius={4}>
              {width && width > 800 && (
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
              )}
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
