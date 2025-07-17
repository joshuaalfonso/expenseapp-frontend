
import type { CategoriesList } from "@/models/categories"
import { useDeleteCategory } from "./useDeleteCategory"
import { CreateEditCategories } from "./CreateEditCategories";
import { useState } from "react";
import { DeleteExpenseConfirmation } from "../expenses/DeleteExpenseConfimation";
import DropdownActionMenu from "@/ui/DropdownActionMenu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";


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

    return (
        <li 
            className="border border-[var(--color-border)] py-2 px-4 flex items-center gap-2 rounded-[var(--radius-sm)]"
        >
            <span className="text-xl grid place-items-center w-9">
                {row.category_icon}
            </span> 
            
            <span 
                className="font-medium flex-1 text-sm"
            >
                {row.category_name}
            </span> 

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

        </li>
    )
}



