import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Activity, Car, FileText, Home, Truck, Users, Wrench } from "lucide-react"
import Link from "next/link"

const navItems = [
    { title: "Dashboard", icon: Home, url: "/dashboard", roles: ["MANAGER", "DISPATCHER", "SAFETY_OFFICER", "FINANCIAL_ANALYST"] },
    { title: "Vehicle Registry", icon: Truck, url: "/dashboard/vehicles", roles: ["MANAGER", "DISPATCHER", "SAFETY_OFFICER"] },
    { title: "Trip Dispatcher", icon: Activity, url: "/dashboard/dispatch", roles: ["MANAGER", "DISPATCHER"] },
    { title: "Maintenance", icon: Wrench, url: "/dashboard/maintenance", roles: ["MANAGER", "SAFETY_OFFICER"] },
    { title: "Trip & Expense", icon: FileText, url: "/dashboard/expenses", roles: ["MANAGER", "FINANCIAL_ANALYST", "DISPATCHER"] },
    { title: "Performance", icon: Users, url: "/dashboard/drivers", roles: ["MANAGER", "SAFETY_OFFICER", "DISPATCHER"] },
    { title: "Analytics", icon: Car, url: "/dashboard/analytics", roles: ["MANAGER", "FINANCIAL_ANALYST"] },
]

export function AppSidebar({ userRole }: { userRole?: string }) {
    const filteredItems = navItems.filter(item =>
        !userRole || (item.roles as string[]).includes(userRole)
    );

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
