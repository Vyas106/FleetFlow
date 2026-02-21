import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Wrench, AlertCircle } from "lucide-react"
import { getServiceLogs, getVehicles } from "@/lib/actions"
import AddServiceLogDialog from "@/components/maintenance/AddServiceLogDialog"
import { format } from "date-fns"

export default async function MaintenancePage() {
    const [serviceLogs, vehicles] = await Promise.all([
        getServiceLogs(),
        getVehicles(),
    ]);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "RESOLVED": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "IN_PROGRESS": return "bg-blue-500/10 text-blue-500 border-blue-500/50"
            case "NEW": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/50"
        }
    }

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search maintenance logs..." className="pl-9 w-full bg-background border-border/50 rounded-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[140px] hidden sm:flex rounded-full bg-background border-border/50">
                            <SelectValue placeholder="Ticket Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">New Ticket</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full border-border/50 bg-background hover:bg-muted/50">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddServiceLogDialog vehicles={vehicles} />
            </div>

            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex-1 flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-primary" />
                        Maintenance & Service Terminal
                    </CardTitle>
                    <CardDescription>Track vehicle repairs, routine servicing, and associated maintenance costs.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="w-[120px] pl-6 font-semibold uppercase text-xs tracking-wider">Log ID</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Asset</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Reported Issue</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Filing Date</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Maint. Cost</TableHead>
                                <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceLogs.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <AlertCircle className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>No maintenance records found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                serviceLogs.map((log: any) => (
                                    <TableRow key={log.id} className="hover:bg-primary/5 transition-colors group border-b-border/40">
                                        <TableCell className="pl-6 py-4">
                                            <div className="font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded inline-block">
                                                {log.id.slice(0, 8)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold tracking-wider group-hover:text-primary transition-colors">{log.vehicle.licensePlate}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.issue}</TableCell>
                                        <TableCell className="text-muted-foreground">{format(new Date(log.date), "dd/MM/yyyy")}</TableCell>
                                        <TableCell className="font-medium text-amber-500">₹{log.cost.toLocaleString()}</TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Badge variant="outline" className={`${getStatusVariant(log.status)} uppercase tracking-widest text-[10px] font-bold px-3 py-1`}>
                                                {log.status.replace(/_/g, " ")}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
