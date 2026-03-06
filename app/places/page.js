"use client";

import { useState, useEffect } from "react";
import PlaceCard from "@/components/PlaceCard";
import { Search } from "lucide-react";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch places from API
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const res = await fetch("/api/Upload");
                const data = await res.json();

                // Show only approved places
                const approved = data.filter(
                    (place) => place.status === "Approved"
                );

                setPlaces(approved);
                setFilteredPlaces(approved);
            } catch (error) {
                console.error("Failed to fetch places:", error);
            }
        };

        fetchPlaces();
    }, []);

    // Search filtering
    useEffect(() => {
        const results = places.filter((place) =>
            place.place_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            place.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredPlaces(results);
    }, [searchTerm, places]);

    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header + Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {searchTerm
                                ? `Search Results for "${searchTerm}"`
                                : "All Tourist Places"}
                        </h1>

                        <p className="text-muted mt-2">
                            Showing {filteredPlaces.length} destination
                            {filteredPlaces.length !== 1 && "s"}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted" />

                        <input
                            type="text"
                            placeholder="Search places..."
                            className="w-full pl-10 pr-3 py-3 border rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Places Grid */}
                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredPlaces.map((place) => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted">
                            No places found matching your search.
                        </p>

                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}