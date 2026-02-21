"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export default function DispatchPage() {
    const [cargoWeight, setCargoWeight] = useState("")

    // Mock data
    const trips = [
        { id: 1, type: "Trailer Truck", origin: "Mumbai", destination: "Pune", status: "On way" },
        { id: 2, type: "Mini Van", origin: "Delhi", destination: "Jaipur", status: "Completed" },
        { id: 3, type: "Truck", origin: "Bangalore", destination: "Chennai", status: "Draft" },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "On way": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "Completed": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "Draft": return "bg-gray-500/10 text-gray-500 border-gray-500/50"
            default: return "bg-gray-500/10 text-gray-500 border-gray-500/50"
        }
    }

    // Handle Dispatch Logic Mock
    const handleDispatch = (e: React.FormEvent) => {
        e.preventDefault()
        if (Number(cargoWeight) > 5000) { // e.g. Max capacity of selected vehicle is 5000
            alert("Error: Cargo weight exceeds vehicle's maximum capacity!")
            return
        }
        alert("Trip Dispatched Successfully!")
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
                                <SelectItem value="on-way">On way</SelectItem>
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
                        <CardTitle>Trip Dispatcher</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Trip</TableHead>
                                    <TableHead>Fleet Type</TableHead>
                                    <TableHead>Origin</TableHead>
                                    <TableHead>Destination</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {trips.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="font-medium text-primary">{t.id}</TableCell>
                                        <TableCell>{t.type}</TableCell>
                                        <TableCell>{t.origin}</TableCell>
                                        <TableCell>{t.destination}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className={getStatusColor(t.status)}>
                                                {t.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="xl:w-[400px]">
                <Card className="sticky top-6">
                    <form onSubmit={handleDispatch}>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg text-primary">New Trip Form</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="vehicle">Select Vehicle</Label>
                                <Select required>
                                    <SelectTrigger id="vehicle">
                                        <SelectValue placeholder="Select available vehicle..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="v1">MH 00 2017 (Mini - 5t)</SelectItem>
                                        <SelectItem value="v2">MH 05 9922 (Van - 1t)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="weight">Cargo Weight (Kg)</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    value={cargoWeight}
                                    onChange={(e) => setCargoWeight(e.target.value)}
                                    placeholder="e.g. 4500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="driver">Select Driver</Label>
                                <Select required>
                                    <SelectTrigger id="driver">
                                        <SelectValue placeholder="Select available driver..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="d1">John Doe (Valid Lic)</SelectItem>
                                        <SelectItem value="d2">Alice Smith (Valid Lic)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="origin">Origin Address</Label>
                                <Input id="origin" placeholder="Pickup location" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="destination">Destination</Label>
                                <Input id="destination" placeholder="Dropoff location" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fuel">Estimated Fuel Cost</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                    <Input id="fuel" type="number" className="pl-8" placeholder="0.00" required />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full bg-primary font-bold">
                                Confirm & Dispatch Trip
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}
