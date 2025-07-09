import type { Data } from "@/models/budgets"
import { format } from "date-fns";


interface Props {
    budgetDetails: Data
}

export const BudgetHeader = ({budgetDetails}: Props)  => {

    const date = budgetDetails.date_created ? format(new Date(budgetDetails.date_created), "MMM d, yyyy") : null;

    return (

        <div className="p-6 flex items-center justify-between bg-[var(--color-primary)]/5 rounded-[var(--radius-sm)] w-full mb-10">

            <div className="flex items-center gap-2">
                <span className="text-3xl">{budgetDetails?.budget_icon}</span>
                <div className="flex flex-col">
                    <span className="text-md font-medium">{budgetDetails?.budget_name}</span>
                    <small className="opacity-60">{date}</small> 
                </div>
            </div>

            <div>
                <span className="text-xl text-[var(--color-primary)]">₱ {budgetDetails?.budget_amount}</span>
            </div>

        </div>

    )

}