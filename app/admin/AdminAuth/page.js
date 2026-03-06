"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    // 🔒 Fixed Admin Credentials
    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "12345"

    const handleSubmit = (e) => {
        e.preventDefault()

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setMessage("Login Successful ✅")
            localStorage.setItem("admin", "true")  // ✅ save login
            router.push("/admin")                  // ✅ redirect
        } else {
            setMessage("Invalid Username or Password ❌")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-700">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Admin Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="block text-blue-700 font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter admin username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-blue-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter admin password"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
                    >
                        Login as Admin
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <p className="text-center mt-4 font-semibold text-sm">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}