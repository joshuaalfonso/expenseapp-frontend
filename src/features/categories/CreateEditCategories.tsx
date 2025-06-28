import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import type { CategoriesList } from "@/models/categories"
import { useEditCategory } from "./useEditCategory"
import { useCreateCategory } from "./useCreateCategory"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AdminOnly } from "../auth/AdminOnly"


const formSchema = z.object({
    id: z.number().nullable(),
    category_name: z.string().min(1, {
        message: "This field is required."
    }),
    category_icon: z.string().min(1, {
        message: "This field is required."
    }),
    is_default: z.number().optional(),
    date_created: z.string().nullable()
})

interface createEditProps {
    row?: CategoriesList,
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
}

export const CreateEditCategories = ({row = {} as CategoriesList,dialogOpen, setDialogOpen }: createEditProps) => {

    const { id: categoryId } = row;

    const isEditMode = Boolean(categoryId);

    const [emojiOpen, setEmojiOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditMode ? {...row} : {
            id: null,
            category_name: "",
            category_icon: "",
            is_default: 0,
            date_created: null,
        }   
    })


    const { createCategoryMutation, isCreating } = useCreateCategory();

    const { editCategoryMutation, isUpdating } = useEditCategory();

    const isWorking = isCreating || isUpdating;

    function onSubmit(values: z.infer<typeof formSchema>) {

        const is_default = values.is_default ? 1 : 0;
        
        const data = {...values, is_default}

        if (isEditMode) {
            editCategoryMutation(
                data,
                {
                    onSuccess: () => {
                        form.reset({...values});
                        setDialogOpen(false);
                    }
                }
            )
        } 
        
        else {
            createCategoryMutation(
                data,
                {
                    onSuccess: () => {
                        form.reset();
                        setDialogOpen(false);
                    }
                }
            )
        } 

    }

    const handleDialogOpenChange = (open: boolean) => {
        setDialogOpen(open);
        form.reset(isEditMode ? { ...row } : {
            id: null,
            category_name: "",
            category_icon: "",
            date_created: null,
        });
    }


    return (
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <form>
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
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                    
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="category_icon"
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
                                                            form.setValue('category_icon', emoji, {shouldValidate: true})
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
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} autoComplete="off" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <AdminOnly>
                                <FormField 
                                    control={form.control}
                                    name="is_default"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Default</FormLabel>
                                            <div className="flex items-center gap-3">
                                                <Checkbox 
                                                    id="isDefault" 
                                                    {...field} 
                                                    checked={field.value === 1}
                                                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}/>
                                                <Label htmlFor="isDefault"> Category for all users </Label>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </AdminOnly>
        
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isWorking || !form.formState.isDirty}>
                                    {isWorking && <Loader2Icon className="animate-spin" />}
                                    {isEditMode ? 'Apply changes' : 'Create'}
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                
                </DialogContent>
            </form>
        </Dialog>
    )
}



