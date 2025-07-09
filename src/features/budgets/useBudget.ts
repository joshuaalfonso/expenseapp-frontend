import { fetchBudgets } from "@/services/apiBudgets"
import { useQuery } from "@tanstack/react-query"






export const useBudget = () => {

    const {data: budgets, isPending, error} = useQuery({
        queryKey: ['budgets'],
        queryFn: fetchBudgets
    })


    return { budgets, isPending, error }

}