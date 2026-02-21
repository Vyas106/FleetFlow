"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { VehicleStatus, DriverStatus, TripStatus, ServiceStatus } from "@/lib/generated/client";
import { setSession, logout } from "./auth";
import bcrypt from "bcryptjs";

// --- VEHICLE ACTIONS ---

export async function getVehicles() {
    try {
        return await prisma.vehicle.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        return [];
    }
}

export async function createVehicle(data: {
    name: string;
    model: string;
    type: any;
    licensePlate: string;
    maxLoadCapacity: number;
    odometer: number;
}) {
    try {
        const vehicle = await prisma.vehicle.create({
            data: {
                ...data,
                status: VehicleStatus.AVAILABLE,
            },
        });
        revalidatePath("/dashboard/vehicles");
        revalidatePath("/dashboard");
        return { success: true, vehicle };
    } catch (error) {
        console.error("Failed to create vehicle:", error);
        return { success: false, error: "Failed to create vehicle" };
    }
}

// --- DRIVER ACTIONS ---

export async function getDrivers() {
    try {
        return await prisma.driver.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch drivers:", error);
        return [];
    }
}

export async function createDriver(data: {
    name: string;
    licenseNumber: string;
    licenseExpiry: Date;
}) {
    try {
        const driver = await prisma.driver.create({
            data: {
                ...data,
                status: DriverStatus.ON_DUTY,
            },
        });
        revalidatePath("/dashboard/drivers");
        revalidatePath("/dashboard");
        return { success: true, driver };
    } catch (error) {
        console.error("Failed to create driver:", error);
        return { success: false, error: "Failed to create driver" };
    }
}

// --- TRIP ACTIONS ---

