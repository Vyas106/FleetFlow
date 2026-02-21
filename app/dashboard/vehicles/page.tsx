import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { getVehicles } from "@/lib/actions"
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog"

export default async function VehiclesPage() {
    const vehicles = await getVehicles();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "AVAILABLE": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "ON_TRIP": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "IN_SHOP": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            case "OUT_OF_SERVICE": return "bg-red-500/10 text-red-500 border-red-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search vehicles..." className="pl-8 w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="on-trip">On Trip</SelectItem>
                            <SelectItem value="in-shop">In Shop</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddVehicleDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vehicle Registry</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">No</TableHead>
                                <TableHead>Plate</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Odometer</TableHead>
                                <TableHead className="w-[120px]">Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                                        No vehicles found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                vehicles.map((v: any, i: number) => (
                                    <TableRow key={v.id}>
                                        <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                                        <TableCell className="font-bold">{v.licensePlate}</TableCell>
                                        <TableCell>{v.model}</TableCell>
                                        <TableCell>{v.type}</TableCell>
                                        <TableCell>{v.maxLoadCapacity} kg</TableCell>
                                        <TableCell>{v.odometer} km</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={getStatusColor(v.status)}>
                                                {v.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="text-muted-foreground">Edit</Button>
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
