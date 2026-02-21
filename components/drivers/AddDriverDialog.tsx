"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { createDriver } from "@/lib/actions"
import { toast } from "sonner"

export default function AddDriverDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const data = {
            name: formData.get("name") as string,
            licenseNumber: formData.get("licenseNumber") as string,
            licenseExpiry: new Date(formData.get("licenseExpiry") as string),
        }

        const result = await createDriver(data)
        setLoading(false)

        if (result.success) {
            toast.success("Driver added successfully")
            setOpen(false)
        } else {
            toast.error("Failed to add driver")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add Driver
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add / Edit Driver</DialogTitle>
                        <DialogDescription>
                            Manage driver profiles, licenses, and duty status.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="e.g. John Doe" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="licenseNumber">License Number</Label>
                            <Input id="licenseNumber" name="licenseNumber" placeholder="e.g. 23223" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                            <Input id="licenseExpiry" name="licenseExpiry" type="date" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Driver"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
