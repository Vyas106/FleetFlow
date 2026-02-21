import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings as SettingsIcon, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <SettingsIcon className="h-8 w-8 text-primary" />
                    General Settings
                </h1>
                <p className="text-muted-foreground">Manage your workspace preferences, notifications, and security policies.</p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="bg-background/40 backdrop-blur-sm border border-border/40 p-1 mb-6 rounded-full inline-flex">
                    <TabsTrigger value="account" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Account</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Notifications</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Security</TabsTrigger>
                    <TabsTrigger value="appearance" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Appearance</TabsTrigger>
                </TabsList>

                <TabsContent value="account">
                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>Company Details</CardTitle>
                            <CardDescription>Update your company's logistical information and regional settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input id="companyName" placeholder="FleetFlow Logistics" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Input id="timezone" defaultValue="(GMT+05:30) Mumbai, Kolkata" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Headquarters Address</Label>
                                <Input id="address" placeholder="123 Logistic Way, Tech Park" />
                            </div>
                            <Button className="rounded-full px-8">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>Communication Preferences</CardTitle>
                            <CardDescription>Control how you receive alerts about your fleet's status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-muted/20">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Maintenance Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Receive notifications when vehicles require urgent attention.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-muted/20">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Dispatch Updates</Label>
                                    <p className="text-sm text-muted-foreground">Get notified when new trips are assigned or completed.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-muted/20">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Financial Reporting</Label>
                                    <p className="text-sm text-muted-foreground">Monthly expense summaries delivered via email.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>Access Control</CardTitle>
                            <CardDescription>Manage password policies and two-factor authentication.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Two-Factor Authentication</Label>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" className="rounded-full">Enable 2FA</Button>
                                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-border/40 flex flex-col gap-4">
                                <Label className="text-destructive">Danger Zone</Label>
                                <Button variant="destructive" className="w-fit rounded-full">Revoke All Active Sessions</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card className="glass-card border-border/40">
                        <CardHeader>
                            <CardTitle>User Interface</CardTitle>
                            <CardDescription>Customize the visual style of your dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <button className="p-4 rounded-xl border-2 border-primary space-y-2 text-left">
                                    <div className="h-4 w-4 rounded-full bg-primary" />
                                    <p className="font-bold">System Default</p>
                                </button>
                                <button className="p-4 rounded-xl border border-border/40 space-y-2 text-left hover:border-primary/50 transition-colors">
                                    <div className="h-4 w-4 rounded-full bg-slate-900" />
                                    <p className="font-bold">Deep Obsidian</p>
                                </button>
                                <button className="p-4 rounded-xl border border-border/40 space-y-2 text-left hover:border-primary/50 transition-colors">
                                    <div className="h-4 w-4 rounded-full bg-slate-200" />
                                    <p className="font-bold">Light Contrast</p>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
