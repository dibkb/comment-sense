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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { colorMap, emotionBgColor } from "@/utils/colors";
import { useCommentContext } from "@/context/CommentContext";
import { useMemo } from "react";
import { calculateEmotions, calculateSentiment } from "@/utils";
import { emotionType, sentimentType } from "@/types/fastapi";
interface chartData {
  label: string;
  count: number;
  fill: string;
}
// const __chartData: chartData[] = [
//   { label: "positive", count: 0, fill: colorMap["positive"] },
//   { label: "neutral", count: 0, fill: colorMap["neutral"] },
//   { label: "negative", count: 0, fill: colorMap["negative"] },
// ];

const chartConfig = {
  desktop: {
    label: "Comments",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function BarchartEmotion() {
  const { data } = useCommentContext();
  // State to manage selected emotion filter
  const emotionCounts = useMemo(() => calculateEmotions(data), [data]);
  const chartData: chartData[] = [];
  for (let key in emotionCounts) {
    if (emotionCounts[key] !== 0)
      chartData.push({
        label: key,
        count: emotionCounts[key],
        fill: emotionBgColor[key],
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Count</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[800px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" layout="vertical" radius={4}>
              <LabelList
                dataKey="label"
                position="insideLeft"
                offset={16}
                className="fill-[--color-label]"
                fontSize={16}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
