import { getSession } from "@/lib/auth"
import { getNotifications, markNotificationAsRead } from "@/lib/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Info, AlertTriangle, AlertCircle, CheckCircle2, History } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

import { Notification } from "@/lib/generated/client"

export default async function NotificationsPage() {
    const session = await getSession();
    if (!session) return null;

    const notifications: Notification[] = await getNotifications(session.id);

    const getIcon = (type: string) => {
        switch (type) {
            case "WARNING": return <AlertTriangle className="h-5 w-5 text-amber-500" />
            case "CRITICAL": return <AlertCircle className="h-5 w-5 text-destructive" />
            case "SUCCESS": return <CheckCircle2 className="h-5 w-5 text-green-500" />
            default: return <Info className="h-5 w-5 text-blue-500" />
        }
    }

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <Bell className="h-8 w-8 text-primary" />
                        System Notifications
                    </h1>
                    <p className="text-muted-foreground">Stay updated with real-time operational alerts and mission updates.</p>
                </div>
                <Button variant="outline" className="rounded-full border-border/40 hover:bg-primary/5 hover:text-primary">
                    <History className="h-4 w-4 mr-2" /> Mark All as Read
                </Button>
            </div>

            <Card className="glass-card border-border/40 overflow-hidden">
                <CardHeader className="border-b border-border/40 bg-muted/20">
                    <CardTitle className="text-lg">Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                            <div className="p-6 bg-muted/30 rounded-full mb-4">
                                <Bell className="h-12 w-12 opacity-20" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">No activity logs yet</h3>
                            <p className="text-muted-foreground mt-1 max-w-xs mx-auto">Your operational history will appear here once the system starts generating alerts.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/40">
                            {notifications.map((n: Notification) => (
                                <div key={n.id} className={`p-6 flex gap-4 transition-colors hover:bg-primary/5 ${!n.isRead ? 'bg-primary/5' : ''}`}>
                                    <div className="mt-1 shrink-0 p-2 bg-background rounded-xl border border-border/40 shadow-sm">
                                        {getIcon(n.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <h4 className={`font-bold ${!n.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    {n.title}
                                                </h4>
                                                {!n.isRead && (
                                                    <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black h-5 px-1.5 uppercase">New</Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                                <History className="h-3 w-3" />
                                                {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {n.message}
                                        </p>
                                        <div className="pt-2 flex items-center gap-3">
                                            <form action={async () => {
                                                "use server";
                                                await markNotificationAsRead(n.id);
                                            }}>
                                                <Button variant="link" className="p-0 h-auto text-xs font-bold uppercase tracking-wider text-primary hover:no-underline">
                                                    Archive Record
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
