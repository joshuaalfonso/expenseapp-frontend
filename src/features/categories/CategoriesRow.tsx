import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import type { CategoriesList } from "@/models/categories"
import { useDeleteCategory } from "./useDeleteCategory"
import { CreateEditCategories } from "./CreateEditCategories";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis, Loader2Icon } from 'lucide-react';

import { 
    AlertDialog, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "@/components/ui/alert-dialog"


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
            <span className="text-xl">
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
                                handleCategoryDelete();
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
                    

                    {row.is_default === 0 && (
                        <Button variant="ghost">
                            <Ellipsis />
                        </Button>
                    )}
                    
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
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    )
}



