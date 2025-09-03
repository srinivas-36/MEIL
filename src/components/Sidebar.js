// Sidebar.js - Enhanced with user status and better visual hierarchy
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FilePlus, ClipboardList, ShieldCheck, LogIn, UserPlus, LogOut, User, Package } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();
    useEffect(() => {
        // Check if user is logged in (in a real app, this would come from auth context)
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            const name = localStorage.getItem("userName") || "User";
            setUserName(name);
        }
    }, []);
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        // In a real app, you would also clear tokens and redirect
        router.push("/");
    };
    const navItems = [
        { name: "Home", href: "/app", icon: Home },
        { name: "Requests", href: "/requests", icon: FilePlus },
        { name: "Indent", href: "/indent", icon: ClipboardList },
        { name: "Materials", href: "/materials", icon: Package },
        // ...(role === "MDGT" ? [{ name: "Governance", href: "/governance", icon: ShieldCheck }] : []),
        ...(role === "ADMIN" ? [{ name: "Dashboard", href: "/dashboard", icon: Home }] : []),
    ];


    return (
        <aside className="w-64 h-screen bg-[#2f3190] flex flex-col fixed left-0 top-0 shadow-xl z-10">

            {/* Logo */}
            <div className="text-center py-6 border-b border-white/10 items-center justify-center ">
                {/* <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-[#7F56D9] to-[#EC4899] bg-clip-text text-transparent">
                    MDM Portal
                </h1> */}
                <Image src="https://meil.in/sites/default/files/meil_logo_old_update_24.png" className="bg-amber-50 w-3/4 mx-6 p-3 rounded-md" width={800}
                    height={500} />
            </div>

            {/* User Status */}
            {isLoggedIn && (
                <div className="px-4 py-3 mt-4 mx-4 bg-white/10 rounded-lg flex items-center gap-3">
                    <div className="bg-[#7F56D9] p-2 rounded-full">
                        <User size={16} className="text-white" />
                    </div>
                    <div className="text-white text-sm">
                        <p className="font-medium">{userName}</p>
                        <p className="text-xs opacity-80">Welcome back!</p>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 mt-6 overflow-y-auto">
                <ul className="space-y-2 px-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group relative overflow-hidden ${isActive
                                        ? "bg-red-500 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? "animate-pulse" : ""} />
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute right-3 w-2 h-2 bg-white rounded-full animate-ping"></span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}

                    {isLoggedIn && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-left text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-xs text-gray-400">
                © {new Date().getFullYear()} MEIL MDM
                <p className="mt-1 text-[10px] opacity-70">v2.0 Enhanced</p>
            </div>
        </aside>
    );
}
