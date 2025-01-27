import pool from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { participant } = await req.json();

    // Validate input
    if (!participant || typeof participant !== "string") {
      return NextResponse.json({ success: false, error: "Participant name is required and must be a string." }, { status: 400 });
    }

    // Extract program ID from request URL
    const url = new URL(req.url);
    const programId = parseInt(url.searchParams.get("id") || "", 10);

    if (isNaN(programId)) {
      return NextResponse.json({ success: false, error: "Invalid program ID." }, { status: 400 });
    }

    // Insert into database
    const connection = await pool.getConnection();
    try {
      const query = `
        INSERT INTO participants (program_id, participant_name)
        VALUES (?, ?)
      `;
      await connection.execute(query, [programId, participant]);
    } finally {
      // Ensure the connection is released
      connection.release();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json({ success: false, error: "Failed to add participant." }, { status: 500 });
  }
}
