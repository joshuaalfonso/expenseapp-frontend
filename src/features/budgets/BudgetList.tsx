import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useBudget } from "./useBudget"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { BudgetRow } from "./BudgetRow";

export const BudgetList = () => {


    const { budgets, isPending, error } = useBudget();

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return (
         <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
            <AlertTriangleIcon />
            <AlertTitle>
                Sorry, something went wrong while loading budgets.
            </AlertTitle>
        </Alert>
    )

    // console.log('budget list init')

    return (
        <>
        
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">

                {budgets?.map(item => (
                    <BudgetRow row={item} key={item.id}/>
                ))}

            </div>
        
        </>
    )


}