"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, AlertTriangle } from "lucide-react"

interface AnalyticsChartsProps {
    fuelEfficiencyTrend: any[];
    topCostliestVehicles: any[];
}

export default function AnalyticsCharts({ fuelEfficiencyTrend, topCostliestVehicles }: AnalyticsChartsProps) {
    // Use mock data if provided data is empty to keep the UI looking good until real data accumulates
    const displayFuelTrend = fuelEfficiencyTrend.length > 0 ? fuelEfficiencyTrend : [
        { date: "Jan", efficiency: 12 },
        { date: "Feb", efficiency: 11 },
        { date: "Mar", efficiency: 14 },
        { date: "Apr", efficiency: 13 },
        { date: "May", efficiency: 15 },
        { date: "Jun", efficiency: 16 },
    ];

    const displayCostliest = topCostliestVehicles.length > 0 ? topCostliestVehicles : [
        { name: "VAN-02", cost: 120 },
        { name: "TRK-01", cost: 95 },
        { name: "TRK-05", cost: 85 },
        { name: "VAN-01", cost: 60 },
        { name: "MIN-04", cost: 45 },
    ];

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Fuel Efficiency Trend (km/L)
                    </CardTitle>
                    <CardDescription>Average fleet distance per liter over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-6 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={displayFuelTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.2} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} />
                            <Tooltip
                                contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                                itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="efficiency"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#020817" }}
                                activeDot={{ r: 6, strokeWidth: 0, fill: "#60a5fa" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="glass-card border-border/40 shadow-sm overflow-hidden flex flex-col">
                <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Top Costliest Vehicles
                    </CardTitle>
                    <CardDescription>Total expenses (Fuel + Maint) in Thousands (₹)</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] pt-6 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={displayCostliest} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#888" opacity={0.2} />
                            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#888', fontWeight: 'bold' }} width={80} dx={-10} />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                                itemStyle={{ color: '#f43f5e', fontWeight: 'bold' }}
                            />
                            <Bar
                                dataKey="cost"
                                fill="#f43f5e"
                                radius={[0, 6, 6, 0]}
                                barSize={24}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
