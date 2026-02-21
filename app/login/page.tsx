"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck } from "lucide-react"
import { loginAction } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        const result = await loginAction(formData)
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
                        <CardTitle className="text-2xl font-bold">FleetFlow</CardTitle>
                        <CardDescription>Enter your email below to login to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground w-full">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="font-medium text-primary hover:underline">
                                Register
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
