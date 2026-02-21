"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Truck, UserPlus, ArrowRight, Briefcase } from "lucide-react"
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

        try {
            const result = await signupAction(formData)
            if (result?.error) {
                toast.error(result.error)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-background">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-xl animate-slow-fade">
                <div className="flex flex-col items-center mb-8 space-y-2">
                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                        <Truck className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Join FleetFlow</h1>
                    <p className="text-muted-foreground text-center px-4">Create your administrator account to start managing your fleet today.</p>
                </div>

                <Card className="border-border/40 shadow-2xl shadow-primary/5 glass-card">
                    <CardHeader className="space-y-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 bg-primary rounded-full" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">New Account</span>
                        </div>
                        <CardTitle className="text-2xl font-bold">Register Business</CardTitle>
                        <CardDescription>
                            Fill in your details to set up your organization
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                                    <Input id="name" name="name" placeholder="John Doe" className="bg-background/50 border-border/60" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work Email</Label>
                                    <Input id="email" name="email" type="email" placeholder="john@company.com" className="bg-background/50 border-border/60" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Security Password</Label>
                                    <Input id="password" name="password" type="password" placeholder="••••••••" className="bg-background/50 border-border/60" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Operational Role</Label>
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger id="role" className="bg-background/50 border-border/60">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MANAGER">Fleet Manager</SelectItem>
                                            <SelectItem value="DISPATCHER">Logistics Dispatcher</SelectItem>
                                            <SelectItem value="SAFETY_OFFICER">Safety Officer</SelectItem>
                                            <SelectItem value="FINANCIAL_ANALYST">Financial Analyst</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                                <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    By creating an account, you agree to our <Link href="#" className="text-primary hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 pt-2">
                            <Button className="w-full group relative overflow-hidden font-bold h-11" type="submit" disabled={isLoading}>
                                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {isLoading ? "Creating Account..." : (
                                        <>
                                            Complete Registration <UserPlus className="h-4 w-4" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Already part of a fleet?{" "}
                    <Link href="/login" className="font-semibold text-primary hover:underline transition-all">
                        Log in to dashboard
                    </Link>
                </p>
            </div>
        </div>
    )
}

