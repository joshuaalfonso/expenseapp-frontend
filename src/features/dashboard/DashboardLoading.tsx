import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-primary)",
  },
} satisfies ChartConfig

export const DashboardLoading = () => {

    return (
        <>

            <div className="mb-4">
                <Skeleton className="h-[24px] w-[200px] rounded-xl"/>
            </div> 

            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">

                 {Array.from({ length: 3 }, (_, i) => (

                    <div 
                        key={i}
                        className="flex items-center gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
                    >
                        <div className="p-4 rounded-full">
                            <Skeleton className="h-[18px] w-[20px] rounded-xl"/>
                        </div>
                        <div className="flex flex-col gap-1 justify-center">
                            <span className="text-sm font-medium opacity-70"><Skeleton className="h-[20px] w-[100px] rounded-xl"/></span>
                            <span className="font-semibold text-xl"><Skeleton className="h-[17px] w-[50px] rounded-xl"/></span>
                        </div>
                    </div>
                 
                 ))}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">

                <Card className="bg-[var(--background)]">
                    <CardHeader>
                        <CardTitle><Skeleton className="h-[20px] w-[150px] rounded-sm"/></CardTitle>
                        <CardDescription><Skeleton className="h-[20px] w-[120px] rounded-sm"/></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <Skeleton className="h-full w-full rounded-sm"/>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                            <Skeleton className="h-[18px] w-[260px] rounded-xl"/>
                        </div>
                        <div className="text-muted-foreground leading-none">
                            <Skeleton className="h-[18px] w-[290px] rounded-xl"/>
                        </div>
                    </CardFooter>
                </Card>

                <Card className="bg-[var(--background)]">
                    <CardHeader>
                        <CardTitle><Skeleton className="h-[20px] w-[150px] rounded-sm"/></CardTitle>
                        <CardDescription><Skeleton className="h-[20px] w-[120px] rounded-sm"/></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <Skeleton className="h-full w-full rounded-sm"/>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 leading-none font-medium">
                            <Skeleton className="h-[18px] w-[260px] rounded-xl"/>
                        </div>
                        <div className="text-muted-foreground leading-none">
                            <Skeleton className="h-[18px] w-[290px] rounded-xl"/>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        
        </>
    )


}