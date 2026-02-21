import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, Filter, Truck, AlertTriangle, PackageSearch, ActivitySquare, Plus, Car } from "lucide-react"
import { getDashboardStats } from "@/lib/actions"

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            {/* Top Navigation / Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-1 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm p-4">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Type command or search..." className="pl-9 w-full bg-background border-border/50 rounded-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex rounded-full bg-background border-border/50">
                            <SelectValue placeholder="Filter By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Vehicle Type</SelectItem>
                            <SelectItem value="region">Region</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full border-border/50 bg-background hover:bg-muted/50">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button asChild className="w-full sm:w-auto rounded-full font-medium h-9 shadow-md shadow-primary/20">
                        <Link href="/dashboard/dispatch">
                            <ActivitySquare className="h-4 w-4 mr-2" /> Dispatch Trip
                        </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full sm:w-auto rounded-full h-9 font-medium border border-border/50">
                        <Link href="/dashboard/vehicles">
                            <Plus className="h-4 w-4 mr-2" /> Add Vehicle
                        </Link>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card hover:border-primary/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Active Fleet</CardTitle>
                        <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                            <Truck className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black tracking-tighter text-foreground">{stats.activeFleet}</div>
                        <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
                    </CardContent>
                </Card>
                <Card className="glass-card hover:border-amber-500/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Maintenance Alert</CardTitle>
                        <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black tracking-tighter text-amber-500">{stats.maintenanceAlerts}</div>
                        <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                    </CardContent>
                </Card>
                <Card className="glass-card hover:border-primary/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Pending Cargo</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <PackageSearch className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black tracking-tighter text-foreground">{stats.pendingCargo}</div>
                        <p className="text-xs text-muted-foreground mt-1">Load units await dispatch</p>
                    </CardContent>
                </Card>
                <Card className="glass-card hover:border-blue-500/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Network Utilization</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <ActivitySquare className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-1">
                            <div className="text-4xl font-black tracking-tighter text-blue-500">{stats.utilizationRate}</div>
                            <span className="text-lg font-bold text-blue-500/70">%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Optimal running capacity</p>
                    </CardContent>
                </Card>
            </div>

            {/* Active Trips Table */}
            <Card className="glass-card overflow-hidden border-border/40 shadow-sm">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        Live Dispatch Operations
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="w-[120px] pl-6 font-semibold uppercase text-xs tracking-wider">Mission ID</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Assigned Asset</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Operator</TableHead>
                                <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.activeTrips.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={4} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <Car className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>No active missions at this time.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                stats.activeTrips.map((trip: any) => (
                                    <TableRow key={trip.id} className="hover:bg-primary/5 transition-colors group cursor-pointer border-b-border/40">
                                        <TableCell className="pl-6 py-4">
                                            <div className="font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                                                {trip.id.slice(0, 8)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                                    <Truck className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                {trip.vehicle.licensePlate}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground group-hover:text-foreground transition-colors">
                                            {trip.driver.name}
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Badge variant="outline" className="text-blue-500 border-blue-500/30 bg-blue-500/10 uppercase tracking-widest text-[10px] font-bold px-3 py-1">
                                                {trip.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

