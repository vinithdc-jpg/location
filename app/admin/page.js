"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from "next/navigation"
import Button from '@/components/ui/Button'

export default function AdminPage() {
    const router = useRouter()

    const [places, setPlaces] = useState([])
    const [approvedCount, setApprovedCount] = useState(0)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("admin")

        if (!isLoggedIn) {
            router.replace("/admin/AdminAuth")
            return
        }

        fetch("/api/Upload")
            .then(res => res.json())
            .then(data => {
                console.log("Places data:", data)
                setPlaces(data || [])
            })
            .catch(err => console.error("Fetch error:", err))
    }, [router])  // ✅ Added router dependency

    const handleAction = useCallback(async (id, action) => {
        const newStatus = action === "approve" ? "Approved" : "Rejected"

        await fetch(`/api/Upload/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        })

        if (action === "approve") {
            setApprovedCount(prev => prev + 1)
        }

        // Update status instead of removing row
        setPlaces(prev =>
            prev.map(place =>
                place.id === id ? { ...place, status: newStatus } : place
            )
        )

    }, [])

    const deleteHandle = useCallback(async (id) => {
        try {
            const res = await fetch(`/api/Upload/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) {
                throw new Error("Failed to delete place")
            }

            // Update UI (remove item from state)
            setPlaces((prev) => prev.filter((place) => place.id !== id))

        } catch (error) {
            console.error(error)
            alert("Something went wrong while deleting")
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            {/* Header */}
            <div className="mb-8 w-[90vw] m-auto flex justify-center items-center flex-col">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Manage and review submitted places</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-[88vw] m-auto">

                {/* Total Places */}
                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Total Places</p>
                            <p className="text-2xl font-semibold text-gray-800">
                                {places.length}
                            </p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            📍
                        </div>
                    </div>
                </div>

                {/* Approved */}
                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Approved</p>
                            <p className="text-2xl font-semibold text-green-600">
                                {places.filter(p => p.status === "Approved").length}
                            </p>
                        </div>
                        <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                            ✔
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Pending</p>
                            <p className="text-2xl font-semibold text-yellow-500">
                                {places.filter(p => p.status === "Pending").length}
                            </p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                            ⏳
                        </div>
                    </div>
                </div>

            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 w-[85vw] m-auto">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <h2 className="text-xl font-semibold text-white">Places List</h2>
                </div>

                {/* Table */}
                {places.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No places submitted yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Place</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {places.map((place) => (
                                    <tr key={place.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors duration-200">
                                        {/* Place with Image */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={place.image_url}
                                                        alt={place.place_name}
                                                        className="w-14 h-14 rounded-lg object-cover shadow-md border border-gray-200"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{place.place_name}</p>
                                                    <p className="text-xs text-gray-500 mt-1">ID: {place.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="px-6 py-4">
                                            <p className="text-gray-700">{place.location}</p>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide
                        ${place.status === "Approved"
                                                            ? "bg-green-100 text-green-700 border border-green-300"
                                                            : place.status === "Rejected"
                                                                ? "bg-red-100 text-red-700 border border-red-300"
                                                                : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                                        }`}
                                                >
                                                    {place.status}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3">
                                                <Button
                                                    onClick={() => handleAction(place.id, "approve")}
                                                    variant="success"
                                                    size="sm"
                                                    disabled={place.status === "Approved"}
                                                    className="hover:shadow-md transition-shadow"
                                                >
                                                    ✓ Approve
                                                </Button>

                                                <Button
                                                    onClick={() => handleAction(place.id, "reject")}
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={place.status === "Rejected"}
                                                    className="hover:shadow-md transition-shadow"
                                                >
                                                    ✕ Reject
                                                </Button>

                                                <Button
                                                    onClick={() => deleteHandle(place.id)}
                                                    variant="danger"
                                                    size="sm"
                                                    className="hover:shadow-md transition-shadow"
                                                >
                                                    🗑 Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}