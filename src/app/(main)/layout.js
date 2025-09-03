// app/(main)/layout.js
import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 ml-0 lg:ml-64 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
