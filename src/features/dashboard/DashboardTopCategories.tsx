"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { TopCategories } from "@/models/dashboard"
import { Pie, PieChart } from "recharts"


export const description = "A donut chart"


export function DashboardTopCategories({topCategories}: {topCategories: TopCategories[]}) {


    const chartData = topCategories.map((item, index) => ({
        category: item.category_name,
        total: +item.total,
        totalAndCategory: `${item.total} — ${item.category_name}`, 
        fill: `var(--chart-${index + 1})`, 
    }));

    // console.log(chartData)

    const chartConfig = {
        total: {
            label: "Total",
        },
        ...topCategories.reduce((acc, item, index) => {
            acc[item.category_name] = {
            label: `${item.category_name}`,
            color: `var(--chart-${index + 1})`,
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>),
    };

    // console.log(chartConfig)

    const highestEntry = topCategories.reduce((max, current) => {
        return current.total > max.total ? current : max;
    }, topCategories[0]);


    return (
        <Card className="flex flex-col bg-[var(--background)]">

            <CardHeader className="items-center pb-0">
                <CardTitle> Top Categories </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className=" mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
                >
                    {/* aspect-square */}
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent 
                                className="w-[150px]" 
                                nameKey="total" 
                                labelKey="category"  
                                indicator="line"
                            />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            innerRadius={62}
                            paddingAngle={5}
                            
                        >
                        </Pie>
                        <ChartLegend 
                            content={<ChartLegendContent nameKey="category"/>}
                            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-end *:text-nowrap"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>

            { highestEntry && (
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        The highest entry is {highestEntry.category_name}, totaling {highestEntry.total}.
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing the most entries in each category for the year.
                    </div>
                </CardFooter>
            )}
            
        </Card>
    )
}

