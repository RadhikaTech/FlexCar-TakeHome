import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-transparent shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">FlexCar</h1>
                <Image src="/flexcar_icon.png" alt="LOGO" width={40} height={40} />

            </div>
        </header>
    );
}
