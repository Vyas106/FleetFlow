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
import { Search, Plus, Filter, AlertTriangle } from "lucide-react"

export default function DriversPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Mock data based on screenshot
    const drivers = [
        { id: 1, name: "John", license: "23223", expiry: "22/36", completionRate: "92%", safetyScore: "89%", complaints: 4, status: "Active" },
        { id: 2, name: "Alice", license: "99822", expiry: "01/25", completionRate: "98%", safetyScore: "95%", complaints: 0, status: "Expired" },
        { id: 3, name: "Bob", license: "11234", expiry: "12/28", completionRate: "85%", safetyScore: "72%", complaints: 12, status: "Suspended" },
        { id: 4, name: "Charlie", license: "88765", expiry: "05/30", completionRate: "95%", safetyScore: "91%", complaints: 1, status: "Active" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "Expired": return "bg-red-500/10 text-red-500 border-red-500/50"
            case "Suspended": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Add Driver
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add / Edit Driver</DialogTitle>
                            <DialogDescription>
                                Manage driver profiles, licenses, and duty status.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="e.g. John Doe" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="license">License Number</Label>
                                <Input id="license" placeholder="e.g. 23223" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="expiry">License Expiry Date</Label>
                                <Input id="expiry" type="date" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save Driver</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                                <TableHead>Completion Rate</TableHead>
                                <TableHead>Safety Score</TableHead>
                                <TableHead>Complaints</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drivers.map((driver) => (
                                <TableRow key={driver.id} className={driver.status === "Expired" ? "bg-red-500/5" : ""}>
                                    <TableCell className="font-bold flex items-center gap-2">
                                        {driver.status === "Expired" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                                        {driver.name}
                                    </TableCell>
                                    <TableCell>{driver.license}</TableCell>
                                    <TableCell className={driver.status === "Expired" ? "text-red-500 font-medium" : ""}>
                                        {driver.expiry}
                                    </TableCell>
                                    <TableCell>{driver.completionRate}</TableCell>
                                    <TableCell>{driver.safetyScore}</TableCell>
                                    <TableCell>{driver.complaints}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant="outline" className={getStatusColor(driver.status)}>
                                            {driver.status}
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
