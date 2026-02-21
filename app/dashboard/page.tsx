import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, Filter, Plus } from "lucide-react"

export default function DashboardPage() {
    // Mock data for the dashboard based on the screenshot
    const kpis = {
        activeFleet: 220,
        maintenanceAlerts: 180,
        pendingCargo: 20,
        utilizationRate: 85,
    }

    const activeTrips = [
        { id: 1, vehicle: "MH 00 2017", driver: "John Doe", status: "On Trip" },
        { id: 2, vehicle: "MH 01 4455", driver: "Alice Smith", status: "On Trip" },
        { id: 3, vehicle: "MH 02 9988", driver: "Bob Ross", status: "On Trip" },
    ]

    return (
        <div className="flex flex-col gap-6">
            {/* Top Navigation / Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search here..." className="pl-8 w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex">
                            <SelectValue placeholder="Group by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="region">Region</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/dashboard/dispatch">New Trip</Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full sm:w-auto">
                        <Link href="/dashboard/vehicles">New Vehicle</Link>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Fleet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-500">{kpis.activeFleet}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Maintenance Alert</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-500">{kpis.maintenanceAlerts}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Cargo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{kpis.pendingCargo}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Utilization Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-500">{kpis.utilizationRate}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Trips Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Fleet / Ongoing Trips</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Trip ID</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeTrips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium text-primary">{trip.id}</TableCell>
                                    <TableCell>{trip.vehicle}</TableCell>
                                    <TableCell>{trip.driver}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className="text-blue-500 border-blue-500/50 bg-blue-500/10">
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
