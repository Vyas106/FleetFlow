import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { getServiceLogs, getVehicles } from "@/lib/actions"
import AddServiceLogDialog from "@/components/maintenance/AddServiceLogDialog"
import { format } from "date-fns"

export default async function MaintenancePage() {
    const [serviceLogs, vehicles] = await Promise.all([
        getServiceLogs(),
        getVehicles(),
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "RESOLVED": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "IN_PROGRESS": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "NEW": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Search</span>
                        <Input type="search" placeholder="Search logs..." className="pl-8 w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddServiceLogDialog vehicles={vehicles} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Maintenance & Service Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Log ID</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Issue/Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceLogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                        No service logs found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                serviceLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium text-primary font-mono">{log.id.slice(0, 8)}</TableCell>
                                        <TableCell className="font-bold">{log.vehicle.licensePlate}</TableCell>
                                        <TableCell>{log.issue}</TableCell>
                                        <TableCell>{format(new Date(log.date), "dd/MM/yyyy")}</TableCell>
                                        <TableCell>₹{log.cost.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className={getStatusColor(log.status)}>
                                                {log.status}
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
