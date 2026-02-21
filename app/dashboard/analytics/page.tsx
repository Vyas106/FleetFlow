"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AnalyticsPage() {
    // Mock Data
    const kpis = {
        totalFuelCost: "Rs. 2.6 L",
        fleetROI: "+ 12.5%",
        utilizationRate: "82%",
    }

    const fuelEfficiencyData = [
        { month: "Jan", kml: 12 },
        { month: "Feb", kml: 11 },
        { month: "Mar", kml: 14 },
        { month: "Apr", kml: 13 },
        { month: "May", kml: 15 },
        { month: "Jun", kml: 16 },
    ]

    const topCostliestVehicles = [
        { vehicle: "VAN-02", cost: 120 },
        { vehicle: "TRK-01", cost: 95 },
        { vehicle: "TRK-05", cost: 85 },
        { vehicle: "VAN-01", cost: 60 },
        { vehicle: "MIN-04", cost: 45 },
    ]

    const financialSummary = [
        { month: "Jan", revenue: "Rs. 17L", fuel: "Rs. 6L", maintenance: "Rs. 2L", profit: "Rs. 9L" },
        { month: "Feb", revenue: "Rs. 18L", fuel: "Rs. 6.5L", maintenance: "Rs. 1.5L", profit: "Rs. 10L" },
        { month: "Mar", revenue: "Rs. 16L", fuel: "Rs. 5.5L", maintenance: "Rs. 3L", profit: "Rs. 7.5L" },
        { month: "Apr", revenue: "Rs. 20L", fuel: "Rs. 7L", maintenance: "Rs. 2L", profit: "Rs. 11L" },
    ]

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
                        <div className="text-3xl font-bold text-green-600 dark:text-green-500">{kpis.totalFuelCost}</div>
                    </CardContent>
                </Card>
                <Card className="border-blue-500/20 bg-blue-500/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Fleet ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">{kpis.fleetROI}</div>
                        <p className="text-xs text-muted-foreground mt-1">Compared to last quarter</p>
                    </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary">Utilization Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">{kpis.utilizationRate}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Fuel Efficiency Trend (km/L)</CardTitle>
                        <CardDescription>Average fleet distance per liter over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fuelEfficiencyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="kml"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "var(--background)" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top 5 Costliest Vehicles</CardTitle>
                        <CardDescription>Total expenses (Fuel + Maint) in Thousands (Rs)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topCostliestVehicles} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#888" opacity={0.2} />
                                <XAxis type="number" tickLine={false} axisLine={false} />
                                <YAxis dataKey="vehicle" type="category" tickLine={false} axisLine={false} width={80} />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                />
                                <Bar
                                    dataKey="cost"
                                    fill="#f43f5e"
                                    radius={[0, 4, 4, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

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
                            {financialSummary.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium text-primary">{row.month}</TableCell>
                                    <TableCell>{row.revenue}</TableCell>
                                    <TableCell>{row.fuel}</TableCell>
                                    <TableCell>{row.maintenance}</TableCell>
                                    <TableCell className="text-right font-bold text-green-500">{row.profit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
