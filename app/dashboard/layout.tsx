import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
    Bell,
    Search,
    ChevronRight,
    LogOut,
    User,
    Settings
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { logoutAction, getNotifications } from "@/lib/actions"
import NotificationPopover from "@/components/dashboard/NotificationPopover"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const notifications = await getNotifications(session.id);

    return (
        <SidebarProvider>
            <AppSidebar userRole={session.role} />
            <div className="flex-1 flex flex-col w-full h-full overflow-hidden bg-background">
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 bg-background/50 backdrop-blur-xl px-6 sticky top-0 z-10 transition-all">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="-ml-2 hover:bg-primary/10 hover:text-primary transition-colors" />
                        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                            <span>FleetFlow</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="font-medium text-foreground">Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:flex items-center">
                            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="w-[200px] lg:w-[300px] pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-full h-9"
                            />
                        </div>

                        <NotificationPopover initialNotifications={notifications} />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50 hover:border-primary/50 transition-colors">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                            {session.name?.charAt(0) || session.email?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal p-3">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{session.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{session.email}</p>
                                        <div className="mt-2 inline-flex items-center rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase w-fit">
                                            {session.role}
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="py-2.5 cursor-pointer">
                                    <Link href="/dashboard/profile" className="flex items-center w-full">
                                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="py-2.5 cursor-pointer">
                                    <Link href="/dashboard/settings" className="flex items-center w-full">
                                        <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <form action={logoutAction}>
                                    <DropdownMenuItem asChild className="py-2.5 cursor-pointer focus:bg-destructive/10 focus:text-destructive text-destructive">
                                        <button type="submit" className="w-full flex items-center">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </button>
                                    </DropdownMenuItem>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-8 bg-muted/10 relative">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
