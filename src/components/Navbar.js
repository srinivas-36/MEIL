import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-[#002147]/95 backdrop-blur sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                    MDM Portal
                </h1>
                <div className="flex gap-6 text-gray-200">
                    <Link href="/" className="hover:text-[#EC4899]">Home</Link>
                    {/* <Link href="/search" className="hover:text-[#EC4899]">Search</Link> */}
                    <Link href="/requests" className="hover:text-[#EC4899]">Requests</Link>
                    <Link href="/indent" className="hover:text-[#EC4899]">Indent</Link>
                    <Link href="/governance" className="hover:text-[#EC4899]">Governance</Link>
                    <Link href="/login" className="hover:text-[#EC4899]">Login</Link>
                </div>
            </div>
        </nav>
    );
}
