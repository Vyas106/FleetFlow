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
import { Search, Plus, Filter } from "lucide-react"

export default function MaintenancePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Mock data based on screenshot
    const serviceLogs = [
        { id: 321, vehicle: "TATA", issue: "Engine Issue", date: "20/02", cost: "10k", status: "New" },
        { id: 322, vehicle: "Ashok Leyland", issue: "Oil Change", date: "18/02", cost: "2k", status: "Resolved" },
        { id: 323, vehicle: "Maruti Eeco", issue: "Tire Replacement", date: "15/02", cost: "5k", status: "In Progress" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Resolved": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "In Progress": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "New": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    const handleCreateService = () => {
        // In actual implementation, this would trigger the auto-hide rule
        // turning the vehicle status to "In Shop"
        setIsDialogOpen(false)
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> Create New Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Service Log</DialogTitle>
                            <DialogDescription>
                                Logging a repair automatically switches the vehicle status to "In Shop", preventing dispatching.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="vehicle">Vehicle Name/ID</Label>
                                <Select>
                                    <SelectTrigger id="vehicle">
                                        <SelectValue placeholder="Select vehicle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="v1">TATA - MH 00 2017</SelectItem>
                                        <SelectItem value="v2">Maruti Eeco - MH 02 9988</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="issue">Issue/Service Needed</Label>
                                <Input id="issue" placeholder="e.g. Engine noise" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="date">Date Brought In</Label>
                                <Input id="date" type="date" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={handleCreateService}>Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Maintenance & Service Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Log ID</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Issue/Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium text-primary">{log.id}</TableCell>
                                    <TableCell className="font-bold">{log.vehicle}</TableCell>
                                    <TableCell>{log.issue}</TableCell>
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell>{log.cost}</TableCell>
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
