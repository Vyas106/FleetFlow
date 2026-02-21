"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { completeTrip } from "@/lib/actions"
import { toast } from "sonner"

interface CompleteTripDialogProps {
    tripId: string;
    currentOdometer: number;
}

export default function CompleteTripDialog({ tripId, currentOdometer }: CompleteTripDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        const finalOdometer = Number(formData.get("finalOdometer"))

        if (finalOdometer < currentOdometer) {
            toast.error(`Final odometer (${finalOdometer} km) cannot be less than start odometer (${currentOdometer} km)`)
            return
        }

        setLoading(true)
        const result = await completeTrip(tripId, finalOdometer)
        setLoading(false)

        if (result.success) {
            toast.success("Trip completed successfully")
            setOpen(false)
        } else {
            toast.error("Failed to complete trip")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-green-600 border-green-600/50 hover:bg-green-600/10 gap-1">
                    <CheckCircle className="h-4 w-4" /> Complete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Complete Trip</DialogTitle>
                        <DialogDescription>
                            Enter the final odometer reading to finish this trip and release the vehicle and driver.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="tripId">Trip ID</Label>
                            <Input id="tripId" value={tripId.slice(0, 8)} disabled className="font-mono" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="startOdo">Start Odometer (km)</Label>
                            <Input id="startOdo" value={currentOdometer} disabled />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="finalOdometer">Final Odometer Reading (km)</Label>
                            <Input
                                id="finalOdometer"
                                name="finalOdometer"
                                type="number"
                                placeholder={`${currentOdometer + 100}`}
                                required
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                            {loading ? "Completing..." : "Finish Trip"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
