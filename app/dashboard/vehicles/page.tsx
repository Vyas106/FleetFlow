import { getVehicles } from "@/lib/actions"
import VehicleListClient from "@/components/vehicles/VehicleListClient"

export default async function VehiclesPage() {
    const vehicles = await getVehicles();

    return <VehicleListClient vehicles={vehicles} />
}
