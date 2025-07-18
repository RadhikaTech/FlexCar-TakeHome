type ZipModalProps = {
    zip: string;
    modalMessage: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
};

export default function ZipModal({
    zip,
    modalMessage,
    onChange,
    onKeyDown,
    onSubmit,
}: ZipModalProps) {
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                <h2 className="text-2xl text-[#A28089] font-semibold mb-4">Enter ZIP Code</h2>
                <input
                    type="text"
                    placeholder="Enter ZIP code"
                    className="border border-gray-300 rounded px-4 py-2 w-full mb-4 bg-white text-black placeholder-gray-500"
                    value={zip}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                {modalMessage && (
                    <p className="text-red-600 mb-2">{modalMessage}</p>
                )}
                <button
                    onClick={onSubmit}
                    className="bg-[#A28089] text-white px-4 py-2 rounded w-full cursor-pointer pointer-events-auto border border-transparent hover:bg-white hover:text-[#A28089] hover:border-[#A28089]"
                >
                    Search Vehicles
                </button>
            </div>
        </div >
    );
}
