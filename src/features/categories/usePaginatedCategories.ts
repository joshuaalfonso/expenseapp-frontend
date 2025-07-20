import { fetchPaginatedCategories } from "@/services/apiCategories"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react";
import { useSearchParams } from "react-router";


export const usePaginatedCategories = () => {

    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const { data, isPending, error } = useQuery({ 
        queryKey: ['categories', page], 
        queryFn: () => fetchPaginatedCategories(page),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

        const count = data?.totalPages || 1;

    useEffect(() => {
        if (!data) return;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (page < count) {
            queryClient.prefetchQuery({
                queryKey: ['categories', page + 1],
                queryFn: () => fetchPaginatedCategories(page + 1),
            });
        }

        if (page > 1) {
            queryClient.prefetchQuery({
                queryKey: ['categories', page - 1],
                queryFn: () => fetchPaginatedCategories(page - 1),
            });
        }
    }, [page, data, queryClient, count]);

    return { data, isPending, error }

}





// export const useExpenses = () => {

//     const queryClient = useQueryClient();
//     const [searchParams] = useSearchParams();

//     const sortValue = searchParams.get('sort') || 'desc';
//     const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
    
//     const {data: paginatedData, isPending, error} = useQuery({
//         queryKey: ['expenses', page, sortValue],
//         queryFn: () => fetchPaginatedExpenses(page, sortValue),
//         placeholderData: keepPreviousData,
//         staleTime: 5000,
//     })

//     const count = paginatedData?.totalPages || 1;

//     useEffect(() => {
//         if (!paginatedData) return;

//         window.scrollTo({ top: 0, behavior: 'smooth' });

//         if (page < count) {
//             queryClient.prefetchQuery({
//                 queryKey: ['expenses', page + 1, sortValue],
//                 queryFn: () => fetchPaginatedExpenses(page + 1, sortValue),
//             });
//         }

//         if (page > 1) {
//             queryClient.prefetchQuery({
//                 queryKey: ['expenses', page - 1, sortValue],
//                 queryFn: () => fetchPaginatedExpenses(page - 1, sortValue),
//             });
//         }
//     }, [page, sortValue, paginatedData, queryClient, count]);

//     return { paginatedData, isPending, error }

// }