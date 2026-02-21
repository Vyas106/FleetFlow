import Link from "next/link";
import { Truck, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopbarProps {
    user?: {
        name: string;
        email: string;
        role: string;
    } | null;
}

export function Topbar({ user }: TopbarProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold">
                    <Truck className="h-6 w-6 text-primary" />
                    <span className="hidden sm:inline-block">FleetFlow</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {user.name?.charAt(0) || user.email?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-muted-foreground cursor-default">
                                        Role: {user.role}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <form action={logoutAction}>
                                        <DropdownMenuItem asChild>
                                            <button className="w-full flex items-center cursor-pointer">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
