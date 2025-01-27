import { NextResponse } from "next/server";
import mysql from "../../../../../../lib/db"; 

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Candidate ID is required" }, { status: 400 });
    }

    // Delete the candidate from the database
    const query = `
      DELETE FROM candidates
      WHERE id = ?;
    `;
    const values = [id];

    const [result]: any = await mysql.query(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Candidate removed successfully" });
  } catch (error) {
    console.error("Error removing candidate:", error);
    return NextResponse.json({ error: "Failed to remove candidate" }, { status: 500 });
  }
}
