import { createConnection } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { participant } = await req.json();
  const programId = parseInt(params.id, 10);

  try {
    const pool = await createConnection();
    const query = `
      INSERT INTO participants (program_id, participant_name)
      VALUES (?, ?)
    `;
    await pool.execute(query, [programId, participant]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json({ success: false, error: "Failed to add participant" });
  }
}
