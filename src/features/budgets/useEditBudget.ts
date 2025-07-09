import { editBudget } from "@/services/apiBudgets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useEditBudget = () => {

    const queryClient = useQueryClient();

    const {mutate: editBudgetMutation, isPending: isUpdating} = useMutation({
        mutationFn: editBudget,
        onSuccess: () => {
            toast.success('Successfully updated!');
            queryClient.invalidateQueries({
                queryKey: ['budgets']
            })
        },
        onError: (err) => {
            toast.error(err.message || 'Un unknown error occured')
        }
    })

    return { editBudgetMutation, isUpdating}


}