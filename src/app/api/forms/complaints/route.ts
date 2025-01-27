import { ResultSetHeader } from "mysql2";
import  pool  from "../../../../../lib/db"; 
import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { description } = body;

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required and must be a string." }, { status: 400 });
    }

    const [result]: [ResultSetHeader, any] = await pool.query<ResultSetHeader>(
      "INSERT INTO complaints (description, status, created_at) VALUES (?, ?, ?)",
      [description, "Pending", new Date()]
    );

    return NextResponse.json(
      {
        message: "Complaint logged successfully.",
        complaintId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error logging complaint:", error);
    return NextResponse.json({ error: "Failed to log complaint." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}


export async function GET() {
  try {
    const [complaints] = await pool.query("SELECT * FROM complaints");

    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json({ error: "Failed to fetch complaints." }, { status: 500 });
  }
}


