import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, AlertTriangle } from "lucide-react"
import { getDrivers } from "@/lib/actions"
import AddDriverDialog from "@/components/drivers/AddDriverDialog"
import { format, isBefore } from "date-fns"

export default async function DriversPage() {
    const drivers = await getDrivers();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ON_DUTY": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "OFF_DUTY": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            case "SUSPENDED": return "bg-red-500/10 text-red-500 border-red-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    const today = new Date();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search drivers..." className="pl-8 w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddDriverDialog />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Driver Performance & Safety Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>License#</TableHead>
                                <TableHead>Expiry</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drivers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                                        No drivers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                drivers.map((driver) => {
                                    const isExpired = isBefore(new Date(driver.licenseExpiry), today);
                                    return (
                                        <TableRow key={driver.id} className={isExpired ? "bg-red-500/5" : ""}>
                                            <TableCell className="font-bold flex items-center gap-2">
                                                {isExpired && <AlertTriangle className="h-4 w-4 text-red-500" />}
                                                {driver.name}
                                            </TableCell>
                                            <TableCell>{driver.licenseNumber}</TableCell>
                                            <TableCell className={isExpired ? "text-red-500 font-medium" : ""}>
                                                {format(new Date(driver.licenseExpiry), "dd/MM/yyyy")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant="outline" className={isExpired ? "bg-red-500/10 text-red-500 border-red-500/50" : getStatusColor(driver.status)}>
                                                    {isExpired ? "EXPIRED" : driver.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
