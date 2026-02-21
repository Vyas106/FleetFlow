"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    LayoutDashboard,
    Truck,
    Zap,
    Wrench,
    ReceiptText,
    Users,
    BarChart3,
    Settings,
    HelpCircle
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard", roles: ["MANAGER", "DISPATCHER", "SAFETY_OFFICER", "FINANCIAL_ANALYST"] },
    { title: "Registry", icon: Truck, url: "/dashboard/vehicles", roles: ["MANAGER", "DISPATCHER", "SAFETY_OFFICER"] },
    { title: "Dispatch", icon: Zap, url: "/dashboard/dispatch", roles: ["MANAGER", "DISPATCHER"] },
    { title: "Maintenance", icon: Wrench, url: "/dashboard/maintenance", roles: ["MANAGER", "SAFETY_OFFICER"] },
    { title: "Expenses", icon: ReceiptText, url: "/dashboard/expenses", roles: ["MANAGER", "FINANCIAL_ANALYST", "DISPATCHER"] },
    { title: "Leadership", icon: Users, url: "/dashboard/drivers", roles: ["MANAGER", "SAFETY_OFFICER", "DISPATCHER"] },
    { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics", roles: ["MANAGER", "FINANCIAL_ANALYST"] },
]

export function AppSidebar({ userRole }: { userRole?: string }) {
    const pathname = usePathname();
    const filteredItems = navItems.filter(item =>
        !userRole || (item.roles as string[]).includes(userRole)
    );

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-white/5">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                        <Truck className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg tracking-tight group-data-[collapsible=icon]:hidden">
                        Fleet<span className="text-primary">Flow</span>
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-3 pt-6">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
                        Management
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {filteredItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="h-11 px-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className={`h-5 w-5 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
                        Support
                    </SidebarGroupLabel>
                    <SidebarMenu className="gap-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="h-11 px-3 rounded-lg hover:bg-accent/50 transition-all">
                                <Link href="#">
                                    <Settings className="h-5 w-5 text-muted-foreground" />
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="h-11 px-3 rounded-lg hover:bg-accent/50 transition-all">
                                <Link href="#">
                                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                                    <span>Help Center</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-white/5">
                <div className="bg-primary/5 rounded-xl p-3 flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Fleet Status</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-medium">System Online</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

