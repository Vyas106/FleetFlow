import Link from "next/link"
import { Truck, Shield, Zap, BarChart3, ArrowRight, CheckCircle2, Globe, Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Truck className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-black tracking-tighter">
              Fleet<span className="text-primary">Flow</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <Button asChild rounded="full" className="font-bold px-6 shadow-lg shadow-primary/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold hover:text-primary transition-colors px-4 py-2">
                  Login
                </Link>
                <Button asChild rounded="full" className="font-bold px-6 shadow-lg shadow-primary/20">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
              <Zap className="h-3 w-3" /> The Future of Logistics is Here
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] animate-slow-fade">
              Next-Generation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Fleet Intelligence
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg lg:text-xl font-medium mb-12 leading-relaxed animate-slow-fade">
              Optimize your entire logistics operation with real-time tracking, AI-powered dispatching, and automated maintenance logs. All in one premium platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slow-fade">
              <Button size="lg" asChild rounded="full" className="h-14 px-10 text-lg font-bold shadow-2xl shadow-primary/30 group">
                <Link href={session ? "/dashboard" : "/register"}>
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" rounded="full" className="h-14 px-10 text-lg font-bold border-border/40 hover:bg-muted/50">
                <Link href="#features">Watch Demo</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-24 pt-12 border-t border-border/40 animate-slow-fade">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-8">Trusted by Global Logistics Leaders</p>
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-40 grayscale group hover:opacity-100 transition-all duration-700">
                <div className="flex items-center gap-2 font-black text-xl">🚀 SPACEFORCE</div>
                <div className="flex items-center gap-2 font-black text-xl">⚡ VOLTTRANS</div>
                <div className="flex items-center gap-2 font-black text-xl">📦 LOGIXNET</div>
                <div className="flex items-center gap-2 font-black text-xl">🌐 NEXUS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative group max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <div className="glass-card rounded-[2.5rem] border border-border/40 overflow-hidden shadow-3xl">
                <div className="h-12 border-b border-border/40 px-6 flex items-center gap-2 bg-background/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="mx-auto bg-muted/50 px-4 py-1 rounded-md text-[10px] font-medium text-muted-foreground">
                    fleetflow.io/dashboard/analytics
                  </div>
                </div>
                <div className="aspect-[16/10] bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-12 overflow-hidden">
                  <div className="grid grid-cols-2 gap-8 w-full h-full max-h-[500px]">
                    <div className="space-y-6">
                      <div className="h-32 rounded-3xl bg-primary/10 border border-primary/20 animate-pulse" />
                      <div className="h-48 rounded-3xl bg-muted/40 border border-border/40" />
                    </div>
                    <div className="space-y-6">
                      <div className="h-48 rounded-3xl bg-muted/40 border border-border/40" />
                      <div className="h-32 rounded-3xl bg-blue-500/10 border border-blue-500/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Precision-Engineered Features</h2>
            <p className="text-muted-foreground font-medium">Built to scale with your growing business, from 5 vehicles to 5,000.</p>
          </div>

          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Smart Dispatching",
                desc: "Automated trip assignment based on vehicle availability and driver safety scores.",
                color: "primary"
              },
              {
                icon: BarChart3,
                title: "Power Analytics",
                desc: "Live ROI tracking, fuel efficiency analysis and financial forecasting.",
                color: "blue"
              },
              {
                icon: Shield,
                title: "Asset Security",
                desc: "Comprehensive service logs and automated maintenance reminders for entire fleet.",
                color: "green"
              },
              {
                icon: Globe,
                title: "Global Operations",
                desc: "Track shipments across borders with multi-currency and timezone support.",
                color: "amber"
              },
              {
                icon: Clock,
                title: "Real-time Sync",
                desc: "Live status updates across mobile and desktop apps with sub-second latency.",
                color: "purple"
              },
              {
                icon: Package,
                title: "Cargo Tracking",
                desc: "Detailed cargo management including weight limits and delivery confirmation.",
                color: "red"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border border-border/40 hover:border-primary/40 transition-all duration-300 group">
                <div className={`p-4 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed italic">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-primary-foreground relative overflow-hidden shadow-3xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-white/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

              <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-8">Ready to revolutionize your logistics?</h2>
              <p className="max-w-xl mx-auto text-primary-foreground/80 text-lg font-medium mb-12 italic">
                Join thousands of fleet managers who have already optimized their operations with FleetFlow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" variant="secondary" asChild rounded="full" className="h-16 px-12 text-xl font-black group">
                  <Link href="/register">
                    Get Started Now <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" rounded="full" className="h-16 px-12 text-xl font-black bg-white/10 border-white/20 hover:bg-white/20">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="bg-primary p-2 rounded-xl">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-black tracking-tighter italic">FleetFlow</span>
              </Link>
              <p className="text-muted-foreground max-w-sm font-medium italic">
                The leading enterprise operating system for modern fleet and logistics management. Trusted worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-6">Product</h4>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground font-medium">
                <Link href="#" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#" className="hover:text-primary transition-colors">Integrations</Link>
                <Link href="#" className="hover:text-primary transition-colors">Roadmap</Link>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-6">Company</h4>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground font-medium">
                <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
                <Link href="#" className="hover:text-primary transition-colors">Careers</Link>
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/40 pt-10 text-xs text-muted-foreground font-bold tracking-widest">
            <p>© 2026 FLEETFLOW OPERATING SYSTEMS LLC.</p>
            <div className="flex gap-8 mt-4 md:mt-0 italic">
              <span>MADE FOR THE BOLD.</span>
              <div className="flex items-center gap-2">
                <Globe className="h-3 w-3" /> INDIA (IST)
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
