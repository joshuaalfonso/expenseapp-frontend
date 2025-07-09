import { fetchBudgetDetails } from "@/services/apiBudgets"
import { useQuery } from "@tanstack/react-query"





export const useBudgetDetails = (id: number) => {

    const {data: budgetdetails, isPending, error} = useQuery({
        queryKey: ['budgets', id],
        queryFn: () => fetchBudgetDetails(id)
    })

    return { budgetdetails, isPending, error }

}