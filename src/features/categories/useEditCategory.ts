import { editCategories } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router";
import { toast } from "sonner";


export const useEditCategory = () => {
    
    const queryClient = useQueryClient();

    const [searchParams] = useSearchParams();

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const {mutate: editCategoryMutation, isPending: isUpdating} = useMutation({
        mutationFn: editCategories,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', page]
            });
            toast.success('Successfully updated.')
        },
        onError: (err) => {
            toast.error(err.message || 'An error occured while updating the data.')
        }
    })

    return { editCategoryMutation, isUpdating }

}