import { createConnection } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: { json: () => any; }) {
  const body = await req.json();
  const { title, facilitator, date, location } = body;

  try {
    const pool = await createConnection();
    const query = `
      INSERT INTO programs (title, facilitator, date, location)
      VALUES (?, ?, ?, ?)
    `;
    const values = [title, facilitator, date, location];

    await pool.execute(query, values);

    return NextResponse.json({ success: true, message: "Program added successfully" });
  } catch (error) {
    console.error("Error adding program:", error);
    return NextResponse.json({ success: false, error: "Failed to add program" });
  }
}

export async function GET() {
  try {
    const pool = await createConnection();
    const query = "SELECT * FROM programs";
    const [rows] = await pool.execute(query);


    return NextResponse.json({ success: true, programs: rows });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch programs" });
  }
}
