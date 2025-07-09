
import { BudgetList } from "@/features/budgets/BudgetList";
import { CreateEditBudget } from "@/features/budgets/CreateEditBudget"
import { useState } from "react"



export const Budgets = () => {

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <h1 className="text-xl font-semibold mb-10">Budgets</h1>

            <div className="flex justify-end gap-4 mb-4">
            

                <CreateEditBudget 
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />

            </div>

            <BudgetList />

            
        </>
    )
}