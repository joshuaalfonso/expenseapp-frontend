import { ModeToggle } from "@/components/mode-toggle"
import { ToogleSidebar } from "./ToggleSidebar"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogout } from "@/features/auth/useLogout"
import { useAuthContext } from "@/features/auth/useAuthContext"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


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
                    <img src="low-price.png" alt="Logo" width={35}/>
                    <p className='flex items-center font-semibold xl:text-xl'>Expense <span>Tracker</span></p>
                </div>
                <div className="flex gap-2 items-center">

                    <ModeToggle />

                    {/* <Button 
                        variant="ghost"
                        onClick={handleLogout}
                        className="size-9"
                    >
                        <LogOut />
                    </Button> */}

                    <div>
                        {user && (
                            <>

                                {/* <Popover>
                                    <PopoverTrigger asChild className="cursor-pointer hover:ring-1 ring-[var(--color-primary)]">
                                        <Avatar>
                                            <AvatarImage src={user.user.picture}  />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-50" align="end">
                                        <div className="grid gap-4">
                                            <div className="space-y-1">
                                                <h4 className="leading-none font-medium">{user.user.name}</h4>
                                                <p className="max-w-40 text-muted-foreground text-xs overflow-hidden text-ellipsis">
                                                    {user.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />

                                         <DropdownMenuItem className="cursor-pointer" onSelect={(e) => {
                                                e.preventDefault();
                                                // setMenuOpen(false);
                                                // setDialogOpen(true);
                                            }} >
                                                <i className="fi fi-rr-pencil flex"></i>
                                                Edit
                                            </DropdownMenuItem>
                                    </PopoverContent>
                                </Popover> */}
                                <DropdownMenu>

                                        
                          
                                    <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
             
                                        <Avatar className="cursor-pointer hover:ring-1 ring-[var(--color-primary)]">
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

