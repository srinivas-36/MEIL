"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, Package, ClipboardList, LogOut, User, ShieldCheck, ChevronUp, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showScrollBottom, setShowScrollBottom] = useState(false);
    const [activeHover, setActiveHover] = useState(null);
    const navRef = useRef(null);
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== "undefined") {
            const loggedIn = localStorage.getItem("isLoggedIn") === "true";
            setIsLoggedIn(loggedIn);

            if (loggedIn) {
                const name = localStorage.getItem("userName") || "Admin";
                setUserName(name);
            }
        }
    }, []);


    useEffect(() => {
        const checkScroll = () => {
            if (navRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = navRef.current;
                setShowScrollTop(scrollTop > 20);
                setShowScrollBottom(scrollTop < scrollHeight - clientHeight - 20);
            }
        };

        if (navRef.current) {
            navRef.current.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
        }

        return () => {
            if (navRef.current) {
                navRef.current.removeEventListener('scroll', checkScroll);
            }
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        router.push("/")

    };

    const scrollToTop = () => {
        if (navRef.current) {
            navRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToBottom = () => {
        if (navRef.current) {
            navRef.current.scrollTo({
                top: navRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: Home },
        // { name: "Companies", href: "/dashboard/companies", icon: Building2 },
        { name: "Employees", href: "/dashboard/employees", icon: Users },
        // { name: "Items", href: "/dashboard/items", icon: Package },
        { name: "Projects", href: "/dashboard/projects", icon: Building2 },
        // { name: "Requests", href: "/dashboard/requests", icon: ClipboardList },
        { name: "Permissions", href: "/dashboard/permissions", icon: ShieldCheck },
        { name: "Roles", href: "/dashboard/roles", icon: ShieldCheck },
        { name: "User Dashboard", href: "/app", icon: Home },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#2f3190] text-white p-2 rounded-md shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
                {isCollapsed ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside className={`w-64 h-screen bg-gradient-to-b from-[#2f3190] to-[#1a1c66] flex flex-col fixed left-0 top-0 shadow-2xl z-40 transition-all duration-500 ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>

                {/* Sidebar Header */}
                <div className="text-center py-6 border-b border-white/10 shrink-0 relative">
                    <div className="absolute top-4 right-4 lg:hidden">
                        <button
                            onClick={() => setIsCollapsed(true)}
                            className="text-white/70 hover:text-white transition-all hover:rotate-90"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <Image
                        src="https://meil.in/sites/default/files/meil_logo_old_update_24.png"
                        alt="MEIL Logo"    // ✅ add this
                        className="bg-amber-50 w-3/4 mx-6 p-3 rounded-md"
                        width={800}
                        height={500}
                    />


                </div>

                {/* User Card */}
                {isLoggedIn && (
                    <div className="px-4 py-3 mt-4 mx-4 bg-white/10 rounded-xl flex items-center gap-3 shrink-0 backdrop-blur-sm border border-white/10 shadow-md transition-all hover:bg-white/15 hover:shadow-lg">
                        <div className="bg-gradient-to-r from-[#7F56D9] to-[#5E35B1] p-2 rounded-full shadow-md transition-all hover:scale-110">
                            <User size={16} className="text-white" />
                        </div>
                        <div className="text-white text-sm">
                            <p className="font-medium">{userName}</p>
                            <p className="text-xs opacity-80">Welcome back!</p>
                        </div>
                    </div>
                )}

                {/* Top Gradient Overlay */}
                {showScrollTop && (
                    <div className="absolute top-28 left-0 right-0 h-8 bg-gradient-to-b from-[#2f3190] to-transparent pointer-events-none z-10" />
                )}

                {/* Navigation */}
                <nav
                    ref={navRef}
                    className="flex-1 mt-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent relative"
                >
                    <ul className="space-y-2 px-4 pb-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden ${isActive
                                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                                            }`}
                                        onMouseEnter={() => setActiveHover(item.name)}
                                        onMouseLeave={() => setActiveHover(null)}
                                    >
                                        <Icon
                                            size={20}
                                            className={`transition-all duration-300 ${isActive
                                                ? "text-white animate-pulse"
                                                : activeHover === item.name
                                                    ? "text-white scale-110"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                        <span className="transition-all duration-300">{item.name}</span>
                                        {isActive && (
                                            <span className="absolute right-3 w-2 h-2 bg-white rounded-full animate-ping"></span>
                                        )}
                                        {!isActive && (
                                            <span className={`absolute right-3 transition-all duration-300 ${activeHover === item.name ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
                                                <ChevronUp size={16} className="rotate-45 transform" />
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Logout Button */}
                        {isLoggedIn && (
                            <li className="sticky bottom-2 bg-gradient-to-t from-[#2f3190] to-transparent pt-4 pb-2 backdrop-blur-sm rounded-xl mt-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 w-full text-left text-gray-200 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20 hover:shadow-lg"
                                >
                                    <LogOut size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    <span className="transition-all duration-300">Logout</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Bottom Gradient Overlay */}
                {showScrollBottom && (
                    <div className="absolute bottom-16 left-0 right-0 h-8 bg-gradient-to-t from-[#2f3190] to-transparent pointer-events-none z-10" />
                )}

                {/* Scroll buttons */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
                    {showScrollTop && (
                        <button
                            onClick={scrollToTop}
                            className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                            aria-label="Scroll to top"
                        >
                            <ChevronUp size={16} className="text-white" />
                        </button>
                    )}
                    {showScrollBottom && (
                        <button
                            onClick={scrollToBottom}
                            className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm hover:scale-110"
                            aria-label="Scroll to bottom"
                        >
                            <ChevronDown size={16} className="text-white" />
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 text-xs text-gray-400 shrink-0 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
                    <div className="flex justify-between items-center">
                        <span>© {new Date().getFullYear()} Admin Dashboard</span>
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-[10px] transition-all hover:bg-red-500/30">v2.0</span>
                    </div>
                    <p className="mt-1 text-[10px] opacity-70 transition-all hover:opacity-100">Enhanced with smooth scrolling</p>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-all duration-500"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
        </>
    );
}
