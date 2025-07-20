import { LoadingSpinner } from "@/ui/LoadingSpinner";
import { useBudget } from "./useBudget"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { BudgetRow } from "./BudgetRow";
import { motion } from "framer-motion";

export const BudgetList = () => {


    const { budgets, isPending, error } = useBudget();

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return (
         <Alert className="bg-[var(--color-destructive)]/10 text-[var(--color-destructive)] border-[var(--color-destructive)]/10">
            <AlertTriangleIcon />
            <AlertTitle>
                Sorry, something went wrong while loading budgets.
            </AlertTitle>
        </Alert>
    )

    // console.log('budget list init')

    return (
        <>
        
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">

                {budgets?.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                    >
                        <BudgetRow row={item} key={item.id}/>
                    </motion.div>
                ))}

            </div>
        
        </>
    )


}