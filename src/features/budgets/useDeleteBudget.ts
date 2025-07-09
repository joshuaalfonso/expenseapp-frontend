import type { ErrorResponse } from "@/models/error";
import { deleteBudget } from "@/services/apiBudgets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";



export const useDeleteBudget = () => {

    const queryCliet = useQueryClient();

    const {mutate: deleteBudgetMutation, isPending: isDeleting} = useMutation({
        mutationFn: deleteBudget,
        onSuccess: () => {
            queryCliet.invalidateQueries({
                queryKey: ['budgets']
            });
            toast.info('Successfully deleted!');
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log(err)
            toast.error(err.response?.data.message || 'An error occured while deleting the data')
        }
    });

    return { deleteBudgetMutation, isDeleting }

}
