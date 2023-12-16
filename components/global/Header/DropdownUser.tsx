import {
    LogOut,
    Settings,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { signOut } from "next-auth/react"
import { sessionProps } from "@/types"

export function DropdownUser({ karyawanId, role, fullname, image }: sessionProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2">
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={image ? `${image}` : "/images/user-profile-default.png"} alt="User" />
                        <AvatarFallback>
                            <Skeleton className="w-10 h-10 rounded-full" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-xs md:text-sm flex-col hidden md:flex">
                        <span className="text-sm">{karyawanId}</span>
                        <span className="text-xs text-muted-foreground">{role}</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col md:hidden">
                    <span className="text-sm">{karyawanId}</span>
                    <span className="text-xs text-muted-foreground">{role}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Pengaturan Akun</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    signOut({
                        redirect: true,
                    })
                    window.location.href = "/"
                }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
