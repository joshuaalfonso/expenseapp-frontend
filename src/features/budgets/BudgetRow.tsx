import { Progress } from "@/components/ui/progress"
import type { BudgetList } from "@/models/budgets"
import { CreateEditBudget } from "./CreateEditBudget";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useDeleteBudget } from "./useDeleteBudget";
import { formatNumber } from "@/utils/formatNumber";
import DropdownActionMenu from "@/ui/DropdownActionMenu";
import { DeleteExpenseConfirmation } from "../expenses/DeleteExpenseConfimation";


export const BudgetRow = ({ row }: { row: BudgetList }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const percentage = row.budget_amount > 0
        ? (row.total_expense_amount / row.budget_amount) * 100
        : 0;

    const { deleteBudgetMutation, isDeleting } = useDeleteBudget();

    const handeBudgetDelete = () => {
        deleteBudgetMutation(
            row.id,
            {
                onSuccess: () => {
                    setAlertOpen(false);
                }
            }
        )
    }

    // const date = row.date_created ? format(new Date(row.date_created), "MMM d, yyyy") : null;

    // console.log('budget row init')

    return (
        <div
            className="flex flex-col gap-4 border border-[var(--color-border)] rounded-[var(--radius-sm)] p-4"
        >
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-[var(--color-primary)]/5">
                    <div className="text-2xl grid place-items-center">{row.budget_icon}</div>
                </div>
                <div className="flex-1 flex flex-col gap-1 justify-center">
                    <span className="font-semibold sm">{row.budget_name}</span>
                    <span className="text-sm font-medium opacity-70">{row.total_items} {`Item${row.total_items > 1 ? 's': ''}`}</span>
                </div>
                {/* <div className="flex-1 flex justify-end text-[var(--color-primary)] font-semibold">
                    ₱ {row.budget_amount}
                </div> */}

                <DeleteExpenseConfirmation 
                    open={alertOpen}
                    onOpenChange={setAlertOpen}
                    onDelete={handeBudgetDelete}
                    isDeleting={isDeleting}
                />

                <DropdownActionMenu 
                    open={menuOpen} 
                    onOpenChange={setMenuOpen}
                >
    
                    <Link to={`/budgets/${row.id}`} >
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => {
                                e.preventDefault();
                                setMenuOpen(false);
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <i className="fi fi-rr-eye flex"></i>
                                View Details
                            </div>
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="cursor-pointer" onSelect={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setDialogOpen(true);
                    }} >
                        <i className="fi fi-rr-pencil flex"></i>
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer"
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

            </div>

            <div className="space-y-2">
                <div className="text-xs font-medium opacity-50  flex justify-between items-center ">
                    <span>₱ {formatNumber(row.total_expense_amount)} Spent</span>
                    <span>₱ {formatNumber(row.budget_amount - row.total_expense_amount)} Remaining</span>
                </div>
                <Progress value={percentage} />
            </div>

            <CreateEditBudget
                row={row}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />


        </div>
    )
}