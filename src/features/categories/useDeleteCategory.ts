
import type { ErrorResponse } from "@/models/error";
import { deleteCategory } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios";
import { useSearchParams } from "react-router";
import { toast } from "sonner";


export const useDeleteCategory = () => {

    const queryCliet = useQueryClient();

    const [searchParams] = useSearchParams();

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const {mutate: deleteCategoryMutation, isPending: isDeleting} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryCliet.invalidateQueries({
                queryKey: ['categories', page]
            });
            toast.info('Successfully deleted!');
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log(err)
            toast.error(err.response?.data.message || 'An error occured while deleting the data')
        }
    });

    return { deleteCategoryMutation, isDeleting }

}
