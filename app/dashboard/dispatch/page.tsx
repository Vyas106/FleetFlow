import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DISPATCHED": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "COMPLETED": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "DRAFT": return "bg-gray-500/10 text-gray-500 border-gray-500/50"
            case "CANCELLED": return "bg-red-500/10 text-red-500 border-red-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    return (
        <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div className="flex flex-1 w-full items-center gap-2">
                        <div className="relative flex-1 sm:max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search trips..." className="pl-8 w-full" />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[120px] hidden sm:flex">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="dispatched">Dispatched</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Trip History / List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Trip</TableHead>
                                    <TableHead>Fleet Plate</TableHead>
                                    <TableHead>Origin</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trips.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                            No trips found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    trips.map((t: any) => (
                                        <TableRow key={t.id}>
                                            <TableCell className="font-medium text-primary font-mono">{t.id.slice(0, 8)}</TableCell>
                                            <TableCell>{t.vehicle.licensePlate}</TableCell>
                                            <TableCell>{t.origin}</TableCell>
                                            <TableCell>{t.destination}</TableCell>
                                            <TableCell className="text-right flex justify-end gap-2">
                                                {t.status === TripStatus.DISPATCHED && (
                                                    <CompleteTripDialog
                                                        tripId={t.id}
                                                        currentOdometer={t.vehicle.odometer}
                                                    />
                                                )}
                                                <Badge variant="outline" className={getStatusColor(t.status)}>
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

            <div className="xl:w-[400px]">
                <NewTripForm
                    availableVehicles={availableVehicles}
                    availableDrivers={availableDrivers}
                />
            </div>
        </div>
    )
}
