"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Plus, Filter, FileText } from "lucide-react"

export default function ExpensesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Mock data based on screenshot
    const expenseLogs = [
        { tripId: 321, driver: "John", distance: "1000 km", fuelExpense: "19k", miscExpense: "3k", status: "Done" },
        { tripId: 322, driver: "Alice", distance: "450 km", fuelExpense: "8k", miscExpense: "1k", status: "Done" },
        { tripId: 323, driver: "Bob", distance: "800 km", fuelExpense: "15k", miscExpense: "2k", status: "Pending" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Done": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "Pending": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Add an Expense
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Expense</DialogTitle>
                            <DialogDescription>
                                Log fuel or miscellaneous trip expenses.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="tripId">Trip ID</Label>
                                <Select>
                                    <SelectTrigger id="tripId">
                                        <SelectValue placeholder="Select completed trip" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="t321">Trip 321 - Pune</SelectItem>
                                        <SelectItem value="t322">Trip 322 - Delhi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="driver">Driver</Label>
                                <Input id="driver" placeholder="e.g. John" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="fuelCost">Fuel Cost (₹)</Label>
                                <Input id="fuelCost" type="number" placeholder="0" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="miscExpense">Misc Expense (₹)</Label>
                                <Input id="miscExpense" type="number" placeholder="0" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={() => setIsDialogOpen(false)}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                                <TableHead className="w-[80px]">Trip ID</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Distance</TableHead>
                                <TableHead>Fuel Expense</TableHead>
                                <TableHead>Misc. Expen</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {expenseLogs.map((log) => (
                                <TableRow key={log.tripId}>
                                    <TableCell className="font-medium text-primary">{log.tripId}</TableCell>
                                    <TableCell className="font-bold">{log.driver}</TableCell>
                                    <TableCell>{log.distance}</TableCell>
                                    <TableCell>{log.fuelExpense}</TableCell>
                                    <TableCell>{log.miscExpense}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className={getStatusColor(log.status)}>
                                            {log.status}
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
