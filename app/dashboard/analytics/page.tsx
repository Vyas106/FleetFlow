import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { getAnalyticsData } from "@/lib/actions"
// We'll use a Client Component for the charts to handle Recharts
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts"

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center bg-card p-4 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold">Operational Analytics & Financial Reports</h2>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" /> Download Report
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-green-500/20 bg-green-500/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Total Fuel Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-500">{data.totalFuelCost}</div>
                    </CardContent>
                </Card>
                <Card className="border-blue-500/20 bg-blue-500/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Fleet ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">{data.fleetROI}</div>
                        <p className="text-xs text-muted-foreground mt-1">Compared to last quarter</p>
                    </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary">Utilization Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">82%</div> {/* Mocked for now but in cards */}
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section (Client Component) */}
            <AnalyticsCharts
                fuelEfficiencyTrend={data.fuelEfficiencyTrend}
                topCostliestVehicles={data.topCostliestVehicles}
            />

            {/* Financial Summary Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Financial Summary of Month</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Fuel Cost</TableHead>
                                <TableHead>Maintenance</TableHead>
                                <TableHead className="text-right">Net Profit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.financialSummary.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                        No financial data found for current period.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.financialSummary.map((row: any, i: number) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium text-primary">{row.month}</TableCell>
                                        <TableCell>{row.revenue}</TableCell>
                                        <TableCell>{row.fuel}</TableCell>
                                        <TableCell>{row.maintenance}</TableCell>
                                        <TableCell className="text-right font-bold text-green-500">{row.profit}</TableCell>
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
