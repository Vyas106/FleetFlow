"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { VehicleStatus, DriverStatus, TripStatus, ServiceStatus } from "@prisma/client";

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
}) {
    try {
        // Transaction to create trip and update statuses
        const result = await prisma.$transaction(async (tx: any) => {
            // Create the trip
            const trip = await tx.trip.create({
                data: {
                    ...data,
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
        const expenseLogs = await prisma.expenseLog.findMany();
        const serviceLogs = await prisma.serviceLog.findMany();

        const totalFuelCost = expenseLogs.reduce((acc: number, log: any) => acc + log.fuelCost, 0);
        const totalMaintenanceCost = serviceLogs.reduce((acc: number, log: any) => acc + log.cost, 0);

        // Simplistic ROI and efficiency calculation for mock purposes but using real sums
        // Revenue could be added to trips to make this more real
        const totalRevenue = (await prisma.trip.findMany({ where: { status: TripStatus.COMPLETED } }))
            .reduce((acc: number, t: any) => acc + (t.revenue || 0), 0);

        return {
            totalFuelCost: `Rs. ${(totalFuelCost / 100000).toFixed(1)}L`,
            fleetROI: totalRevenue > 0 ? `+ ${((totalRevenue - (totalFuelCost + totalMaintenanceCost)) / totalRevenue * 100).toFixed(1)}%` : "0%",
            financialSummary: [], // Could aggregate by month
            fuelEfficiencyTrend: [], // Could aggregate by month
            topCostliestVehicles: [], // Could group by vehicleId
        };
    } catch (error) {
        return {
            totalFuelCost: "Rs. 0L",
            fleetROI: "0%",
            financialSummary: [],
            fuelEfficiencyTrend: [],
            topCostliestVehicles: [],
        };
    }
}
