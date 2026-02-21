"use client";

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Info, AlertTriangle, AlertCircle, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { markNotificationAsRead } from "@/lib/actions"
import { toast } from "sonner"
import Link from "next/link"

interface Notification {
    id: string;
    title: string;
    message: string;
    type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS";
    isRead: Boolean;
    createdAt: Date;
}

interface NotificationPopoverProps {
    initialNotifications: any[];
}

export default function NotificationPopover({ initialNotifications }: NotificationPopoverProps) {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [mounted, setMounted] = useState(false);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMarkAsRead = async (id: string) => {
        const result = await markNotificationAsRead(id);
        if (result.success) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        } else {
            toast.error("Failed to mark as read");
        }
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "WARNING": return <AlertTriangle className="h-4 w-4 text-amber-500" />
            case "CRITICAL": return <AlertCircle className="h-4 w-4 text-destructive" />
            case "SUCCESS": return <CheckCircle2 className="h-4 w-4 text-green-500" />
            default: return <Info className="h-4 w-4 text-blue-500" />
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background animate-pulse" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 glass-card border-border/40 shadow-2xl" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
                    <h4 className="font-bold text-sm tracking-tight">Notifications</h4>
                    {unreadCount > 0 && (
                        <Badge variant="secondary" className="rounded-full px-2 py-0 h-5 text-[10px] font-bold bg-primary/10 text-primary border-none">
                            {unreadCount} NEW
                        </Badge>
                    )}
                </div>
                <ScrollArea className="h-[350px]">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 px-4 text-center">
                            <div className="p-3 bg-muted/30 rounded-full mb-3">
                                <Bell className="h-6 w-6 opacity-20" />
                            </div>
                            <p className="text-xs text-muted-foreground">All caught up! No new alerts.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/40">
                            {notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`p-4 transition-colors hover:bg-primary/5 cursor-pointer relative group ${!n.isRead ? 'bg-primary/5' : ''}`}
                                    onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                                >
                                    <div className="flex gap-3">
                                        <div className="mt-0.5 shrink-0">
                                            {getIcon(n.type)}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`text-xs font-bold leading-none ${!n.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    {n.title}
                                                </p>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                    {mounted ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : "..."}
                                                </span>
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                                                {n.message}
                                            </p>
                                        </div>
                                    </div>
                                    {!n.isRead && (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t border-border/40 bg-muted/10">
                    <Button asChild variant="ghost" className="w-full h-8 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary rounded-lg">
                        <Link href="/dashboard/notifications">View All Activity</Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
