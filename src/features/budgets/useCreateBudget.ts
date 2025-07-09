import { createBudget } from "@/services/apiBudgets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateBudget = () => {

    const queryClient = useQueryClient();

    const {mutate: createBudgetMutation, isPending: isCreating} = useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            toast.success('Successfully created!');
            queryClient.invalidateQueries({
                queryKey: ['budgets']
            })
        },
        onError: (err) => {
            toast.error(err.message || 'Un unknown error occured')
        }
    })

    return { createBudgetMutation, isCreating}


}