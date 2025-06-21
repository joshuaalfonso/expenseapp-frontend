





"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { ChartConfig } from "@/components/ui/chart"
import type { MonthsExpense } from "@/models/dashboard"

export const description = "A bar chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export function DashboardMonthsChart( {monthsExpense}: {monthsExpense: MonthsExpense[]} ) {


  // const maxValue = Math.max(...monthsExpense.map(item => +item.total));
  const currentYear = new Date().getFullYear();

  const highestExpense = monthsExpense.reduce((max, current) => {
    return current.total > max.total ? current : max;
  }, monthsExpense[0]);

    return (
        <Card className="bg-[var(--background)]">
          <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
              <CardDescription>Year {currentYear}</CardDescription>
          </CardHeader>
          <CardContent>
              <ChartContainer config={chartConfig}>
              <BarChart 
                accessibilityLayer 
                data={monthsExpense}
                margin={{
                  top: 20
                }}
              >
                  <CartesianGrid vertical={false} />
                  <XAxis
                      dataKey="month_name"
                      tickLine={true}
                      tickMargin={10}
                      axisLine={false}
                      tick={{ fontSize: 10 }}
                      tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis domain={[0, highestExpense.total + 200]} hide={true}/> 
                  <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar dataKey="total" fill="var(--color-desktop)" radius={5}>
                    <LabelList 
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
              </BarChart>
              </ChartContainer>
          </CardContent>
          {+highestExpense?.total > 0 && (
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
              The highest expense is in {highestExpense.month_name}, totaling {highestExpense.total}.
              </div>
              <div className="text-muted-foreground leading-none">
              Showing total expenses for each month
              </div>
            </CardFooter>
          )}
        </Card>
    )
}
