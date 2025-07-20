
import type { CategoriesList } from "@/models/categories"
import { useDeleteCategory } from "./useDeleteCategory"
import { CreateEditCategories } from "./CreateEditCategories";
import { useState } from "react";
import { DeleteExpenseConfirmation } from "../expenses/DeleteExpenseConfimation";
import DropdownActionMenu from "@/ui/DropdownActionMenu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { formatNumber } from "@/utils/formatNumber";


export const CategoriesRow = ({row}: {row: CategoriesList}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    
    const { deleteCategoryMutation, isDeleting } = useDeleteCategory();

    const handleCategoryDelete = () => {
        deleteCategoryMutation(
            row.id,
            {
                onSuccess: () => {
                    setAlertOpen(false);
                }
            }
        )
    }

    const average = row.total_expense === 0 ? '-' : Math.round(row.total_expense / row.total_entries);
    const totalSpent = row.total_expense === 0 ? '-' : formatNumber(row.total_expense);
    const totalEntries = row.total_entries === 0 ? '-' : formatNumber(row.total_entries);
    const description = row.description ? row.description : '-'; 

    return (
        <li 
            className="flex flex-col border border-[var(--color-border)] py-3 px-4 gap-3 rounded-[var(--radius-sm)]"
        > 
            <div className="flex justify-between items-center">
                
                <div className="flex gap-2">
                    <span className="text-2xl grid place-items-center w-9">
                        {row.category_icon}
                    </span> 
                    
                    <div className="flex flex-col gap-1">
                        <span 
                            className="font-medium text-sm"
                        >
                            {row.category_name}
                        </span> 
                        <span className="text-xs opacity-60 xl:max-w-80 xl:truncate">
                            {description}
                        </span>
                    </div>
                </div>

                <CreateEditCategories 
                    row={row} 
                    dialogOpen={dialogOpen} 
                    setDialogOpen={setDialogOpen}
                />

                <DeleteExpenseConfirmation 
                    open={alertOpen}
                    onOpenChange={setAlertOpen}
                    onDelete={handleCategoryDelete}
                    isDeleting={isDeleting}
                />

                {row.is_default === 0 && (
                    <DropdownActionMenu 
                        open={menuOpen} 
                        onOpenChange={setMenuOpen}
                    >

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
                )}
            </div>

            <Separator />

            <div className="flex justify-evenly text-center">
                <div className="flex flex-col">
                    <span>{totalSpent}</span>
                    <span className="text-xs opacity-60">Total Spent</span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col">
                    <span>{totalEntries}</span>
                    <span className="text-xs opacity-60">Entries</span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col">
                    <span>{average}</span>
                    <span className="text-xs opacity-60">Average</span>
                </div>
            </div>

        </li>
    )
}



