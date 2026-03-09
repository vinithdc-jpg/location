"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import PlaceCard from "@/components/PlaceCard";
import Button from "@/components/ui/Button";

export default function Home() {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPlaces = async () => {
      try {
        const res = await fetch("/api/Upload");
        const data = await res.json();

        // Filter for approved places and take first 4
        const approved = data.filter(place => place.status === "Approved").slice(0, 4);
        setFeaturedPlaces(approved);
      } catch (error) {
        console.error("Failed to fetch featured places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPlaces();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Featured Tourist Places
            </h2>
            <div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Check out some of the most popular and breathtaking destinations curated just for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              // Loading skeleton
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
              ))
            ) : featuredPlaces.length > 0 ? (
              featuredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted text-lg">No approved places available yet</p>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <a href="/places" className="inline-block">
              <Button variant="outline" size="lg">
                View All Places
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Optional: Newsletter or another section to fill space */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Planning a Trip?</h2>
          <p className="text-muted mb-8 text-lg">
            Share your favorite destination with our community and help others discover amazing places.
          </p>
          <a href="/upload">
            <Button variant="primary" size="lg">
              Upload a Place
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
