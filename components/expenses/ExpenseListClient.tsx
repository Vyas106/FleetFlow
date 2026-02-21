"use client";

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ReceiptText, AlertCircle, FileText } from "lucide-react"
import AddExpenseDialog from "@/components/expenses/AddExpenseDialog"
import { format } from "date-fns"

interface ExpenseListClientProps {
    expenseLogs: any[];
    vehicles: any[];
    drivers: any[];
    trips: any[];
}

export default function ExpenseListClient({ expenseLogs, vehicles, drivers, trips }: ExpenseListClientProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredExpenses = useMemo(() => {
        return expenseLogs.filter((log: any) => {
            const matchesSearch = searchQuery === "" ||
                (log.tripId && log.tripId.toLowerCase().includes(searchQuery.toLowerCase())) ||
                log.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesSearch
        })
    }, [expenseLogs, searchQuery])

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search expenses..."
                            className="pl-9 w-full bg-background border-border/50 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <AddExpenseDialog vehicles={vehicles} drivers={drivers} trips={trips} />
            </div>

            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex-1 flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <ReceiptText className="h-5 w-5 text-primary" />
                                Expense & Fuel Logging
                            </CardTitle>
                            <CardDescription className="mt-1">Track comprehensive operational costs across fleets and logistical dispatches.</CardDescription>
                        </div>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="w-[120px] pl-6 font-semibold uppercase text-xs tracking-wider">Mission ID</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Operator</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Asset Plate</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Fuel Expense</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Misc. Expense</TableHead>
                                <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Date Filed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredExpenses.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <AlertCircle className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>{searchQuery ? "No expense logs match your search." : "No operational expense logs found on record."}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredExpenses.map((log: any) => (
                                    <TableRow key={log.id} className="hover:bg-primary/5 transition-colors group border-b-border/40">
                                        <TableCell className="pl-6 py-4">
                                            <span className="font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                                                {log.tripId ? log.tripId.slice(0, 8) : "N/A"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-bold tracking-wider group-hover:text-primary transition-colors">{log.driver.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.vehicle.licensePlate}</TableCell>
                                        <TableCell className="text-muted-foreground font-medium text-blue-500/80">₹{log.fuelCost.toLocaleString()}</TableCell>
                                        <TableCell className="text-muted-foreground font-medium text-amber-500/80">₹{log.miscExpense.toLocaleString()}</TableCell>
                                        <TableCell className="text-right pr-6 text-muted-foreground">
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
