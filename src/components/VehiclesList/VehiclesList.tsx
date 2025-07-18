"use client";

import { useMemo, useState, useCallback } from "react";
import { vehicles } from "@/data/vehicles";
import ZipModal from "@/components/ZipModal/ZipModal";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import Filter from "@/components/Filters/Filters";
import Sort from "@/components/Sort/Sort";

export default function VehicleList() {
    const [zip, setZip] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [modalMessage, setModalMessage] = useState("");
    const [filters, setFilters] = useState({ make: "", color: "" });
    const [sortBy, setSortBy] = useState("");

    const zipNumber = useMemo(() => parseInt(zip, 10), [zip]);

    const validZip = useMemo(() => /^[0-9]{5}$/.test(zip), [zip]);

    const filteredVehicles = useMemo(() => {
        if (!validZip) return [];

        let results = vehicles.filter((v) => v.zip === zipNumber);

        if (filters.make) results = results.filter((v) => v.make === filters.make);
        if (filters.color) results = results.filter((v) => v.color === filters.color);

        switch (sortBy) {
            case "priceLow":
                return results.sort((a, b) => a.price - b.price);
            case "priceHigh":
                return results.sort((a, b) => b.price - a.price);
            case "year":
                return results.sort((a, b) => b.year - a.year);
            default:
                return results;
        }
    }, [zipNumber, validZip, filters, sortBy]);

    const handleZipSubmit = useCallback(() => {
        if (!validZip) {
            setModalMessage("Please enter a valid 5-digit ZIP code.");
            return;
        }

        const zipExists = vehicles.some((v) => v.zip === zipNumber);
        if (!zipExists) {
            setModalMessage(`No vehicles found for ZIP code ${zip}.`);
        } else {
            setShowModal(false);
            setModalMessage("");
        }
    }, [validZip, zip, zipNumber]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setZip(value);

        if (value.length > 5) {
            setModalMessage("ZIP code cannot be more than 5 digits.");
        } else {
            setModalMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleZipSubmit();
    };

    const uniqueMakes = useMemo(() => Array.from(new Set(vehicles.map((v) => v.make))), []);
    const uniqueColors = useMemo(() => Array.from(new Set(vehicles.map((v) => v.color))), []);

    return (
        <div className="p-4 sm:p-6 md:p-10 lg:p-16 xl:p-20 bg-gray-50 min-h-screen">
            {showModal ? (
                <ZipModal
                    zip={zip}
                    modalMessage={modalMessage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onSubmit={handleZipSubmit}
                />
            ) : (
                <>
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                            Vehicles near <span className="text-[#A28089]">{zip}</span>
                        </h3>
                        <button
                            onClick={() => {
                                setShowModal(true);
                                setFilters({ make: "", color: "" });
                                setSortBy("");
                            }}
                            className="text-sm bg-[#A28089] text-white px-4 py-2 rounded hover:bg-white hover:text-[#A28089] border border-[#A28089] transition-colors"
                        >
                            Change ZIP Code
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <Filter
                            makes={uniqueMakes}
                            colors={uniqueColors}
                            onFilterChange={setFilters}
                        />
                        <Sort onSortChange={setSortBy} />
                    </div>

                    {filteredVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredVehicles.map((v) => (
                                <VehicleCard key={v.id} vehicle={v} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500 font-medium">
                            No vehicles match your criteria.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
