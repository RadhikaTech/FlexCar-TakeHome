interface SortProps {
    onSortChange: (value: string) => void;
}

export default function Sort({ onSortChange }: SortProps) {
    return (
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <label htmlFor="sort" className="text-md font-bold text-gray-700">
                Sort By
            </label>
            <select
                id="sort"
                data-testid="vehicle-price"
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent border border-gray-300 shadow-sm rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#A28089] transition duration-150 ease-in-out"
            >
                <option value="">Default</option>
                <option value="priceLow">Price (Low to High)</option>
                <option value="priceHigh">Price (High to Low)</option>
                <option value="year">Year (Newest First)</option>
            </select>
        </div >
    );
}
