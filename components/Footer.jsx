import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            TouristGuide
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                            Discover the beauty of the world with our curated easy-to-use travel guide. Join us in exploring amazing destinations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-foreground font-semibold">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/places" className="hover:text-primary transition-colors">Destinations</Link></li>
                            <li><Link href="/upload" className="hover:text-primary transition-colors">Upload Place</Link></li>
                            <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-foreground font-semibold">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>contact@touristguide.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Travel Lane, Adventure City</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-foreground font-semibold">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-100 rounded-full text-muted hover:text-primary hover:bg-blue-50 transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full text-muted hover:text-primary hover:bg-blue-50 transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full text-muted hover:text-primary hover:bg-blue-50 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 rounded-full text-muted hover:text-primary hover:bg-blue-50 transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted">
                    <p>&copy; {new Date().getFullYear()} TouristGuide. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
