import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/db";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
      const { userId } = params;
  
      // Validate userId
      if (!userId) {
        return NextResponse.json(
          { error: "User ID is required" },
          { status: 400 }
        );
      }
  
      // Query the database to get the profile
      const query = `
        SELECT userId, name, position, age, contactNumber, email, about, coverImage, profileImage
        FROM profiles
        WHERE userId = ?;
      `;
      // Specify the result type as RowDataPacket[]
      const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);
  
      // Ensure rows is properly checked for results
      if (rows.length === 0) {
        return Response.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
  
      // Return the profile
      return Response.json({ profile: rows[0] });
    } catch (error) {
      console.error("Error fetching profile:", error);
      return Response.json(
        { error: "Failed to fetch profile" },
        { status: 500 }
      );
    }
  }