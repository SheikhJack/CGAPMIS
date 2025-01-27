import { ResultSetHeader } from "mysql2";
import pool from "../../../../../lib/db";
import { NextResponse } from "next/server";

interface Service {
    name: string;
    department: string;
    annualCost: number;
    outsourcingCost: number;
    reasons: string;
    impact: string;
    status?: string;
  }

  
  
  export async function POST(req: Request) {
    try {
      // Parse the request body
      const body = await req.json();
      const { name, department, annualCost, outsourcingCost, reasons, impact, status } = body;
  
      // Validate the required fields
      if (!name || !department || !annualCost || !outsourcingCost || !reasons || !impact) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
      }
  
      // Insert data into the database
      const [result]: [ResultSetHeader, any] = await pool.query<ResultSetHeader>(
        "INSERT INTO services (name, department, annual_cost, outsourcing_cost, reasons, impact, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, department, annualCost, outsourcingCost, reasons, impact, status || "Draft"]
      );
  
      // Return success response
      return NextResponse.json(
        {
          message: "Service added successfully.",
          serviceId: result.insertId,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json({ error: "Failed to add service." }, { status: 500 });
    }
  }
  
  export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
  }


  export async function GET() {
    try {
      const connection = await pool.getConnection();
      const query = "SELECT * FROM services";
      const [rows] = await connection.execute(query); // Fetch contracts from the database
  
      return NextResponse.json({ success: true, contracts: rows }); // Change "programs" to "contracts"
    } catch (error) {
      console.error("Error fetching contracts:", error);
      return NextResponse.json({ success: false, error: "Failed to fetch contracts" });
    }
  }
  
