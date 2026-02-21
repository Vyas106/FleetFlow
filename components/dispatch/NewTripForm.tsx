"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTrip } from "@/lib/actions"
import { toast } from "sonner"
import { Vehicle, Driver } from "@/lib/generated/client"

interface NewTripFormProps {
    availableVehicles: Vehicle[];
    availableDrivers: Driver[];
}

export default function NewTripForm({ availableVehicles, availableDrivers }: NewTripFormProps) {
    const [loading, setLoading] = useState(false)
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>("")

    const selectedVehicle = availableVehicles.find(v => v.id === selectedVehicleId)

    async function handleSubmit(formData: FormData) {
        const cargoWeight = Number(formData.get("cargoWeight"))

        // Validation
        if (selectedVehicle && cargoWeight > selectedVehicle.maxLoadCapacity) {
            toast.error(`Cargo weight (${cargoWeight}kg) exceeds vehicle capacity (${selectedVehicle.maxLoadCapacity}kg)!`)
            return
        }

        setLoading(true)
        const data = {
            vehicleId: selectedVehicleId,
            driverId: formData.get("driverId") as string,
            origin: formData.get("origin") as string,
            destination: formData.get("destination") as string,
            cargoWeight,
            estFuelCost: Number(formData.get("estFuelCost")),
            revenue: Number(formData.get("revenue")),
        }

        const result = await createTrip(data)
        setLoading(false)

        if (result.success) {
            toast.success("Trip dispatched successfully")
            // Form resets automatically on success via revalidatePath usually, but we could clear state here if needed
            setSelectedVehicleId("")
        } else {
            toast.error("Failed to dispatch trip")
        }
    }

    return (
        <Card className="sticky top-6">
            <form action={handleSubmit}>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-primary">New Trip Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="vehicle">Select Vehicle</Label>
                        <Select
                            name="vehicleId"
                            required
                            onValueChange={setSelectedVehicleId}
                            value={selectedVehicleId}
                        >
                            <SelectTrigger id="vehicle">
                                <SelectValue placeholder="Select available vehicle..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableVehicles.map(v => (
                                    <SelectItem key={v.id} value={v.id}>
                                        {v.licensePlate} ({v.type} - {v.maxLoadCapacity}kg)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="weight">Cargo Weight (Kg)</Label>
                        <Input
                            id="weight"
                            name="cargoWeight"
                            type="number"
                            placeholder="e.g. 4500"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="driver">Select Driver</Label>
                        <Select name="driverId" required>
                            <SelectTrigger id="driver">
                                <SelectValue placeholder="Select available driver..." />
                            </SelectTrigger>
                            <SelectContent>
                                {availableDrivers.map(d => (
                                    <SelectItem key={d.id} value={d.id}>
                                        {d.name} (Lic: {d.licenseNumber})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="origin">Origin Address</Label>
                        <Input id="origin" name="origin" placeholder="Pickup location" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" name="destination" placeholder="Dropoff location" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fuel">Est. Fuel Cost</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                                <Input id="fuel" name="estFuelCost" type="number" className="pl-6" placeholder="0" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="revenue">Est. Revenue</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                                <Input id="revenue" name="revenue" type="number" className="pl-6" placeholder="0" required />
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full bg-primary font-bold" disabled={loading || !selectedVehicleId}>
                        {loading ? "Dispatching..." : "Confirm & Dispatch Trip"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
