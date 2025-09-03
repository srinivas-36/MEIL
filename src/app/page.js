"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PublicHome() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-white text-gray-900 flex flex-col">
            {/* Enhanced Navbar */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="https://meil.in/sites/default/files/meil_logo_old_update_24.png" className="bg-amber-50 w-2/4 mx-6 p-3 rounded-md" />

                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Pricing
                        </Link>
                        <Link href="/demo" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Demo
                        </Link>
                        <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Contact
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] text-white shadow-md hover:shadow-lg transition-all"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Enhanced Hero Section */}
            <header className="relative flex-1 flex items-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-[#7C4DFF] ring-1 ring-inset ring-blue-100 mb-6">
                        <span className="mr-2">✨</span> Now with AI-powered insights
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 max-w-4xl mx-auto">
                        Streamline Your{" "}
                        <span className="bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] bg-clip-text text-transparent">
                            Material & Approval Workflows
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg lg:text-xl text-gray-600 leading-relaxed">
                        An all-in-one platform for manufacturing and distribution teams to manage inventory,
                        requests, and approvals with enterprise-grade security and efficiency.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                        <Link
                            href="/signup"
                            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="/demo"
                            className="px-7 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Watch Demo
                        </Link>
                    </div>

                    <div className="pt-10">
                        <div className="relative max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-2 border border-gray-100">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#7C4DFF]/20 to-[#00E5FF]/20 blur-sm rounded-xl z-0"></div>
                            <div className="relative bg-white rounded-lg overflow-hidden z-10 h-64 flex items-center justify-center">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">MDM Portal Dashboard</h3>
                                    <p className="text-sm text-gray-500 mt-2">Interactive preview of the professional dashboard</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Logo Cloud Section */}
            <section className="py-16 bg-gray-50 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">Trusted by industry leaders</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 w-12 md:h-16 md:w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400 font-medium text-xs">Logo {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900">Powerful features for modern operations</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Everything you need to streamline material management and approval processes in one secure platform.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Smart Approval Workflows",
                                desc: "Customizable multi-stage approvals with role-based permissions and complete audit trails.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                color: "from-purple-500 to-blue-500"
                            },
                            {
                                title: "Real-Time Inventory Management",
                                desc: "Track stock levels, receive smart reorder alerts, and optimize inventory across locations.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                ),
                                color: "from-green-500 to-teal-500"
                            },
                            {
                                title: "Seamless Integrations",
                                desc: "Connect with your existing tools through CSV imports/exports and powerful API access.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                                color: "from-orange-500 to-red-500"
                            },
                            {
                                title: "Advanced Reporting",
                                desc: "Generate detailed reports on inventory, approvals, and operational efficiency.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                color: "from-blue-500 to-indigo-500"
                            },
                            {
                                title: "Role-Based Access Control",
                                desc: "Granular permissions ensure users only see and interact with what they need.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                color: "from-indigo-500 to-purple-500"
                            },
                            {
                                title: "Mobile Accessibility",
                                desc: "Manage approvals and check inventory from anywhere with our mobile-responsive design.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                color: "from-pink-500 to-rose-500"
                            }
                        ].map((f, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${f.color} text-white mb-4`}>
                                    {f.icon}
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-[#7C4DFF] transition-colors">{f.title}</h3>
                                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900">Loved by operations teams</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            See what professionals in manufacturing and distribution are saying about MDM Portal.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                quote: "Reduced our approval times by 70%. The workflow automation has been a game-changer for our manufacturing operations.",
                                name: "Sarah Johnson",
                                title: "Operations Director, TechManufacture Inc.",
                                avatar: "SJ"
                            },
                            {
                                quote: "The inventory insights have saved us thousands in carrying costs. The AI-powered recommendations are incredibly accurate.",
                                name: "Michael Chen",
                                title: "Supply Chain Manager, Global Parts Co.",
                                avatar: "MC"
                            },
                            {
                                quote: "Implementation was seamless with our existing systems. The API documentation is some of the best I've worked with.",
                                name: "David Wilson",
                                title: "IT Director, Prime Distributors",
                                avatar: "DW"
                            }
                        ].map((t, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] rounded-full text-white font-medium">
                                        {t.avatar}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">{t.name}</h4>
                                        <p className="text-sm text-gray-500">{t.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"{t.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Call to Action */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-gradient-to-br from-[#7C4DFF]/10 to-[#00E5FF]/10 p-8 rounded-2xl border border-[#7C4DFF]/20">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Ready to transform your{" "}
                            <span className="bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] bg-clip-text text-transparent">
                                operations?
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Join thousands of manufacturing and distribution professionals who use MDM Portal to streamline their workflows.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/signup"
                                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Start Free Trial
                            </Link>
                            <Link
                                href="/contact"
                                className="px-7 py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all"
                            >
                                Contact Sales
                            </Link>
                        </div>
                        <p className="text-xs text-gray-500 mt-6">No credit card required. 14-day free trial.</p>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="border-t border-gray-200 bg-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">M</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">MDM Portal</span>
                            </Link>
                            <p className="text-gray-600 max-w-xs">
                                Streamlining material and approval workflows for modern manufacturing and distribution teams.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link></li>
                                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link></li>
                                <li><Link href="/integrations" className="text-gray-600 hover:text-gray-900 transition-colors">Integrations</Link></li>
                                <li><Link href="/updates" className="text-gray-600 hover:text-gray-900 transition-colors">Updates</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
                                <li><Link href="/documentation" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</Link></li>
                                <li><Link href="/guides" className="text-gray-600 hover:text-gray-900 transition-colors">Guides</Link></li>
                                <li><Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">Support</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link></li>
                                <li><Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
                                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link></li>
                                <li><Link href="/legal" className="text-gray-600 hover:text-gray-900 transition-colors">Legal</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MDM Portal. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}