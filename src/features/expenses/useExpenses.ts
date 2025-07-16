import { fetchPaginatedExpenses } from "@/services/apiExpenses"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import { useSearchParams } from "react-router"





export const useExpenses = () => {

    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const sortValue = searchParams.get('sort') || 'desc';
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
    
    const {data: paginatedData, isPending, error} = useQuery({
        queryKey: ['expenses', page, sortValue],
        queryFn: () => fetchPaginatedExpenses(page, sortValue),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    const count = paginatedData?.totalPages || 1;

    useEffect(() => {
        if (!paginatedData) return;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (page < count) {
            queryClient.prefetchQuery({
                queryKey: ['expenses', page + 1, sortValue],
                queryFn: () => fetchPaginatedExpenses(page + 1, sortValue),
            });
        }

        if (page > 1) {
            queryClient.prefetchQuery({
                queryKey: ['expenses', page - 1, sortValue],
                queryFn: () => fetchPaginatedExpenses(page - 1, sortValue),
            });
        }
    }, [page, sortValue, paginatedData, queryClient, count]);

    return { paginatedData, isPending, error }

}