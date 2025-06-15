import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ExpensesList } from "@/models/expenses"
import { format, isToday } from "date-fns"
import { EllipsisVertical, Loader2Icon } from "lucide-react"
import React, { useState } from "react"
import { CreateEditExpenses } from "./CreateEditExpenses"
import type { CategoriesList } from "@/models/categories"
import { formatNumber } from "@/utils/formatNumber"
import { useDeleteExpense } from "./useDeleteExpense"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"


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
        <li className="border border-[var(--color-border)] py-2 px-4 flex items-center justify-between gap-2 rounded-[var(--radius-sm)]">
            <div className="flex gap-3 flex-1">
                <div className="text-3xl flex items-center">{row.category_icon}</div>
                <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm w-30 truncate ">{row.category_name}</span>
                    <span className="text-xs opacity-70">
                        {(isItToday ? 'Today' : format(new Date(row.date), "MMM d, yyyy")) || "No date"}
                    </span>
                </div>
            </div>
            <div className="text-[var(--color-destructive)] ">- {formatNumber(row.amount)}</div>

            <CreateEditExpenses
                row={row} 
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                categories={categories || []}
                isCategoriesLoading={isCategoriesLoading}
                categoriesError={categoriesError}
            />

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>

                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button 
                            variant="outline"
                            className={`
                                !bg-[var(--color-destructive)]/10  
                                text-[var(--color-destructive)] 
                                !border-[var(--color-destructive)]/10
                                hover:!bg-[var(--color-destructive)]/60
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                handleExpenseDelete();
                                console.log('asd')
                            }}
                            disabled={isDeleting} 
                        >
                            { isDeleting && <Loader2Icon className="animate-spin" /> }
                           { isDeleting ? 'Deleting': 'Delete' }
                        </Button>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu 
                open={menuOpen} 
                onOpenChange={setMenuOpen}
            >
                <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
                    
                    <Button variant="ghost" size="sm">
                        <EllipsisVertical  />
                    </Button>
                     
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => {
                            e.preventDefault();
                            setMenuOpen(false);
                            setDialogOpen(true);
                        }} >
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
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    )
}

export const ExpensesRow = React.memo(ExpensesRowComponent);