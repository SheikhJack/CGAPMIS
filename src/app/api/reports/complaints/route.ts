import { NextResponse } from "next/server";
import pool from '../../../../../lib/db'


export async function GET() {
    try {
      // Adjusted query based on your table structure
      const query = `
        SELECT 
          id, 
          description, 
          status, 
          created_at, 
          officer
        FROM complaints 
        WHERE status = 'Resolved'
      `;
      const [rows] = await pool.query(query);
  
      return NextResponse.json(rows, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching complaints:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch resolved complaints." },
        { status: 500 }
      );
    }
  }
