import { createExpense } from "@/services/apiExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";


interface ErrorResponse {
  error: string;
}


export const useCreateBudgetExpense = () => {

    const queryClient = useQueryClient();
    
    const { mutate: createBudgetExpenseMutattion, isPending: isCreating } = useMutation({
        mutationFn: createExpense,
        onSuccess: () => {
            toast.success('Successfully created!');
            queryClient.invalidateQueries({
                queryKey: ['budgets_details']
            })
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log(err)
            toast.error(err.response?.data?.error  || 'An error occured while creaint expense.')
        }
    });


    return { createBudgetExpenseMutattion, isCreating }

}