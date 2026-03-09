"use client";

import { useEffect, useState } from "react";
import { Upload as UploadIcon, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function UploadPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        place_name: "",
        location: "",
        category: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Protect route
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("user");
        if (!isLoggedIn) router.replace("/Signup");
    }, [router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("place_name", formData.place_name);
        data.append("location", formData.location);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("image", image);

        try {
            const res = await fetch("/api/Upload", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("Upload failed");

            setSubmitted(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle size={40} />
                    </div>

                    <h2 className="text-2xl font-bold">Submission Received!</h2>

                    <p>Your place has been sent for admin approval.</p>

                    <Button
                        onClick={() => setSubmitted(false)}
                        className="w-full"
                    >
                        Submit Another Place
                    </Button>

                    <a href="/" className="text-primary underline text-sm">
                        Return to Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold text-center mb-10">
                    Submit a Tourist Place
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow">

                    <input
                        type="text"
                        name="place_name"
                        placeholder="Place Name"
                        value={formData.place_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                        <option value="">Select Category</option>
                        <option value="Beach">Beach</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Historical">Historical</option>
                        <option value="Nature">Nature</option>
                    </select>

                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border border-border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />

                    <div>
                        <label className="block mb-2 font-medium text-foreground">Upload Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="w-full border border-border p-2 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all"
                        />
                    </div>

                    <Button type="submit" variant="success" className="w-full">
                        Submit for Approval
                    </Button>

                </form>
            </div>
        </div>
    );
}