import { fetchPaginatedExpenses } from "@/services/apiExpenses"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"





export const useExpenses = (page: number) => {

    const [searchParams] = useSearchParams();

    const sortValue = searchParams.get('sort') || 'desc';
    
    const {data: paginatedData, isPending, error} = useQuery({
        queryKey: ['expenses', page, sortValue],
        queryFn: () => fetchPaginatedExpenses(page, sortValue),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    return { paginatedData, isPending, error }

}