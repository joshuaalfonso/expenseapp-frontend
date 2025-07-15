
import { ExpensesRow } from "./ExpensesRow";
import { CreateEditExpenses } from "./CreateEditExpenses";
import { useCategories } from "../categories/useCategories";
import {  useState } from "react";
import { SortBy, type SortOptions } from "../../ui/SortBy";
import { useExpenses } from "./useExpenses";
import { PaginationUI    } from "@/ui/PaginationUI";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";


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


export const ExpensesList = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const {paginatedData, isPending, error} = useExpenses();

    const { 
        data: categories, 
        isPending: isCategoriesLoading, 
        error: categoriesError 
    } = useCategories();
    
    // console.log('expense list init')

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if ( !paginatedData || error) return (
        <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
            <AlertTriangleIcon />
            <AlertTitle>
                Sorry, something went wrong while loading your expenses.
            </AlertTitle>
        </Alert>
    );

    return (
        <>
            <div className="flex justify-between gap-4 mb-4">

                <SortBy options={options} />

                <CreateEditExpenses 
                    categories={categories || []}
                    isCategoriesLoading={isCategoriesLoading}
                    categoriesError={categoriesError}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            </div>

            {paginatedData?.data?.length === 0 && (
                 <div className="h-[200px] grid place-items-center bg-[var(--color-input]) rounded-[var(--radius-sm)]">
                    <p className="text-center col-span-full opacity-70">No expenses found.</p>
                </div>
            )}
            

            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
                {paginatedData?.data?.map(row => (
                    <ExpensesRow 
                        row={row} 
                        key={row.id}
                        categories={categories || []}
                        isCategoriesLoading={isCategoriesLoading}
                        categoriesError={categoriesError} 
                    />
                ))}
            </ul>

            <PaginationUI 
                count={paginatedData?.total || 0}
                pageCount={paginatedData?.totalPages || 0}
            />
        </>
    )
}