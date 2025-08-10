import { ModeToggle } from "@/ui/ModeToggle"
import { ToogleSidebar } from "../ui/ToggleSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogout } from "@/features/auth/useLogout"
import { useAuthContext } from "@/features/auth/useAuthContext"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export const Header = () => {

    const { logout } = useLogout();

    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    const url = user.user?.picture;
    const image = new Image();
    image.src = url;

    const corsImageModified = new Image();
    corsImageModified.crossOrigin = "Anonymous";
    corsImageModified.src = url + "?not-from-cache-please";

    return (
        <header className='z-10 px-6 fixed w-full left-0 top-0 border-b border-[var(--color-border)] backdrop-blur-sm'>
            <nav className='flex items-center justify-between h-[50px] max-w-7xl mx-auto '>
                <ToogleSidebar />
                <div className='flex gap-2'>
                    <img src="low-price.png" alt="Logo" className="w-[30px] xl:w-[35px]"/>
                    <span className='flex items-center font-semibold text-sm xl:text-base'>Expense <span>Tracker</span></span>
                </div>
                <div className="flex gap-2 items-center">

                    <ModeToggle />
 
                    <div>
                        {user && (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
             
                                        <Avatar className="cursor-pointer hover:scale-110 duration-200 ease-out">
                                            <AvatarImage src={user.user.picture}  />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar> 
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-50" align="end">
                                        <DropdownMenuLabel>{user.user.name}</DropdownMenuLabel>
                                        <div className="px-2 pb-1.5 w-45 text-xs text-muted-foreground overflow-hidden text-ellipsis">{user.user.email}</div>
                                        <Separator className="my-2"/>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="cursor-pointer text-destructive hover:!text-destructive hover:!bg-destructive/10" onSelect={(e) => {
                                                e.preventDefault();
                                                handleLogout();
                                            }} >
                                                <i className="fi fi-rr-exit flex"></i>
                                                Log Out
                                            </DropdownMenuItem>
                                            
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>                       
                                </DropdownMenu>
                            </>      
                        )}
                    </div>             
                </div>
            </nav>
        </header>
    )
}

