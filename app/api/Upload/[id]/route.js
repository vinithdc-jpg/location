import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    const { id } = await params  
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const result = await pool.query(
      "SELECT * FROM travel_places WHERE id = $1",
      [id]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const body = await req.json()
    const { place_name, location, category, description, image_url, status } = body

    // Build dynamic update query based on what fields are provided
    const updates = []
    const values = []
    let paramIndex = 1

    if (place_name !== undefined) {
      updates.push(`place_name = $${paramIndex}`)
      values.push(place_name)
      paramIndex++
    }
    if (location !== undefined) {
      updates.push(`location = $${paramIndex}`)
      values.push(location)
      paramIndex++
    }
    if (category !== undefined) {
      updates.push(`category = $${paramIndex}`)
      values.push(category)
      paramIndex++
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex}`)
      values.push(description)
      paramIndex++
    }
    if (image_url !== undefined) {
      updates.push(`image_url = $${paramIndex}`)
      values.push(image_url)
      paramIndex++
    }
    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`)
      values.push(status)
      paramIndex++
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 })
    }

    values.push(id)
    const query = `UPDATE travel_places SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const result = await pool.query(
      "DELETE FROM travel_places WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Place not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Place deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}