"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { updateVehicle, deleteVehicle } from "@/lib/actions"
import { toast } from "sonner"

interface VehicleActionsProps {
    vehicle: {
        id: string;
        name: string;
        model: string;
        type: string;
        licensePlate: string;
        maxLoadCapacity: number;
        odometer: number;
        status: string;
    }
}

export default function VehicleActions({ vehicle }: VehicleActionsProps) {
    const [editOpen, setEditOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleEdit(formData: FormData) {
        setLoading(true)
        const data = {
            licensePlate: formData.get("licensePlate") as string,
            model: formData.get("model") as string,
            name: formData.get("model") as string,
            type: formData.get("type") as any,
            maxLoadCapacity: Number(formData.get("capacity")),
            odometer: Number(formData.get("odometer")),
        }

        const result = await updateVehicle(vehicle.id, data)
        setLoading(false)

        if (result.success) {
            toast.success("Vehicle updated successfully")
            setEditOpen(false)
        } else {
            toast.error(result.error || "Failed to update vehicle")
        }
    }

    async function handleDelete() {
        setLoading(true)
        const result = await deleteVehicle(vehicle.id)
        setLoading(false)

        if (result.success) {
            toast.success("Vehicle removed from fleet")
        } else {
            toast.error(result.error || "Failed to remove vehicle")
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => setEditOpen(true)} className="cursor-pointer">
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Remove Vehicle?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently remove <strong>{vehicle.licensePlate}</strong> from your fleet registry. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={loading}>
                                    {loading ? "Removing..." : "Remove"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form action={handleEdit}>
                        <DialogHeader>
                            <DialogTitle>Edit Vehicle</DialogTitle>
                            <DialogDescription>
                                Update information for <strong>{vehicle.licensePlate}</strong>.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-licensePlate">License Plate</Label>
                                <Input id="edit-licensePlate" name="licensePlate" defaultValue={vehicle.licensePlate} required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-model">Model</Label>
                                <Input id="edit-model" name="model" defaultValue={vehicle.model} required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="edit-type">Type</Label>
                                <Select name="type" defaultValue={vehicle.type} required>
                                    <SelectTrigger id="edit-type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="TRUCK">Truck</SelectItem>
                                        <SelectItem value="VAN">Van</SelectItem>
                                        <SelectItem value="MINI">Mini</SelectItem>
                                        <SelectItem value="BIKE">Bike</SelectItem>
                                        <SelectItem value="TRAILER">Trailer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-capacity">Max Payload (kg)</Label>
                                    <Input id="edit-capacity" name="capacity" type="number" defaultValue={vehicle.maxLoadCapacity} required />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="edit-odometer">Odometer</Label>
                                    <Input id="edit-odometer" name="odometer" type="number" defaultValue={vehicle.odometer} required />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" type="button" onClick={() => setEditOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