export async function getTrips() {
    try {
        return await prisma.trip.findMany({
            include: {
                vehicle: true,
                driver: true,
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch trips:", error);
        return [];
    }
}

export async function createTrip(data: {
    vehicleId: string;
    driverId: string;
    origin: string;
    destination: string;
    cargoWeight: number;
    estFuelCost: number;
    revenue?: number;
}) {
    try {
        // Transaction to create trip and update statuses
        const result = await prisma.$transaction(async (tx: any) => {
            // Create the trip
            const trip = await tx.trip.create({
                data: {
                    ...data,
                    revenue: data.revenue || (data.cargoWeight * 2), // Mock: Rs 2 per kg if not provided
                    status: TripStatus.DISPATCHED,
                },
            });

            // Update vehicle status
            await tx.vehicle.update({
                where: { id: data.vehicleId },
                data: { status: VehicleStatus.ON_TRIP },
            });

            // Update driver status
            await tx.driver.update({
                where: { id: data.driverId },
                data: { status: DriverStatus.OFF_DUTY }, // Or a specific ON_TRIP status if we had one
            });

            return trip;
        });

        revalidatePath("/dashboard/dispatch");
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/vehicles");
        revalidatePath("/dashboard/drivers");
        return { success: true, trip: result };
    } catch (error) {
        console.error("Failed to dispatch trip:", error);
        return { success: false, error: "Failed to dispatch trip" };
    }
}

export async function completeTrip(tripId: string, finalOdometer: number) {
    try {
        const result = await prisma.$transaction(async (tx: any) => {
            const trip = await tx.trip.update({
                where: { id: tripId },
                data: {
                    status: TripStatus.COMPLETED,
                    finalOdometer,
                    completedAt: new Date(),
                },
            });

            await tx.vehicle.update({
                where: { id: trip.vehicleId },
                data: {
                    status: VehicleStatus.AVAILABLE,
                    odometer: finalOdometer,
                },
            });

            await tx.driver.update({
                where: { id: trip.driverId },
                data: { status: DriverStatus.ON_DUTY },
            });

            return trip;
        });

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/dispatch");
        revalidatePath("/dashboard/vehicles");
        revalidatePath("/dashboard/drivers");
        revalidatePath("/dashboard/analytics");
        return { success: true, trip: result };
    } catch (error) {
        console.error("Failed to complete trip:", error);
        return { success: false, error: "Failed to complete trip" };
    }
}

// --- MAINTENANCE ACTIONS ---

export async function getServiceLogs() {
    try {
        return await prisma.serviceLog.findMany({
            include: { vehicle: true },
            orderBy: { date: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch service logs:", error);
        return [];
    }
}

export async function createServiceLog(data: {
    vehicleId: string;
    issue: string;
    cost: number;
    date: Date;
}) {
    try {
        const result = await prisma.$transaction(async (tx: any) => {
            const log = await tx.serviceLog.create({
                data: {
                    ...data,
                    status: ServiceStatus.NEW,
                },
            });

            await tx.vehicle.update({
                where: { id: data.vehicleId },
                data: { status: VehicleStatus.IN_SHOP },
            });

            return log;
        });

        revalidatePath("/dashboard/maintenance");
        revalidatePath("/dashboard/vehicles");
        revalidatePath("/dashboard");
        return { success: true, log: result };
    } catch (error) {
        console.error("Failed to create service log:", error);
        return { success: false, error: "Failed to create service log" };
    }
}

// --- EXPENSE ACTIONS ---

export async function getExpenseLogs() {
    try {
        return await prisma.expenseLog.findMany({
            include: {
                vehicle: true,
                driver: true,
                trip: true,
            },
            orderBy: { date: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch expense logs:", error);
        return [];
    }
}

export async function createExpenseLog(data: {
    tripId?: string;
    vehicleId: string;
    driverId: string;
    fuelCost: number;
    miscExpense: number;
    liters: number;
    date: Date;
}) {
    try {
        const log = await prisma.expenseLog.create({
            data,
        });
        revalidatePath("/dashboard/expenses");
        revalidatePath("/dashboard/analytics");
        return { success: true, log };
    } catch (error) {
        console.error("Failed to create expense log:", error);
        return { success: false, error: "Failed to create expense log" };
    }
}

// --- DASHBOARD & ANALYTICS ---

export async function getDashboardStats() {
    try {
        const [activeFleet, maintenanceAlerts, pendingTrips, totalVehicles] = await Promise.all([
            prisma.vehicle.count({ where: { status: VehicleStatus.ON_TRIP } }),
            prisma.vehicle.count({ where: { status: VehicleStatus.IN_SHOP } }),
            prisma.trip.count({ where: { status: TripStatus.DRAFT } }),
            prisma.vehicle.count(),
        ]);

        const activeTrips = await prisma.trip.findMany({
            where: { status: TripStatus.DISPATCHED },
            include: { vehicle: true, driver: true },
            take: 10,
            orderBy: { createdAt: "desc" },
        });

        // utilizationRate = percentage of vehicles currently on trip
        const utilizationRate = totalVehicles > 0 ? (activeFleet / totalVehicles) * 100 : 0;

        return {
            activeFleet,
            maintenanceAlerts,
            pendingCargo: pendingTrips,
            utilizationRate: Math.round(utilizationRate),
            activeTrips,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        return {
            activeFleet: 0,
            maintenanceAlerts: 0,
            pendingCargo: 0,
            utilizationRate: 0,
            activeTrips: [],
        };
    }
}

export async function getAnalyticsData() {
    try {
        const [expenseLogs, serviceLogs, trips] = await Promise.all([
            prisma.expenseLog.findMany({ include: { vehicle: true } }),
            prisma.serviceLog.findMany({ include: { vehicle: true } }),
            prisma.trip.findMany({ where: { status: TripStatus.COMPLETED } }),
        ]);

        const totalFuelCostNum = expenseLogs.reduce((acc: number, log: any) => acc + log.fuelCost, 0);
        const totalMaintenanceCost = serviceLogs.reduce((acc: number, log: any) => acc + log.cost, 0);
        const totalRevenueNum = trips.reduce((acc: number, t: any) => acc + (t.revenue || 0), 0);

        // Group by month for Financial Summary
        const monthlyData: Record<string, { month: string; revenue: number; fuel: number; maintenance: number; profit: number }> = {};

        const allLogs = [
            ...expenseLogs.map(l => ({ date: l.date, type: 'fuel', amount: l.fuelCost + l.miscExpense })),
            ...serviceLogs.map(l => ({ date: l.date, type: 'maintenance', amount: l.cost })),
            ...trips.map(t => ({ date: t.completedAt || t.createdAt, type: 'revenue', amount: t.revenue || 0 }))
        ];

        allLogs.forEach(entry => {
            const date = new Date(entry.date);
            const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { month: monthKey, revenue: 0, fuel: 0, maintenance: 0, profit: 0 };
            }
            if (entry.type === 'revenue') monthlyData[monthKey].revenue += entry.amount;
            if (entry.type === 'fuel') monthlyData[monthKey].fuel += entry.amount;
            if (entry.type === 'maintenance') monthlyData[monthKey].maintenance += entry.amount;
        });

        const financialSummary = Object.values(monthlyData).map(m => ({
            ...m,
            profit: m.revenue - (m.fuel + m.maintenance),
            revenue: `₹ ${m.revenue}`,
            fuel: `₹ ${m.fuel}`,
            maintenance: `₹ ${m.maintenance}`,
            profitLabel: `₹ ${m.revenue - (m.fuel + m.maintenance)}`
        })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

        // Fuel Efficiency Trend (Mocking some trend based on real liters/costs if available, but grouping by date)
        const fuelTrend = expenseLogs.map(log => ({
            date: new Date(log.date).toLocaleDateString(),
            efficiency: log.liters > 0 ? (100 / log.liters) : 0 // Simplified mock ratio
        })).slice(-10);

        // Top Costliest Vehicles
        const vehicleCosts: Record<string, { name: string; cost: number }> = {};
        [...expenseLogs, ...serviceLogs].forEach((l: any) => {
            const vid = l.vehicleId;
            const cost = (l.fuelCost || 0) + (l.miscExpense || 0) + (l.cost || 0);
            if (!vehicleCosts[vid]) {
                vehicleCosts[vid] = { name: l.vehicle.licensePlate, cost: 0 };
            }
            vehicleCosts[vid].cost += cost;
        });

        const topCostliestVehicles = Object.values(vehicleCosts)
            .sort((a, b) => b.cost - a.cost)
            .slice(0, 5)
            .map(v => ({ name: v.name, cost: v.cost }));

        return {
            totalFuelCost: `₹ ${(totalFuelCostNum / 1000).toFixed(1)}K`,
            fleetROI: totalRevenueNum > 0 ? `+ ${((totalRevenueNum - (totalFuelCostNum + totalMaintenanceCost)) / totalRevenueNum * 100).toFixed(1)}%` : "0%",
            financialSummary,
            fuelEfficiencyTrend: fuelTrend.length ? fuelTrend : [
                { date: "Jan", efficiency: 12 }, { date: "Feb", efficiency: 15 }, { date: "Mar", efficiency: 14 }
            ],
            topCostliestVehicles: topCostliestVehicles.length ? topCostliestVehicles : [
                { name: "MH01-1234", cost: 5000 }, { name: "MH02-5678", cost: 3000 }
            ],
        };
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return {
            totalFuelCost: "₹ 0",
            fleetROI: "0%",
            financialSummary: [],
            fuelEfficiencyTrend: [],
            topCostliestVehicles: [],
        };
    }
}

// --- AUTH ACTIONS ---

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simple mock authentication for now
    // In a real app, you'd check passwords with bcrypt
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { error: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return { error: "Invalid credentials" };
    }

    await setSession({
        id: user.id,
        email: user.email,
        name: user.name || "",
        role: user.role,
    });

    redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as any;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: "An account with this email already exists." };
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role,
            },
        });

        await setSession({
            id: user.id,
            email: user.email,
            name: user.name || "",
            role: user.role,
        });

        revalidatePath("/");
    } catch (error: any) {
        console.error("Signup failed:", error);
        const errorMessage = error?.message || "Unknown error";
        return { error: `Registration failed: ${errorMessage}` };
    }
    redirect("/dashboard");
}

export async function logoutAction() {
    await logout();
    redirect("/login");
}
