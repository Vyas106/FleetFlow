import { getDashboardStats } from "@/lib/actions"
import DashboardClient from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return <DashboardClient stats={stats} />
}
