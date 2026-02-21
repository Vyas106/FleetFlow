import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, AlertTriangle, Users, AlertCircle } from "lucide-react"
import { getDrivers } from "@/lib/actions"
import AddDriverDialog from "@/components/drivers/AddDriverDialog"
import { format, isBefore } from "date-fns"

export default async function DriversPage() {
    const drivers = await getDrivers();

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "ON_DUTY": return "bg-green-500/10 text-green-500 border-green-500/50"
            case "OFF_DUTY": return "bg-amber-500/10 text-amber-500 border-amber-500/50"
            case "SUSPENDED": return "bg-destructive/10 text-destructive border-destructive/50"
            default: return "bg-zinc-500/10 text-zinc-500 border-zinc-500/50"
        }
    }

    const today = new Date();

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                <div className="flex flex-1 w-full sm:w-auto items-center gap-2">
                    <div className="relative flex-1 sm:max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search operational profiles..." className="pl-9 w-full bg-background border-border/50 rounded-full" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[140px] hidden sm:flex rounded-full bg-background border-border/50">
                            <SelectValue placeholder="Duty Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active Duty</SelectItem>
                            <SelectItem value="expired">License Expired</SelectItem>
                            <SelectItem value="suspended">Suspended Line</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full border-border/50 bg-background hover:bg-muted/50">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <AddDriverDialog />
            </div>

            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex-1 flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Driver Performance & Safety Profiles
                    </CardTitle>
                    <CardDescription>Oversight of operational personnel, certification validities, and duty statuses.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="w-[200px] pl-6 font-semibold uppercase text-xs tracking-wider">Operator Name</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Credential ID / License No.</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Certification Expiry</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Completion %</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Complaints</TableHead>
                                <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Duty Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drivers.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={4} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <AlertCircle className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>No operator profiles registered in the system.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                drivers.map((driver: any) => {
                                    const isExpired = isBefore(new Date(driver.licenseExpiry), today);
                                    return (
                                        <TableRow key={driver.id} className={`hover:bg-primary/5 transition-colors group border-b-border/40 ${isExpired ? "bg-destructive/5" : ""}`}>
                                            <TableCell className="pl-6 py-4 font-bold text-base tracking-tight flex items-center gap-2">
                                                {isExpired && <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />}
                                                {driver.name}
                                            </TableCell>
                                            <TableCell className="font-mono text-muted-foreground">{driver.licenseNumber}</TableCell>
                                            <TableCell className={isExpired ? "text-destructive font-bold" : "text-muted-foreground"}>
                                                {format(new Date(driver.licenseExpiry), "dd/MM/yyyy")}
                                            </TableCell>
                                            <TableCell className="font-medium text-blue-500">
                                                {driver.completionRate}%
                                            </TableCell>
                                            <TableCell className={`font-medium ${driver.complaints > 0 ? "text-amber-500" : "text-green-500"}`}>
                                                {driver.complaints}
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Badge variant="outline" className={`${isExpired ? "bg-destructive/10 text-destructive border-destructive/50" : getStatusVariant(driver.status)} uppercase tracking-widest text-[10px] font-bold px-3 py-1`}>
                                                    {isExpired ? "EXPIRED" : driver.status.replace(/_/g, " ")}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
