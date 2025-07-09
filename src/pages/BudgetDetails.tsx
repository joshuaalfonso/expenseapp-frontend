import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { BudgetHeader } from "@/features/budget-details/BudgetDetails";
import { BudgetExpensesList } from "@/features/budget-details/BudgetExpensesList";
import { useBudgetDetails } from "@/features/budgets/useBudgetDetails";
import { AlertTriangleIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router"


export const BudgetDetails = () => {

    const navigate = useNavigate();

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
                <span onClick={() => navigate(-1)} className="group flex items-center gap-2 mb-4 cursor-pointer">
                    <i className="fi fi-rr-arrow-left grid group-hover:-translate-x-1  duration-200 ease-in-out"></i> 
                    <small>Back</small>
                </span>
            </div>

            <BudgetHeader budgetDetails={budgetdetails.data}/>

            <h1 className="mb-4 opacity-60">Transactions</h1>

            <BudgetExpensesList 
                budgetExpenses={budgetdetails.expenses}
                budget_id={budget_id}
            />

        </>
    )

}

