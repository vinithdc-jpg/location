"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                    alt="Beautiful Beach"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">

                {/* Typing Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mx-auto w-fit">
                    <span className="typing-text block">
                        Discover Amazing Places
                    </span>
                </h1>

                {/* Subtitle fade-in */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                    className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
                >
                    Explore the world's hidden gems and plan your next adventure with ease.
                </motion.p>

                {/* Search Bar slide from bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8, duration: 0.9, ease: "easeOut" }}
                    className="bg-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto"
                >
                    <div className="flex-1 flex items-center px-4 w-full">
                        <Search className="text-muted w-5 h-5 mr-3" />
                        <input
                            type="text"
                            placeholder="Enter city or region (e.g., Goa)"
                            className="w-full py-3 outline-none bg-transparent"
                        />
                    </div>

                    <Link href="/places" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-secondary text-white px-8 py-3 rounded-full font-medium hover:bg-secondary-hover transition shadow-lg">
                            Search
                        </button>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
