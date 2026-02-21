"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createExpenseLog } from "@/lib/actions"
import { toast } from "sonner"
import { Vehicle, Driver, Trip } from "@/lib/generated/client"

interface AddExpenseDialogProps {
    vehicles: Vehicle[];
    drivers: Driver[];
    trips: Trip[];
}

export default function AddExpenseDialog({ vehicles, drivers, trips }: AddExpenseDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const data = {
            tripId: formData.get("tripId") === "none" ? undefined : formData.get("tripId") as string,
            vehicleId: formData.get("vehicleId") as string,
            driverId: formData.get("driverId") as string,
            fuelCost: Number(formData.get("fuelCost")),
            miscExpense: Number(formData.get("miscExpense")),
            liters: Number(formData.get("liters")),
            date: new Date(formData.get("date") as string),
        }

        const result = await createExpenseLog(data)
        setLoading(false)

        if (result.success) {
            toast.success("Expense logged successfully")
            setOpen(false)
        } else {
            toast.error("Failed to log expense")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Add an Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Expense</DialogTitle>
                        <DialogDescription>
                            Log fuel or miscellaneous trip expenses.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="tripId">Trip (Optional)</Label>
                            <Select name="tripId">
                                <SelectTrigger id="tripId">
                                    <SelectValue placeholder="Select trip" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">General (No specific trip)</SelectItem>
                                    {trips.map(t => (
                                        <SelectItem key={t.id} value={t.id}>
                                            Trip {t.id.slice(0, 8)} - {t.destination}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="vehicleId">Vehicle</Label>
                            <Select name="vehicleId" required>
                                <SelectTrigger id="vehicleId">
                                    <SelectValue placeholder="Select vehicle" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vehicles.map(v => (
                                        <SelectItem key={v.id} value={v.id}>
                                            {v.licensePlate} ({v.model})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="driverId">Driver</Label>
                            <Select name="driverId" required>
                                <SelectTrigger id="driverId">
                                    <SelectValue placeholder="Select driver" />
                                </SelectTrigger>
                                <SelectContent>
                                    {drivers.map(d => (
                                        <SelectItem key={d.id} value={d.id}>
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="fuelCost">Fuel Cost (₹)</Label>
                                <Input id="fuelCost" name="fuelCost" type="number" placeholder="0" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="liters">Liters</Label>
                                <Input id="liters" name="liters" type="number" step="0.01" placeholder="0.00" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="miscExpense">Misc Expense (₹)</Label>
                            <Input id="miscExpense" name="miscExpense" type="number" placeholder="0" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Expense"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
