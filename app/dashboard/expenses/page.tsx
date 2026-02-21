import { getExpenseLogs, getVehicles, getDrivers, getTrips } from "@/lib/actions"
import ExpenseListClient from "@/components/expenses/ExpenseListClient"

export default async function ExpensesPage() {
    const [expenseLogs, vehicles, drivers, trips] = await Promise.all([
        getExpenseLogs(),
        getVehicles(),
        getDrivers(),
        getTrips(),
    ]);

    return (
        <ExpenseListClient
            expenseLogs={expenseLogs}
            vehicles={vehicles}
            drivers={drivers}
            trips={trips}
        />
    )
}
