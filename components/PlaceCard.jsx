import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PlaceCard({ place }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border flex flex-col h-full transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
                {place.image_url ? (
                    <Image
                        src={place.image_url}
                        alt={place.place_name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {place.category || 'Tourist Spot'}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {place.place_name}
                    </h3>
                    <div className="flex items-center text-muted text-sm mb-3">
                        <MapPin size={16} className="mr-1 text-secondary" />
                        {place.location}
                    </div>
                    <p className="text-muted text-sm line-clamp-2 mb-4">
                        {place.description}
                    </p>
                </div>

                <Link href={`/places/${place.id}`}>
                    <Button variant="secondary" size="md" className="w-full">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
