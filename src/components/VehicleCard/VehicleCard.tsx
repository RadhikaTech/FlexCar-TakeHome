import { Vehicle } from "@/types/vehicle";

type Props = {
    vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
    return (
        <div data-testid="vehicle-card"
            className="mb-5 bg-transparent border-1 border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden">
            <div className="w-full h-[250px] bg-transparent flex items-center justify-center">
                <img
                    src={vehicle.image || "/car-placeholder.jpg"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-full object-cover"
                />
            </div>

            <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {vehicle.make} {vehicle.model}
                </h2>
                <p className="text-gray-800 text-sm mb-1">
                    <strong>Trim:</strong> {vehicle.trim}
                </p>
                <p className="text-gray-800 text-sm mb-1">
                    <strong>Year:</strong> {vehicle.year}
                </p>
                <p className="text-gray-800 text-sm mb-1">
                    <strong>Color:</strong> {vehicle.color}
                </p>
                <p className="text-gray-800 text-sm mb-1">
                    <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} km
                </p>
                <p className="text-lg font-extrabold mt-3">
                    ₹{vehicle.price.toLocaleString()}L
                </p>

            </div>
        </div>
    );
}
