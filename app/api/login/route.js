import pool from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // 1️⃣ Check if user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if (userResult.rows.length === 0) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    const user = userResult.rows[0]

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return Response.json(
        { message: "Invalid password" },
        { status: 401 }
      )
    }

    // 3️⃣ Login success
    return Response.json(
      { message: "Login successful", user: { id: user.id, email: user.email, username: user.username } },
      { status: 200 }
    )

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}