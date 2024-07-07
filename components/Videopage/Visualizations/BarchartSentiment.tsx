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
import { colorMap } from "@/utils/colors";
import { useCommentContext } from "@/context/CommentContext";
import { useMemo } from "react";
import { calculateSentiment } from "@/utils";
import { sentimentType } from "@/types/fastapi";
interface chartData {
  label: sentimentType;
  count: number;
  fill: string;
}
const __chartData: chartData[] = [
  { label: "positive", count: 0, fill: colorMap["positive"] },
  { label: "neutral", count: 0, fill: colorMap["neutral"] },
  { label: "negative", count: 0, fill: colorMap["negative"] },
];

const chartConfig = {
  desktop: {
    label: "Comments",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function BarchartSentiment() {
  const { data } = useCommentContext();
  // State to manage selected emotion filter
  const sentimentCounts = useMemo(() => calculateSentiment(data), [data]);
  const chartData = __chartData.map((ele) => ({
    ...ele,
    count: sentimentCounts[ele.label],
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Count</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px]">
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
            <Bar dataKey="count" layout="vertical" radius={12}>
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
