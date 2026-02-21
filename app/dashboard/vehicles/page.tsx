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

export default function VehiclesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Mock data based on screenshot
    const vehicles = [
        { id: 1, plate: "MH 00 2017", model: "Tata Ace", type: "Mini", capacity: "5 tons", odometer: "75000 km", status: "Available" },
        { id: 2, plate: "MH 01 4455", model: "Ashok Leyland", type: "Truck", capacity: "15 tons", odometer: "120000 km", status: "On Trip" },
        { id: 3, plate: "MH 02 9988", model: "Maruti Eeco", type: "Van", capacity: "1 ton", odometer: "45000 km", status: "In Shop" },
        { id: 4, plate: "MH 03 1122", model: "Tata 407", type: "Truck", capacity: "8 tons", odometer: "95000 km", status: "Out of Service" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Available": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "On Trip": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "In Shop": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            case "Out of Service": return "bg-red-500/10 text-red-500 border-red-500/50"
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" /> New Vehicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Vehicle Registration</DialogTitle>
                            <DialogDescription>
                                Add a new asset to your fleet. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="plate">License Plate</Label>
                                <Input id="plate" placeholder="MH 00 XXXX" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="model">Model</Label>
                                <Input id="model" placeholder="Tata Ace" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mini">Mini</SelectItem>
                                        <SelectItem value="truck">Truck</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                        <SelectItem value="trailer">Trailer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="capacity">Max Payload</Label>
                                    <Input id="capacity" placeholder="e.g. 5 tons" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="odometer">Initial Odometer</Label>
                                    <Input id="odometer" type="number" placeholder="0" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" onClick={() => setIsDialogOpen(false)}>Save Vehicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                            {vehicles.map((v, i) => (
                                <TableRow key={v.id}>
                                    <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                                    <TableCell className="font-bold">{v.plate}</TableCell>
                                    <TableCell>{v.model}</TableCell>
                                    <TableCell>{v.type}</TableCell>
                                    <TableCell>{v.capacity}</TableCell>
                                    <TableCell>{v.odometer}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusColor(v.status)}>
                                            {v.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground">Edit</Button>
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
