import pool from "../../../../../lib/db";
import { NextResponse } from "next/server";



export async function POST(req: { json: () => any; }) {
  const body = await req.json();

  const { title, vendor, startDate, endDate, value, status } = body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query
    const [result] = await connection.execute(
      'INSERT INTO contracts (title, vendor, start_date, end_date, value, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, vendor, startDate, endDate, value, status]
    );

    // Release the connection back to the pool
    connection.release();

    return NextResponse.json({ success: true, message: 'Contract added successfully', result });
  } catch (error) {
    console.error('Error adding contract:', error);
    return NextResponse.json({ success: false, error: 'Failed to add contract' });
  }
}





export async function GET() {
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM contracts";
    const [rows] = await connection.execute(query); // Fetch contracts from the database

    return NextResponse.json({ success: true, contracts: rows }); // Change "programs" to "contracts"
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contracts" });
  }
}




