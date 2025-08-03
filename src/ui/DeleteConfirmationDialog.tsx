

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onDelete,
  isDeleting
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This data will be permanently deleted from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="outline"
            className={`
              !bg-[var(--color-destructive)]/10  
              text-[var(--color-destructive)] 
              !border-[var(--color-destructive)]/10
              hover:!bg-[var(--color-destructive)]/60
              hover:!text-white
            `}
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2Icon className="animate-spin mr-2" />}
            {isDeleting ? "Deleting" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
