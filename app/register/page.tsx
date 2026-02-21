"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Truck } from "lucide-react"
import { signupAction } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState<string>("MANAGER")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)
        formData.append("role", role)

        const result = await signupAction(formData)
        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4 text-primary">
                            <Truck className="h-12 w-12" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Register</CardTitle>
                        <CardDescription>Create a new FleetFlow account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MANAGER">Manager</SelectItem>
                                    <SelectItem value="DISPATCHER">Dispatcher</SelectItem>
                                    <SelectItem value="SAFETY_OFFICER">Safety Officer</SelectItem>
                                    <SelectItem value="FINANCIAL_ANALYST">Financial Analyst</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground w-full">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-primary hover:underline">
                                Log in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
