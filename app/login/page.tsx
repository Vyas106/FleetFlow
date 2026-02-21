"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Truck, ArrowRight, ShieldCheck,
    Mail, Lock, Loader2, Activity, BarChart3, Globe
} from "lucide-react"
import { loginAction } from "@/lib/actions"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
        <div className="flex min-h-screen bg-black text-slate-50">
            {/* LEFT SIDE: Brand & Objective Narrative (Same as Register) */}
            <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 overflow-hidden border-r border-emerald-900/20 bg-zinc-950">
                {/* Green Gradient Orbs */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-emerald-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 mb-12 group w-fit cursor-pointer">
                        {/* Icon with hover rotation & emerald glow */}
                        <div className="p-2 bg-emerald-500 rounded-lg shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <Truck className="h-8 w-8 text-black" />
                        </div>

                        {/* Text Logo: Fleet (White) Flow (Green) */}
                        <span className="text-2xl font-black tracking-tighter uppercase italic transition-all duration-300">
                            <span className="text-white group-hover:text-emerald-50">Fleet</span>
                            <span className="text-emerald-500 group-hover:text-emerald-400">Flow</span>
                        </span>
                    </Link>

                    <div className="space-y-6 max-w-xl">
                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
                            Welcome back to your <br />
                            <span className="text-emerald-500">Control Center.</span>
                        </h1>
                        <p className="text-lg text-zinc-400 leading-relaxed italic border-l-2 border-emerald-500/50 pl-4">
                            Resume your fleet operations and manage logistics workflows with real-time data synchronization.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6">
                        {[
                            { title: "Session Security", desc: "Enterprise-grade encryption for all operator actions.", icon: ShieldCheck },
                            { title: "Live Sync", desc: "Instant updates across all dispatched units and hubs.", icon: Activity },
                            { title: "Global Access", desc: "Access your dashboard securely from any location.", icon: Globe }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 group">
                                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                    <item.icon className="h-5 w-5 shrink-0" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-200">{item.title}</h4>
                                    <p className="text-sm text-zinc-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-6 text-zinc-600 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> Secure Access
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" /> Data Verified
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Login Form (Same structure as Register) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-black">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2 lg:hidden">
                            <Truck className="h-6 w-6 text-emerald-500" />
                            <span className="font-black italic text-emerald-500">FleetFlow</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Operator Sign In</h2>
                        <p className="text-zinc-500 font-medium">Please enter your work credentials to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Work Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-700 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="operator@fleetflow.com"
                                        className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-emerald-500 h-11 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">Security Password</Label>
                                    <Link href="#" className="text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-700 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-emerald-500 h-11 transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                            <p className="text-[11px] text-zinc-500 text-center leading-relaxed italic">
                                Unauthorized access is strictly prohibited and monitored.
                            </p>
                        </div>

                        <Button
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black h-12 transition-all active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Enter Dashboard <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                            Register your fleet
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}