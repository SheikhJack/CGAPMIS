import pool from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { title, department, budget, startDate, endDate, status } = body;
  
      if (!title || !department || !budget || !startDate || !endDate || !status) {
        return new Response(JSON.stringify({ success: false, message: "All fields are required." }), {
          status: 400,
        });
      }
  
      const connection = await pool.getConnection();
      const query = `
        INSERT INTO outsourcing (title, department, budget, start_date, end_date, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await connection.execute(query, [title, department, budget, startDate, endDate, status]);
      await connection.release();
  
      return new Response(JSON.stringify({ success: true, message: "Project added successfully!" }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error adding project:", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to add project." }), {
        status: 500,
      });
    }
  }


  export async function GET() {
    try {
      const connection = await pool.getConnection();
      const query = "SELECT * FROM outSourcing";
      const [rows] = await connection.execute(query); // Fetch contracts from the database
  
      return NextResponse.json({ success: true, contracts: rows }); // Change "programs" to "contracts"
    } catch (error) {
      console.error("Error fetching contracts:", error);
      return NextResponse.json({ success: false, error: "Failed to fetch contracts" });
    }
  }
  