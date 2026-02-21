"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createServiceLog } from "@/lib/actions"
import { toast } from "sonner"
import { Vehicle } from "@/lib/generated/client"

interface AddServiceLogDialogProps {
    vehicles: Vehicle[];
}

export default function AddServiceLogDialog({ vehicles }: AddServiceLogDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const data = {
            vehicleId: formData.get("vehicleId") as string,
            issue: formData.get("issue") as string,
            cost: Number(formData.get("cost")),
            date: new Date(formData.get("date") as string),
        }

        const result = await createServiceLog(data)
        setLoading(false)

        if (result.success) {
            toast.success("Service log created. Vehicle moved to 'In Shop'.")
            setOpen(false)
        } else {
            toast.error("Failed to create service log")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Create New Service
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Service Log</DialogTitle>
                        <DialogDescription>
                            Logging a repair automatically switches the vehicle status to "In Shop", preventing dispatching.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="vehicle">Vehicle Name/ID</Label>
                            <Select name="vehicleId" required>
                                <SelectTrigger id="vehicle">
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
                            <Label htmlFor="issue">Issue/Service Needed</Label>
                            <Input id="issue" name="issue" placeholder="e.g. Engine noise" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="cost">Estimated Cost (₹)</Label>
                            <Input id="cost" name="cost" type="number" placeholder="0" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="date">Date Brought In</Label>
                            <Input id="date" name="date" type="date" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
