interface FilterProps {
    makes: string[];
    colors: string[];
    onFilterChange: (filters: { make: string; color: string }) => void;
}

export default function Filter({ makes, colors, onFilterChange }: FilterProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        onFilterChange((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full">
            <div className="flex flex-col w-full md:w-48">
                <label htmlFor="make" className="text-lg font-semibold text-gray-700 mb-1">
                    Make
                </label>
                <select
                    name="make"
                    id="make"
                    onChange={handleChange}
                    className="bg-transparent border border-gray-300 rounded px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A28089]"
                >
                    <option value="">All</option>
                    {makes.map((make) => (
                        <option key={make} value={make}>
                            {make}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col w-full md:w-48">
                <label htmlFor="color" className="text-lg font-semibold text-gray-700 mb-1">
                    Color
                </label>
                <select
                    name="color"
                    id="color"
                    onChange={handleChange}
                    className="bg-transparent border border-gray-300 rounded px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A28089]"
                >
                    <option value="">All</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
