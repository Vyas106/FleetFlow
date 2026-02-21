import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
                <header className="flex h-12 items-center gap-2 border-b bg-background px-4">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/20">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
