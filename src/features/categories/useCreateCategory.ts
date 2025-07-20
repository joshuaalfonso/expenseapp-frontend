import { createCategories } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router";
import { toast } from "sonner";


export const useCreateCategory = () => {
    
    const queryClient = useQueryClient();

    const [searchParams] = useSearchParams();

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
    
    const {mutate: createCategoryMutation, isPending: isCreating} = useMutation({
        mutationFn: createCategories,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', page]
            });
            toast.success('Successfully created!');
        } ,
        onError: (error) => {
            console.error('error : ' + error);
            toast.error(error.message || 'An error occurred while creating data.')
        }
    })

    return { createCategoryMutation, isCreating }

}