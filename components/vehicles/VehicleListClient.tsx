"use client";

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Truck, AlertCircle } from "lucide-react"
import AddVehicleDialog from "@/components/vehicles/AddVehicleDialog"
import VehicleActions from "@/components/vehicles/VehicleActions"

interface VehicleListClientProps {
    vehicles: any[];
}

export default function VehicleListClient({ vehicles }: VehicleListClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredVehicles = useMemo(() => {
        return vehicles.filter((v: any) => {
            const matchesSearch = searchQuery === "" ||
                v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.type.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || v.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [vehicles, searchQuery, statusFilter])

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "AVAILABLE": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "ON_TRIP": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "IN_SHOP": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            case "OUT_OF_SERVICE": return "bg-destructive/10 text-destructive border-destructive/50"
            default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/50"
        }
    }

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search plates, models..."
                            className="pl-9 w-full bg-background border-border/50 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[160px] hidden sm:flex rounded-full bg-background border-border/50">
                            <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="AVAILABLE">Available</SelectItem>
                            <SelectItem value="ON_TRIP">On Mission</SelectItem>
                            <SelectItem value="IN_SHOP">In Shop</SelectItem>
                            <SelectItem value="OUT_OF_SERVICE">Out of Service</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <AddVehicleDialog />
            </div>

            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex-1 flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-primary" />
                        Fleet Registry
                    </CardTitle>
                    <CardDescription>Comprehensive tracking of all logistical assets and their current operational status.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="w-[80px] pl-6 font-semibold uppercase text-xs tracking-wider">No</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Plate</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Model</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Type</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Capacity</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Odometer</TableHead>
                                <TableHead className="w-[140px] font-semibold uppercase text-xs tracking-wider">Status</TableHead>
                                <TableHead className="w-[60px] font-semibold uppercase text-xs tracking-wider text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredVehicles.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={8} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <AlertCircle className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>{searchQuery || statusFilter !== "all" ? "No vehicles match your filters." : "No vehicles registered in the fleet yet."}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredVehicles.map((v: any, i: number) => (
                                    <TableRow key={v.id} className="hover:bg-primary/5 transition-colors group border-b-border/40">
                                        <TableCell className="pl-6 py-4 font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                            {String(i + 1).padStart(2, '0')}
                                        </TableCell>
                                        <TableCell className="font-bold tracking-wider">{v.licensePlate}</TableCell>
                                        <TableCell className="text-muted-foreground">{v.model}</TableCell>
                                        <TableCell>
                                            <span className="bg-muted px-2 py-1 rounded text-xs font-medium">{v.type}</span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{v.maxLoadCapacity.toLocaleString()} kg</TableCell>
                                        <TableCell className="text-muted-foreground font-mono">{v.odometer.toLocaleString()} km</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`${getStatusVariant(v.status)} uppercase tracking-widest text-[10px] font-bold px-3 py-1`}>
                                                {v.status.replace(/_/g, " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <VehicleActions vehicle={v} />
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
