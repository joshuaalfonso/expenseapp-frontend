import { useState } from "react";
// import { useCategories } from "./useCategories";
import { LoadingSpinner } from "@/ui/LoadingSpinner";
import { CreateEditCategories } from "./CreateEditCategories";
import { CategoriesRow } from "./CategoriesRow";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { usePaginatedCategories } from "./usePaginatedCategories";
import { PaginationUI } from "@/ui/PaginationUI";
import { motion } from "framer-motion";


export const CategoriesList = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    // const { data: categories, isPending, error } = useCategories();

    const { data: paginatedCategories, isPending, error } = usePaginatedCategories();

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

            {paginatedCategories?.data?.length === 0 && (
                <div className="h-[200px] grid place-items-center bg-[var(--color-input]) rounded-[var(--radius-sm)]">
                    <p className="text-center col-span-full opacity-70">No categories found.</p>
                </div>
            )}

            {/* <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"> */}
            <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {paginatedCategories?.data?.map((row, index) => (
                    <motion.div
                        key={row.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                        <CategoriesRow row={row} />
                    </motion.div>
                ))}
            </ul>

            <PaginationUI 
                count={paginatedCategories?.total || 0}
                pageCount={paginatedCategories?.totalPages || 0}
            />
        </>
    )
}