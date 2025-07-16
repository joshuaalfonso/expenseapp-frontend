
import type { SortOptions } from "@/ui/SortBy"
import { useState } from "react"
import SortSelect from "./SortBy"
import { CreateEditBudgetExpense } from "./CreateEditBudgetExpense"
import { useCategories } from "../categories/useCategories"
import type { ExpensesList } from "@/models/expenses"
import { BudgetExpensesRow } from "./BudgetExpensesRow"

interface Props {
    budgetExpenses: ExpensesList[],
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

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const { 
        data: categories, 
    } = useCategories();
    // isPending: isCategoriesLoading, 
    // error: categoriesError 
    
    const handleSortChange = (value: string) => {
        setSortValue(value);
    };

    const budgetId = budget_id || 0;

    // console.log(budgetId)

    const filteredExpenses = [...budgetExpenses].sort((a, b) => {

        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

         return sortValue === "asc"
        ? dateA - dateB
        : dateB - dateA;
    })

    // if (!budgetExpenses || budgetExpenses.length === 0) return <p className="text-center py-6">No transactions found.</p>

    return (
        <>
            <div>

                {/* {budgetExpenses.length > 1 && ( */}

                {/* // )} */}

                <div className="flex justify-between">
                    <SortSelect
                        options={options}
                        value={sortValue}
                        onChange={handleSortChange}
                        label="Sort By"
                        placeholder="Choose an option"
                    />

                    <CreateEditBudgetExpense 
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        budgetId={budgetId}
                        categories={categories}
                    />
                </div>

                {!budgetExpenses || budgetExpenses.length === 0 && <p className="text-center py-10">No transactions found.</p>}

                <BudgetExpensesRow 
                    budgetExpenses={filteredExpenses}
                />

            </div>
        </>
    )


}