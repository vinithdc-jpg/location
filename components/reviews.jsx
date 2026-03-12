"use client"

import { useState, useMemo } from "react"

const dummyReviews = [
    { user: "Rahul", comment: "Beautiful place! Highly recommended.", rating: 5 },
    { user: "Priya", comment: "Very peaceful and clean environment.", rating: 4 },
    { user: "Arjun", comment: "Great place for photography.", rating: 5 },
    { user: "Ananya", comment: "Amazing view and great atmosphere.", rating: 5 },
    { user: "Vikram", comment: "Perfect spot for a weekend trip.", rating: 4 }
]

export default function ReviewSection() {
    const [showAll, setShowAll] = useState(false)

    // Calculate overall average rating
    const overallRating = useMemo(() => {
        const total = dummyReviews.reduce((sum, review) => sum + review.rating, 0)
        return (total / dummyReviews.length).toFixed(1)
    }, [])

    // Generate star display
    const generateStars = (rating) => {
        return "⭐".repeat(rating)
    }

    // Show max 2 reviews initially, all when expanded
    const displayedReviews = showAll ? dummyReviews : dummyReviews.slice(0, 2)

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Visitor Reviews</h2>

            {/* Overall Rating Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-gray-800">{overallRating}</div>
                    <div>
                        <div className="text-xl text-yellow-500">
                            {generateStars(Math.round(overallRating))}
                        </div>
                        <p className="text-sm text-gray-600">Based on {dummyReviews.length} reviews</p>
                    </div>
                </div>
            </div>

            {/* Reviews Container with overflow hidden */}
            <div className={`space-y-4 ${!showAll ? 'max-h-80 overflow-hidden' : ''}`}>
                {displayedReviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">{review.user}</h4>
                            <span className="text-yellow-500">
                                {generateStars(review.rating)}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>

            {/* View All Reviews Button */}
            {!showAll && dummyReviews.length > 2 && (
                <button
                    onClick={() => setShowAll(true)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    View All {dummyReviews.length} Reviews
                </button>
            )}

            {/* Hide Reviews Button */}
            {showAll && (
                <button
                    onClick={() => setShowAll(false)}
                    className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Show Less
                </button>
            )}
        </div>
    )
}