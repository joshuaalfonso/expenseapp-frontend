import { Progress } from "@/components/ui/progress"



export const Budgets = () => {
    return (
        <>
            <h1 className="text-xl font-semibold mb-10">Budgets</h1>


            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">

                <div 
                    className="flex flex-col gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-[var(--color-primary)]/5">
                            <div className="text-2xl grid place-items-center">🚢</div>
                        </div>
                        <div className="flex flex-col gap-1 justify-center">
                            <span className="font-semibold sm">Travel</span>
                            <span className="text-sm font-medium opacity-70">2 Items</span>
                        </div>
                        <div className="flex-1 flex justify-end text-[var(--color-primary)] font-semibold">
                            ₱ 500
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs font-medium opacity-50  flex justify-between items-center ">
                            <span>₱ 290 Spend</span>
                            <span>₱ 210 Remaining</span>
                        </div>
                        <Progress value={33}/>
                    </div>
                </div>

                <div 
                    className="flex flex-col gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-[var(--color-primary)]/5">
                            <div className="text-2xl grid place-items-center">🛒</div>
                        </div>
                        <div className="flex flex-col gap-1 justify-center">
                            <span className="font-semibold sm">Grocery</span>
                            <span className="text-sm font-medium opacity-70">2 Items</span>
                        </div>
                        <div className="flex-1 flex justify-end text-[var(--color-primary)] font-semibold">
                            ₱ 4000
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs font-medium opacity-50 flex justify-between items-center ">
                            <span>₱ 1000 Spend</span>
                            <span>₱ 3000 Remaining</span>
                        </div>
                        <Progress value={25}/>
                    </div>
                </div>

            </div>
        </>
    )
}