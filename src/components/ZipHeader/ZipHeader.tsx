type ZipHeaderProps = {
    zip: string;
    onChangeZip: () => void;
};

export default function ZipHeader({ zip, onChangeZip }: ZipHeaderProps) {
    return (
        <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
                Showing vehicles for ZIP code: <span className="text-[#A28089]">{zip}</span>
            </h3>
            <button
                onClick={onChangeZip}
                className="border border-transparent px-3 py-1 rounded hover:bg-white hover:text-[#A28089]  cursor-pointer"
            >
                Change ZIP Code
            </button>
        </div>
    );
}
