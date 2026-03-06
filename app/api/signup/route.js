import pool from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      )
    }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert user
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    )

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}