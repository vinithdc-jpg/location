"use client"
import Link from "next/link";
import { Compass, LogIn, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLogged(!!localStorage.getItem("user"))
        }
    }, [])

    const handleLogout = async () => {
        try {
            await fetch("/api/Logout", {
                method: "POST",
            })
            // Clear localStorage
            localStorage.removeItem("user")
            setIsLogged(false)
            // Redirect to home page
            router.push("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3 transition-transform hover:scale-105 duration-300"
                    >
                        <div className="bg-gradient-to-tr from-primary to-secondary text-white p-2 rounded-xl shadow-lg">
                            <Compass size={28} />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-secondary">
                            TouristGuide
                        </span>
                    </Link>

                    {/* RIGHT SIDE (Menu + Admin) */}
                    <div className="flex items-center justify-between gap-6">

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-2">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/places">Destinations</NavLink>
                            <NavLink href="/upload">Share Place</NavLink>
                        </div>

                        {/* Sign up / Logout Button */}
                        <div className="hidden md:flex items-center">
                            {isLogged ? (
                                <button
                                    onClick={handleLogout}
                                    className="relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white shadow-xl bg-gradient-to-r from-red-500 to-red-600 hover:to-red-700 transition-all duration-300"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                    <div className="flex items-center gap-2 relative z-10">
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </div>
                                </button>
                            ) : (
                                <Link href="/Signup">
                                    <button className="relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white shadow-xl bg-gradient-to-r from-primary to-blue-600 hover:to-primary transition-all duration-300">
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                                        <div className="flex items-center gap-2 relative z-10">
                                            <LogIn size={18} />
                                            <span>Sign up</span>
                                        </div>
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-full hover:bg-primary/10 transition">
                                <Menu size={28} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children }) {
    return (
        <Link
            href={href}
            className="relative px-4 py-2 font-medium text-slate-600 hover:text-primary transition-colors group"
        >
            {children}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </Link>
    );
}
