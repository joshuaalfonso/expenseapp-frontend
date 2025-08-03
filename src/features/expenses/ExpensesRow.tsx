import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { ExpensesList } from "@/models/expenses"
import { format, isToday } from "date-fns"
import React, { useState } from "react"
import { CreateEditExpenses } from "./CreateEditExpenses"
import type { CategoriesList } from "@/models/categories"
import { formatNumber } from "@/utils/formatNumber"
import { useDeleteExpense } from "./useDeleteExpense"
import DropdownActionMenu from "@/ui/DropdownActionMenu"
import { DeleteConfirmationDialog } from "@/ui/DeleteConfirmationDialog"


interface Props {
    row?: ExpensesList,
    categories?: CategoriesList[]; 
    isCategoriesLoading?: boolean;
    categoriesError?: Error | null;
}


const ExpensesRowComponent = ({row = {} as ExpensesList, categories, isCategoriesLoading, categoriesError}: Props) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    
    const {
        deleteExpenseMutation,
        isDeleting
    } = useDeleteExpense();

    const handleExpenseDelete = () => {
        deleteExpenseMutation(
            row,
            {
                onSuccess: () => {
                    setAlertOpen(false)
                }
            }
        )
    }

    const isItToday = isToday(new Date(row.date));
    // console.log('Expense row :' + row.id)

    return (
        <li 
            className="border border-[var(--color-border)] py-2 px-4 flex items-center justify-between gap-2 rounded-[var(--radius-sm)]"
        >

            <div className="flex gap-3 flex-1">

                <div className="text-3xl flex items-center justify-center w-11 ">
                    {row.category_icon}
                </div>

                <div className="flex flex-col gap-1">

                    <span className="font-medium text-sm w-30 xl:w-40 truncate capitalize">
                        {row.description || '-'}
                    </span>

                    <div className="flex items-center gap-3">
                        <span className="text-xs opacity-70">
                            {(isItToday ? 'Today' : format(new Date(row.date), "MMM d, yyyy")) || "No date"}
                        </span>
                        {/* <Separator orientation="vertical" /> */}
                        <span className="opacity-70">∙</span>
                          <span className="text-xs opacity-70">
                            {row.category_name}
                        </span>
                    </div>
                    
                </div>

            </div>

            <div 
                className="text-[var(--color-destructive)] "
            >
                - {formatNumber(row.amount)}
            </div>

            <CreateEditExpenses
                row={row} 
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                categories={categories || []}
                isCategoriesLoading={isCategoriesLoading}
                categoriesError={categoriesError}
            />

            <DeleteConfirmationDialog 
                open={alertOpen}
                onOpenChange={setAlertOpen}
                onDelete={handleExpenseDelete}
                isDeleting={isDeleting}
            />

            <DropdownActionMenu open={menuOpen} onOpenChange={setMenuOpen}>

                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setDialogOpen(true);
                    }}
                >
                    <i className="fi fi-rr-pencil flex"></i>
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer"
                    disabled={isDeleting}
                    onSelect={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setAlertOpen(true);
                    }}
                >
                    <i className="fi fi-rr-trash flex"></i>
                    Delete
                </DropdownMenuItem>

            </DropdownActionMenu>
        </li>
    )
}

export const ExpensesRow = React.memo(ExpensesRowComponent);