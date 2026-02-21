import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, TrendingUp, DollarSign, Activity, AlertCircle } from "lucide-react"
import { getAnalyticsData } from "@/lib/actions"
// We'll use a Client Component for the charts to handle Recharts
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts"

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    return (
        <div className="flex flex-col gap-8 animate-slow-fade">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/40 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                        <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Operational Analytics & Financial Reports</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Comprehensive data insights across all fleet operations</p>
                    </div>
                </div>
                <Button className="gap-2 mt-4 sm:mt-0 rounded-full font-medium h-10 shadow-md shadow-primary/20">
                    <Download className="h-4 w-4" /> Download Report
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="glass-card hover:border-green-500/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Total Fuel Cost</CardTitle>
                        <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black tracking-tighter text-foreground">{data.totalFuelCost}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            Current month projection
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card hover:border-blue-500/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Fleet ROI</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black tracking-tighter text-foreground">{data.fleetROI}</div>
                        <p className="text-xs text-muted-foreground mt-1">Compared to last quarter</p>
                    </CardContent>
                </Card>
                <Card className="glass-card hover:border-primary/30 transition-all duration-300 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground">Utilization Rate</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Activity className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-1">
                            <div className="text-4xl font-black tracking-tighter text-foreground">82</div>
                            <span className="text-lg font-bold text-muted-foreground">%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Optimal running capacity</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section (Client Component) */}
            <div className="animate-slow-fade" style={{ animationDelay: '100ms' }}>
                <AnalyticsCharts
                    fuelEfficiencyTrend={data.fuelEfficiencyTrend}
                    topCostliestVehicles={data.topCostliestVehicles}
                />
            </div>

            {/* Financial Summary Table */}
            <Card className="glass-card border-border/40 shadow-sm overflow-hidden animate-slow-fade" style={{ animationDelay: '150ms' }}>
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Financial Summary of Month
                    </CardTitle>
                    <CardDescription>Consolidated breakdown of income against core operational expenses.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-border/40">
                                <TableHead className="pl-6 font-semibold uppercase text-xs tracking-wider">Month</TableHead>
                                <TableHead className="font-semibold uppercase text-xs tracking-wider">Gross Revenue</TableHead>
                                <TableHead className="font-semibold text-amber-500/80 uppercase text-xs tracking-wider">Fuel Cost</TableHead>
                                <TableHead className="font-semibold text-blue-500/80 uppercase text-xs tracking-wider">Maintenance</TableHead>
                                <TableHead className="text-right pr-6 font-semibold uppercase text-xs tracking-wider">Net Profit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.financialSummary.length === 0 ? (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={5} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-3">
                                            <div className="p-4 bg-muted/30 rounded-full">
                                                <AlertCircle className="h-8 w-8 opacity-40" />
                                            </div>
                                            <p>No financial data found for current period.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.financialSummary.map((row: any, i: number) => (
                                    <TableRow key={i} className="hover:bg-primary/5 transition-colors group border-b-border/40">
                                        <TableCell className="pl-6 py-4 font-bold text-base tracking-tight">{row.month}</TableCell>
                                        <TableCell className="font-medium text-foreground">{row.revenue}</TableCell>
                                        <TableCell className="text-muted-foreground">{row.fuel}</TableCell>
                                        <TableCell className="text-muted-foreground">{row.maintenance}</TableCell>
                                        <TableCell className="text-right pr-6 font-black text-lg text-emerald-500">
                                            {row.profit}
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
