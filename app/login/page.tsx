"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck, ArrowRight, ShieldCheck } from "lucide-react"
import { loginAction } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        try {
            const result = await loginAction(formData)
            if (result?.error) {
                toast.error(result.error)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("An unexpected error occurred.")
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md animate-slow-fade">
                <div className="flex flex-col items-center mb-8 space-y-2">
                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                        <Truck className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">FleetFlow</h1>
                    <p className="text-muted-foreground text-center">Modern Fleet & Logistics Management System</p>
                </div>

                <Card className="border-border/40 shadow-2xl shadow-primary/5 glass-card">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your operator dashboard
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="operator@fleetflow.com"
                                    className="bg-background/50 border-border/60 focus:ring-primary/20"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                                    <Link href="#" className="text-xs font-medium text-primary hover:underline transition-all">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="bg-background/50 border-border/60 focus:ring-primary/20"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-2">
                            <Button className="w-full group relative overflow-hidden font-bold h-11" type="submit" disabled={isLoading}>
                                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {isLoading ? "Authenticating..." : (
                                        <>
                                            Sign In <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </span>
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Secure Enterprise Access
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-primary hover:underline transition-all">
                        Register your fleet
                    </Link>
                </p>
            </div>
        </div>
    )
}

