import { useState } from "react";
import { useCategories } from "./useCategories";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CreateEditCategories } from "./CreateEditCategories";
import { CategoriesRow } from "./CategoriesRow";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";


export const CategoriesList = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const { data: categories, isPending, error } = useCategories();

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return (
         <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
            <AlertTriangleIcon />
            <AlertTitle>
                Sorry, something went wrong while loading categories.
            </AlertTitle>
        </Alert>
    )


    return (
        <>
            <div className="mb-4 flex justify-end">
                <CreateEditCategories 
                    dialogOpen={dialogOpen} 
                    setDialogOpen={setDialogOpen}
                />
            </div>

            {categories?.length === 0 && (
                <div className="h-[200px] grid place-items-center bg-[var(--color-input]) rounded-[var(--radius-sm)]">
                    <p className="text-center col-span-full opacity-70">No categories found.</p>
                </div>
            )}

            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {categories?.map(row => (
                    <CategoriesRow row={row} key={row.id}/>
                ))}
            </ul>
        </>
    )
}