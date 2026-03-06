import pool from "@/lib/db"
import { NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

export const runtime = "nodejs"

export async function POST(req) {
  try {
    const formData = await req.formData()

    const place_name = formData.get("place_name")
    const location = formData.get("location")
    const category = formData.get("category")
    const description = formData.get("description")
    const image = formData.get("image")

    if (!image) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique file name
    const fileName = `${Date.now()}-${image.name}`

    // Upload path
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName)

    // Save file
    await fs.writeFile(uploadPath, buffer)

    // URL to store in DB
    const image_url = `/uploads/${fileName}`

    // Insert into database
    const result = await pool.query(
      `INSERT INTO travel_places
      (place_name, location, category, description, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [place_name, location, category, description, image_url]
    )

    return NextResponse.json(result.rows[0], { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM travel_places ORDER BY created_at DESC"
    )

    return NextResponse.json(result.rows)

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}