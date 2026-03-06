import Hero from "@/components/Hero";
import PlaceCard from "@/components/PlaceCard";
import { places } from "@/lib/data";

export default function Home() {
  // Filter for featured/approved places, take first 3-4
  const featuredPlaces = places.filter(place => place.status === "Approved").slice(0, 4);

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
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="/places" className="inline-block">
              <button className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                View All Places
              </button>
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
            <button className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-hover hover:scale-105 transition-all">
              Upload a Place
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
