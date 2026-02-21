import Link from "next/link"
import {
  Truck, Shield, Zap, BarChart3, ArrowRight, CheckCircle2,
  Globe, Clock, Package, AlertCircle, TrendingUp, Users,
  Database, Fingerprint, Activity, Gauge, FileText, Settings, Code2, Cpu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const session = await getSession()
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-50 selection:bg-emerald-500/30">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg group-hover:rotate-6 transition-transform">
              <Truck className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Fleet<span className="text-emerald-500">Flow</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Link href="#solutions" className="hover:text-emerald-500 transition-colors">Target Roles</Link>
            <Link href="#ecosystem" className="hover:text-emerald-500 transition-colors">Ecosystem</Link>
            <Link href="#architecture" className="hover:text-emerald-500 transition-colors">Architecture</Link>
            <Link href="#stack" className="hover:text-emerald-500 transition-colors">Tech Stack</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-bold hover:text-emerald-500 transition-colors px-4">
              Sign In
            </Link>
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black font-black px-6 rounded-full shadow-lg shadow-emerald-500/20">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
          {/* --- ADVANCED BACKGROUND ELEMENTS --- */}

          {/* 1. The Moving "Grid" Overlay - Gives a sense of structure and depth */}
          <div className="absolute inset-0 z-[-2] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* 2. Primary Emerald Light Orb (Animated) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/20 rounded-[100%] blur-[120px] animate-pulse z-[-1]" />

          {/* 3. Drifting "Smoke/Light" Orbs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] animate-blob z-[-1]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000 z-[-1]" />

          {/* 4. Scanning Light Line (Subtle "Radar" sweep) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-scan z-[-1]" />

          {/* --- CONTENT --- */}
          <div className="container mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 animate-fade-in">
              <Activity className="h-3 w-3 animate-pulse" /> System Version 3.0 Live
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic animate-title">
              Centralized <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-emerald-500/50">
                Fleet Logic.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-zinc-400 text-lg font-medium mb-12 leading-relaxed animate-fade-in-delayed">
              A rule-based digital hub replacing manual logbooks. Control the entire lifecycle of your
              delivery fleet—from asset registration to real-time financial auditing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delayed">
              <Button size="lg" className="h-14 px-8 bg-white text-black hover:bg-emerald-500 hover:scale-105 transition-all duration-300 font-black uppercase tracking-wider group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Transformation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>

              <div className="flex items-center gap-4 border-l border-zinc-800 pl-6 group">
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest group-hover:tracking-[0.4em] transition-all">Global Ops</p>
                  <p className="text-xs font-bold text-zinc-500 italic">24/7 Monitoring Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* TARGET USER ROLES */}
        <section id="solutions" className="py-24 border-y border-white/5 bg-zinc-950/50">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-4">Target Personas</h2>
              <h3 className="text-4xl font-black italic tracking-tighter uppercase">Role-Specific <br /> Interfaces.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { user: "Fleet Managers", task: "Lifecycle Tracking", desc: "Oversee vehicle health, asset procurement, and preventative scheduling.", icon: Truck },
                { user: "Dispatchers", task: "Smart Routing", desc: "Validate cargo loads against capacity and assign drivers via sub-second logic.", icon: Zap },
                { user: "Safety Officers", task: "Compliance Guard", desc: "Enforce license validity and monitor real-time driver safety scores.", icon: Shield },
                { user: "Financial Analysts", task: "ROI Auditing", desc: "Analyze fuel burn, maintenance spend, and total operational costs per asset.", icon: BarChart3 },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group">
                  <div className="bg-emerald-500/10 p-3 w-fit rounded-lg mb-6 group-hover:bg-emerald-500 transition-colors">
                    <item.icon className="h-6 w-6 text-emerald-500 group-hover:text-black" />
                  </div>
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{item.user}</h4>
                  <h3 className="text-xl font-bold mb-4">{item.task}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE ECOSYSTEM: CORE MODULES */}
        <section id="ecosystem" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic mb-4">The Modular Ecosystem</h2>
              <p className="text-zinc-500 font-medium">8 integrated modules working in perfect sync.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Command Center", desc: "High-level KPIs: Active Fleet, Maintenance alerts, and Utilization Rates.", icon: Gauge },
                { title: "Vehicle Registry", desc: "Complete asset management including load capacity (kg) and odometer logs.", icon: Database },
                { title: "Trip Dispatcher", desc: "Workflow: Draft → Dispatched → Completed with CargoWeight validation rules.", icon: Package },
                { title: "Service Logs", desc: "Automated status switching: Maintenance logs trigger 'In Shop' status across system.", icon: Settings },
                { title: "Financial Tracker", desc: "Granular logging of Fuel, Liters, and Costs per Vehicle ID.", icon: TrendingUp },
                { title: "Safety Profiles", desc: "License expiry blocking and trip completion performance metrics.", icon: Users },
              ].map((module, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:bg-zinc-900/30 transition-all">
                  <module.icon className="h-8 w-8 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed italic">{module.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK & ARCHITECTURE */}
        <section id="architecture" className="py-24 bg-emerald-500 text-black">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-8">Enterprise <br /> Architecture.</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="font-black uppercase tracking-widest text-[10px]">Data Integrity</p>
                    <p className="text-sm font-bold opacity-80 italic italic">Unique Plate IDs & RBAC Security.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase tracking-widest text-[10px]">Processing</p>
                    <p className="text-sm font-bold opacity-80 italic">Real-time Automated ROI Calculation.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase tracking-widest text-[10px]">Reporting</p>
                    <p className="text-sm font-bold opacity-80 italic">One-click CSV/PDF Health Audits.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase tracking-widest text-[10px]">Validation</p>
                    <p className="text-sm font-bold opacity-80 italic">Weight vs Capacity Logic Gates.</p>
                  </div>
                </div>
              </div>
              <div id="stack" className="bg-black/10 p-10 rounded-[3rem] border border-black/10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8">System Stack</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Code2 className="h-5 w-5" />
                    <span className="font-bold">Next.js 14 Framework (App Router)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Database className="h-5 w-5" />
                    <span className="font-bold">PostgreSQL for Relational Asset Data</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Fingerprint className="h-5 w-5" />
                    <span className="font-bold">NextAuth.js for Role-Based Access</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Cpu className="h-5 w-5" />
                    <span className="font-bold">Server Actions for Logic-Heavy Validation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-32 text-center px-6">
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase italic mb-8">
            Ready to Optimize?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-12 font-medium">
            Eliminate manual errors and take control of your logistics lifecycle today.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild className="h-16 px-12 bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest rounded-full shadow-2xl shadow-emerald-500/20">
              <Link href="/register">Initialize System Access</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-800 p-1 rounded">
              <Truck className="h-3 w-3" />
            </div>
            <span>© 2026 FleetFlow Intelligence Hub</span>
          </div>
          <div className="flex gap-8 italic">
            <span>Powered by Vercel</span>
            <span>Made for Scale</span>
          </div>
        </div>
      </footer>
    </div>
  )
}