import type { ExpensesList } from "@/models/expenses"
import { formatNumber } from "@/utils/formatNumber"
import { format } from "date-fns"


export const BudgetExpensesRow  = ({budgetExpenses}: {budgetExpenses: ExpensesList[]}) => {
    return (
        //    {/* <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"> */}
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {budgetExpenses?.map(row => (
                <li key={row.id} className="border border-[var(--color-border)] py-2 px-4 flex items-center justify-between gap-2 rounded-[var(--radius-sm)]">
                    <div className="flex gap-3 flex-1">
                        <div className="text-3xl flex items-center">{row.category_icon}</div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-sm w-30 truncate ">{row.category_name}</span>
                            <span className="text-xs opacity-70">
                                {/* {(isItToday ? 'Today' : format(new Date(row.date), "MMM d, yyyy")) || "No date"} */}
                                {row.date ? format(new Date(row.date), "MMM d, yyyy") : 'no date'}
                            </span>
                        </div>
                    </div>
                    <div className="text-[var(--color-destructive)] ">- {formatNumber(row.amount)}</div>
                </li>
            ))}
        </ul>
    )
}