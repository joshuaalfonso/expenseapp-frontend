import type { Expense } from "@/models/budgets"
import type { SortOptions } from "@/ui/SortBy"
import { useState } from "react"
import SortSelect from "./SortBy"
import { format } from "date-fns"
import { formatNumber } from "@/utils/formatNumber"
// import { useCategories } from "../categories/useCategories"

interface Props {
    budgetExpenses: Expense[],
    budget_id: number
}

const options: SortOptions[] = [
    {
        value: 'desc', 
        label: "Sort by date (recent first)"
    },
    {
        value: 'asc', 
        label: "Sort by date (old first)"
    }
]

export const BudgetExpensesList = ({budgetExpenses, budget_id}: Props) => {

    const [sortValue, setSortValue] = useState("desc");

    // const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleSortChange = (value: string) => {
        setSortValue(value);
    };

    const budgetId = budget_id || 0;

    console.log(budgetId)

    // const { 
    //     data: categories, 
    //     isPending: isCategoriesLoading, 
    //     error: categoriesError 
    // } = useCategories();

    const filteredExpenses = [...budgetExpenses].sort((a, b) => {

        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

         return sortValue === "asc"
        ? dateA - dateB
        : dateB - dateA;
    })

    if (!budgetExpenses || budgetExpenses.length === 0) return <p className="text-center py-6">No transactions found.</p>

    return (
        <>
            <div>

                {budgetExpenses.length > 1 && (

                    <SortSelect
                        options={options}
                        value={sortValue}
                        onChange={handleSortChange}
                        label="Sort By"
                        placeholder="Choose an option"
                    />

                )}

                
                {/* <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"> */}
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {filteredExpenses.map(row => (
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

            </div>
        </>
    )


}