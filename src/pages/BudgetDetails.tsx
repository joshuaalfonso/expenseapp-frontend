import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { BudgetHeader } from "@/features/budget-details/BudgeHeader";
import { BudgetExpensesList } from "@/features/budget-details/BudgetExpensesList";
import { useBudgetDetails } from "@/features/budget-details/useBudgetDetails";
import { BackButton } from "@/ui/BackButton";
import { formatNumber } from "@/utils/formatNumber";
import { AlertTriangleIcon } from "lucide-react";
import {  useParams } from "react-router"


export const BudgetDetails = () => {


    const { id } = useParams();

    const budget_id = Number(id) || 0;

    const { budgetdetails, isPending, error } = useBudgetDetails(budget_id);

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return (
        <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
            <AlertTriangleIcon />
            <AlertTitle>
                Sorry, something went wrong while loading budget details.
            </AlertTitle>
        </Alert>
    );

    if (!budgetdetails) return <p>No data was found.</p>

    return (
        <>

            <h1 className="text-xl font-semibold mb-10">Budget Details</h1>

            <div className="flex">
                <BackButton />
            </div>

            <BudgetHeader budgetDetails={budgetdetails.data}/>

            <Separator className="my-6"/>

            <div>
                <div className="grid grid-cols-3 text-center my-4">
                    <div>
                        <p className="opacity-60 text-xs">Allocated</p>
                        <p className="font-semibold text-xl">{formatNumber(budgetdetails?.data.budget_amount)}</p>
                    </div>
                    <div>
                        <p className="opacity-60 text-xs">Spent</p>
                        <p className="font-semibold text-xl">{formatNumber(budgetdetails?.data.total_expense_amount)}</p>
                    </div>
                   <div>
                        <p className="opacity-60 text-xs">Remaining</p>
                        <p className="font-semibold text-xl">{formatNumber(budgetdetails?.data.budget_amount - budgetdetails?.data.total_expense_amount)}</p>
                    </div>
                </div>
                {/* <Progress value={33} /> */}
            </div>

             <Separator className="my-6"/>

            <h1 className="mb-4 opacity-60">Transactions</h1>

            <BudgetExpensesList 
                budgetExpenses={budgetdetails.expenses}
                budget_id={budget_id}
            />

        </>
    )

}

