import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Compass, AlertCircle } from "lucide-react"
import { getTrips, getVehicles, getDrivers } from "@/lib/actions"
import NewTripForm from "@/components/dispatch/NewTripForm"
import CompleteTripDialog from "@/components/dispatch/CompleteTripDialog"
import { VehicleStatus, DriverStatus, TripStatus } from "@/lib/generated/client"

export default async function DispatchPage() {
    const [trips, allVehicles, allDrivers] = await Promise.all([
        getTrips(),
        getVehicles(),
        getDrivers(),
    ]);

    const availableVehicles = allVehicles.filter((v: any) => v.status === VehicleStatus.AVAILABLE);
    const availableDrivers = allDrivers.filter((d: any) => d.status === DriverStatus.ON_DUTY);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "DISPATCHED": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "COMPLETED": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "DRAFT": return "bg-zinc-500/10 text-zinc-500 border-zinc-500/50"
            case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive/50"
            default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/50"
        }
    }

    return (
        <div className="flex flex-col xl:flex-row gap-8 animate-slow-fade">
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                    <div className="flex flex-1 w-full items-center gap-2">
                        <div className="relative flex-1 sm:max-w-xs">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search mission IDs..." className="pl-9 w-full bg-background border-border/50 rounded-full" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[140px] hidden sm:flex rounded-full bg-background border-border/50">
                                <SelectValue placeholder="Mission Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft phase</SelectItem>
                                <SelectItem value="dispatched">Active Dispatch</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon" className="shrink-0 rounded-full border-border/50 bg-background hover:bg-muted/50">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Compass className="h-5 w-5 text-primary" />
                            Mission Tracking Terminal
                        </CardTitle>
                        <CardDescription>Live overview of all dispatched and historical load movements.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b-border/40">
                                    <TableHead className="w-[100px] pl-6 font-semibold uppercase text-xs tracking-wider">Mission</TableHead>
                                    <TableHead className="font-semibold uppercase text-xs tracking-wider">Asset</TableHead>
                                    <TableHead className="font-semibold uppercase text-xs tracking-wider">Origin</TableHead>
                                    <TableHead className="font-semibold uppercase text-xs tracking-wider">Destination</TableHead>
                                    <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trips.length === 0 ? (
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell colSpan={5} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                                <div className="p-4 bg-muted/30 rounded-full">
                                                    <AlertCircle className="h-8 w-8 opacity-40" />
                                                </div>
                                                <p>No dispatch missions found on record.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    trips.map((t: any) => (
                                        <TableRow key={t.id} className="hover:bg-primary/5 transition-colors group border-b-border/40">
                                            <TableCell className="pl-6 py-4">
                                                <div className="font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                                                    {t.id.slice(0, 8)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{t.vehicle.licensePlate}</TableCell>
                                            <TableCell className="text-muted-foreground">{t.origin}</TableCell>
                                            <TableCell className="font-medium">{t.destination}</TableCell>
                                            <TableCell className="text-right pr-6 flex items-center justify-end gap-3 h-[68px]">
                                                {t.status === TripStatus.DISPATCHED && (
                                                    <CompleteTripDialog
                                                        tripId={t.id}
                                                        currentOdometer={t.vehicle.odometer}
                                                    />
                                                )}
                                                <Badge variant="outline" className={`${getStatusVariant(t.status)} uppercase tracking-widest text-[10px] font-bold px-3 py-1`}>
                                                    {t.status}
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

            <div className="xl:w-[450px]">
                <NewTripForm
                    availableVehicles={availableVehicles}
                    availableDrivers={availableDrivers}
                />
            </div>
        </div>
    )
}
