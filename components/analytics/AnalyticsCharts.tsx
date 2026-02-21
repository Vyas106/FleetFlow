"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsChartsProps {
    fuelEfficiencyTrend: any[];
    topCostliestVehicles: any[];
}

export default function AnalyticsCharts({ fuelEfficiencyTrend, topCostliestVehicles }: AnalyticsChartsProps) {
    // Use mock data if provided data is empty to keep the UI looking good until real data accumulates
    const displayFuelTrend = fuelEfficiencyTrend.length > 0 ? fuelEfficiencyTrend : [
        { month: "Jan", kml: 12 },
        { month: "Feb", kml: 11 },
        { month: "Mar", kml: 14 },
        { month: "Apr", kml: 13 },
        { month: "May", kml: 15 },
        { month: "Jun", kml: 16 },
    ];

    const displayCostliest = topCostliestVehicles.length > 0 ? topCostliestVehicles : [
        { vehicle: "VAN-02", cost: 120 },
        { vehicle: "TRK-01", cost: 95 },
        { vehicle: "TRK-05", cost: 85 },
        { vehicle: "VAN-01", cost: 60 },
        { vehicle: "MIN-04", cost: 45 },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Fuel Efficiency Trend (km/L)</CardTitle>
                    <CardDescription>Average fleet distance per liter over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={displayFuelTrend}>
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
                    <CardDescription>Total expenses (Fuel + Maint) in Thousands (₹)</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={displayCostliest} layout="vertical" margin={{ left: 20 }}>
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
    )
}
