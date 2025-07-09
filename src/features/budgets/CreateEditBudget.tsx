import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EmojiPicker, EmojiPickerContent, EmojiPickerFooter, EmojiPickerSearch } from "@/components/ui/emoji-picker"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
// import { DialogTrigger } from "@radix-ui/react-dialog"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCreateBudget } from "./useCreateBudget"
import type { BudgetList } from "@/models/budgets"
import { useEditBudget } from "./useEditBudget"



const formSchema = z.object({
    id: z.number().nullable(),
    budget_name: z.string({
        required_error: "This field is required.",
    }),
    budget_icon: z.string().min(1, {
        message: "This field is required."
    }),
    amount: z.string().min(1, {
        message: "This field is required."
    }),
})

interface Props {
    row?: BudgetList,
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
}

const formInitialState = {
    id: null,
    budget_name: '', 
    budget_icon: '',
    amount: '',
}  

export const CreateEditBudget = ({row = {} as BudgetList, dialogOpen, setDialogOpen}: Props) => {

    const { id } = row;

    const isEditMode = Boolean(id);

    const [emojiOpen, setEmojiOpen] = useState(false);  

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditMode ? {...row, amount: String(row.budget_amount)} : formInitialState
    })

    const { createBudgetMutation, isCreating } = useCreateBudget();
    const { editBudgetMutation, isUpdating } = useEditBudget();

    const isWorking = isCreating || isUpdating;

    function onSubmit(data: z.infer<typeof formSchema>) {
        // createBudgetMutation
        // createBudgetMutation(data)
        const newBudget = {
            ...data,
            amount: Number(data.amount)
        }
        // console.log(newBudget)
       
        if (!isEditMode) {
             createBudgetMutation(
                newBudget,
                {
                    onSuccess: () => {
                        form.reset();
                        setDialogOpen(false);
                    }
                }
            )
        } else {
            editBudgetMutation(
               newBudget,
                {
                    onSuccess: () => {
                        form.reset({...newBudget, amount: String(newBudget.amount)});
                        setDialogOpen(false);
                    }
                }
            )
        }
    }

    const handleDialogOpenChange = (open: boolean) => {
        setDialogOpen(open);
        form.reset(
            isEditMode ? {...row, amount: String(row.budget_amount)} : formInitialState
        );
        // console.log('open')
    }

    return (
        <>  
            <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>

                    <DialogTrigger asChild>

                        {!isEditMode && (
                            <Button variant="default">
                                <i className="fi fi-rr-plus-small flex text-xl"></i> Create
                            </Button>
                        )}

                    </DialogTrigger>

                <DialogContent 
                    className="sm:max-w-[425px]"
                >
                    {/* onOpenAutoFocus={(e) => e.preventDefault()} */}
                    <DialogHeader>
                        <DialogTitle>Create Budget</DialogTitle>
                        <DialogDescription>
                    
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="budget_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Budget Name 
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder=""{...field} value={field.value ?? ''} tabIndex={-1}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="budget_icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-2 max-h-[400px] overflow-y-auto">
                                                <Input 
                                                    placeholder="" {...field} 
                                                    disabled={true}
                                                />
                                                <Popover 
                                                    onOpenChange={setEmojiOpen} 
                                                    open={emojiOpen} 
                                                    modal={true}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button 
                                                            type="button" 
                                                        >
                                                            Pick
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent 
                                                        className="w-fit p-0 z-50" 
                                                        sideOffset={8} 
                                                        align="end" 
                                                        side="bottom"
                                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                                    >
                                                        <EmojiPicker
                                                            className="h-[342px]"
                                                            onEmojiSelect={({ emoji }) => {
                                                                setEmojiOpen(false);
                                                                form.setValue('budget_icon', emoji, {shouldValidate: true})
                                                            }}
                                                        >
                                                            <EmojiPickerSearch />
                                                            <EmojiPickerContent />
                                                            <EmojiPickerFooter />
                                                        </EmojiPicker>
                                                    </PopoverContent>
                                                </Popover>
                                            </div> 
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Amount 
                                            <span className="text-[var(--color-destructive)]">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
        
                            <DialogFooter>
                                <DialogClose asChild >
                                    <Button variant="outline" >Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isWorking || !form.formState.isDirty} >
                                    { isWorking && <Loader2Icon className="animate-spin" /> }
                                    { isEditMode ? 'Apply changes' : 'Create' }
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                
                </DialogContent>
            </Dialog>
        </>
    )
    



}