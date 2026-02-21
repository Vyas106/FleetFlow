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
    { title: "Dashboard", icon: Home, url: "/dashboard" },
    { title: "Vehicle Registry", icon: Truck, url: "/dashboard/vehicles" },
    { title: "Trip Dispatcher", icon: Activity, url: "/dashboard/dispatch" },
    { title: "Maintenance", icon: Wrench, url: "/dashboard/maintenance" },
    { title: "Trip & Expense", icon: FileText, url: "/dashboard/expenses" },
    { title: "Performance", icon: Users, url: "/dashboard/drivers" },
    { title: "Analytics", icon: Car, url: "/dashboard/analytics" },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
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
