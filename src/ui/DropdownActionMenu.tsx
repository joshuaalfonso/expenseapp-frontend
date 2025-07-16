// DropdownActionMenu.tsx
import { type ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';

interface DropdownActionMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export default function DropdownActionMenu({
  open,
  onOpenChange,
  children,
}: DropdownActionMenuProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
         <DropdownMenuLabel className='opacity-60'>
            Actions
        </DropdownMenuLabel>
        <DropdownMenuGroup>
            {children}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
