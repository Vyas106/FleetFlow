import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, FileText } from "lucide-react"
import { getExpenseLogs, getVehicles, getDrivers, getTrips } from "@/lib/actions"
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog"
import { format } from "date-fns"

export default async function ExpensesPage() {
    const [expenseLogs, vehicles, drivers, trips] = await Promise.all([
        getExpenseLogs(),
        getVehicles(),
        getDrivers(),
        getTrips(),
    ]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search expenses..." className="pl-8 w-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px] hidden sm:flex">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="done">Done</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddExpenseDialog vehicles={vehicles} drivers={drivers} trips={trips} />
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Expense & Fuel Logging</CardTitle>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Trip ID</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Fuel Cost</TableHead>
                                <TableHead>Misc. Expense</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenseLogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                        No expense logs found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                expenseLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium text-primary font-mono">
                                            {log.tripId ? log.tripId.slice(0, 8) : "N/A"}
                                        </TableCell>
                                        <TableCell className="font-bold">{log.driver.name}</TableCell>
                                        <TableCell>{log.vehicle.licensePlate}</TableCell>
                                        <TableCell>₹{log.fuelCost.toLocaleString()}</TableCell>
                                        <TableCell>₹{log.miscExpense.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            {format(new Date(log.date), "dd/MM/yyyy")}
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
