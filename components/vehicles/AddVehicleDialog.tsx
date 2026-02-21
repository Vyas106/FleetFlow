"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createVehicle } from "@/lib/actions"
import { toast } from "sonner"
import { VehicleType } from "@prisma/client"

export default function AddVehicleDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const data = {
            licensePlate: formData.get("licensePlate") as string,
            model: formData.get("model") as string,
            type: formData.get("type") as VehicleType,
            name: formData.get("model") as string, // Using model as name for now
            maxLoadCapacity: Number(formData.get("capacity")),
            odometer: Number(formData.get("odometer")),
        }

        const result = await createVehicle(data)
        setLoading(false)

        if (result.success) {
            toast.success("Vehicle added successfully")
            setOpen(false)
        } else {
            toast.error("Failed to add vehicle")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> New Vehicle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Vehicle Registration</DialogTitle>
                        <DialogDescription>
                            Add a new asset to your fleet. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="licensePlate">License Plate</Label>
                            <Input id="licensePlate" name="licensePlate" placeholder="MH 00 XXXX" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" name="model" placeholder="Tata Ace" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select name="type" required>
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TRUCK">Truck</SelectItem>
                                    <SelectItem value="VAN">Van</SelectItem>
                                    <SelectItem value="MINI">Mini</SelectItem>
                                    <SelectItem value="TRAILER">Trailer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="capacity">Max Payload (kg)</Label>
                                <Input id="capacity" name="capacity" type="number" placeholder="5000" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="odometer">Initial Odometer</Label>
                                <Input id="odometer" name="odometer" type="number" placeholder="0" required />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Vehicle"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
