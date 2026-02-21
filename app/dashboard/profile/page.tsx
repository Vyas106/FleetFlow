import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Mail, Shield, Calendar, MapPin, Phone } from "lucide-react"

export default async function ProfilePage() {
    const session = await getSession();

    if (!session) return null;

    return (
        <div className="flex flex-col animate-slow-fade">
            <div className="relative mb-20">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-primary/80 to-blue-600/80 shadow-lg shadow-primary/10" />
                <div className="absolute -bottom-12 left-8 flex items-end gap-6">
                    <Avatar className="h-32 w-32 border-[6px] border-background shadow-2xl ring-1 ring-border/40">
                        <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-black">
                            {session.name?.charAt(0) || session.email?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="pb-4">
                        <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">{session.name}</h1>
                        <p className="font-bold text-muted-foreground flex items-center gap-2 bg-background/40 backdrop-blur-sm px-3 py-1 rounded-full border border-border/40 w-fit">
                            <Shield className="h-4 w-4 text-primary" />
                            {session.role}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>View and manage your personal details and contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input defaultValue={session.name} className="pl-10 h-11 bg-muted/30 border-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Work Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input defaultValue={session.email} className="pl-10 h-11 bg-muted/30 border-none" disabled />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input defaultValue="+91 98765 43210" className="pl-10 h-11 bg-muted/30 border-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Primary Location</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input defaultValue="Mumbai, India" className="pl-10 h-11 bg-muted/30 border-none" />
                                    </div>
                                </div>
                            </div>
                            <Button className="w-fit rounded-full px-8 h-11 shadow-lg shadow-primary/20">Update Profile</Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>Work Schedule</CardTitle>
                            <CardDescription>Manage your availability and shift rotations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <Calendar className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-bold">Active Shift: Morning Operations</p>
                                    <p className="text-sm text-muted-foreground">08:00 AM - 05:00 PM IST (Mon - Sat)</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="glass-card border-border/40 overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border/40">
                            <CardTitle className="text-base">System Permissions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-4 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Asset Management</span>
                                    <Badge className="bg-green-500/10 text-green-500 border-none">Allowed</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Financial Access</span>
                                    <Badge className="bg-amber-500/10 text-amber-500 border-none">Elevated</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Personnel Logs</span>
                                    <Badge className="bg-green-500/10 text-green-500 border-none">Allowed</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle className="text-base">Account Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full rounded-xl justify-start h-11 hover:bg-primary/5 hover:text-primary border-border/40">
                                <Shield className="h-4 w-4 mr-2" /> Change Password
                            </Button>
                            <Button variant="outline" className="w-full rounded-xl justify-start h-11 hover:bg-destructive/5 hover:text-destructive border-border/40">
                                <LogOut className="h-4 w-4 mr-2" /> Terminate Session
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${className}`}>
            {children}
        </span>
    )
}

import { LogOut } from "lucide-react"
