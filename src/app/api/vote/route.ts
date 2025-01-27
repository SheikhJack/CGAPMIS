import { NextResponse } from "next/server";
import mysql from "../../../../lib/db"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Body received:", body);

    if (!body.candidateId) {
      return NextResponse.json({ error: "Candidate ID is required" }, { status: 400 });
    }

    const candidateId = body.candidateId;

    const query = `
      INSERT INTO votes (candidate_id, voted_at) 
      VALUES (?, NOW());
    `;
    const values = [candidateId];

    await mysql.query(query, values);

    return NextResponse.json({ message: "Vote submitted successfully" });
  } catch (error) {
    console.error("Error submitting vote:", error);
    return NextResponse.json({ error: "Failed to submit vote" }, { status: 500 });
  }
}
