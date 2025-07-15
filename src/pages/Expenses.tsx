// import { LoadingSpinner } from "@/components/LoadingSpinner";
// import { Alert, AlertTitle } from "@/components/ui/alert";
import { ExpensesList } from "@/features/expenses/ExpensesList"
// import { useExpenses } from "@/features/expenses/useExpenses";
// import { AlertTriangleIcon } from "lucide-react";
// import { useState } from "react";


export const Expenses = () => {

    // const [page, setPage] = useState(1);
    // const { paginatedData, isPending, error } = useExpenses(page);

    // if (isPending) return (
    //     <div className="flex justify-center">
    //         <LoadingSpinner />
    //     </div>
    // );

    // if ( !paginatedData || error) return (
    //     <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
    //         <AlertTriangleIcon />
    //         <AlertTitle>
    //             Sorry, something went wrong while loading your expenses.
    //         </AlertTitle>
    //     </Alert>
    // );

    return (
        <>
            <h1 className="text-xl font-semibold mb-10">Expenses</h1>
            <ExpensesList 
                // paginatedData={paginatedData}
                // page={page}
                // setPage={setPage}
            />
        </>
    )
}