import { places } from "@/lib/data";
import { MapPin, Calendar, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// In Next.js App Router, params is a promise or object depending on version, 
// but generally for [id] page it's accessible via props.
export default async function PlaceDetails({ params }) {
    const { id } = await params;
    const place = places.find((p) => p.id === parseInt(id));

    if (!place) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-red-500">Place Not Found</h1>
                <Link href="/places">
                    <Button variant="primary">Back to Places</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Banner Image */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-white text-sm font-semibold mb-3">
                            {place.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{place.name}</h1>
                        <div className="flex items-center text-white/90 text-lg">
                            <MapPin className="w-5 h-5 mr-2" />
                            {place.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-xl shadow-xl border border-border p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">About {place.name}</h2>
                                <p className="text-muted text-lg leading-relaxed">
                                    {place.description}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-xl text-primary mb-4">Visitor Info</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-white p-2 rounded-lg text-primary shadow-sm mr-4">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Best Time to Visit</p>
                                            <p className="text-foreground font-semibold">{place.bestTime || "All year round"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-white p-2 rounded-lg text-primary shadow-sm mr-4">
                                            <Wallet size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Entry Fee</p>
                                            <p className="text-foreground font-semibold">{place.entryFee || "Free"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-lg text-foreground mb-2">Location</h3>
                                <p className="text-muted text-sm mb-4">
                                    {place.location}
                                </p>
                                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                    Map Placeholder
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
