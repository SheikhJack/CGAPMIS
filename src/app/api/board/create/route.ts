import { ResultSetHeader } from "mysql2";
import pool from "../../../../../lib/db"; // Adjust path to your database connection file

export async function POST(req: Request) {
  const { name, description, members } = await req.json();

  if (!name || !description || !members || members.length === 0) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  try {
    // Insert board
    const [boardResult] = await pool.query<ResultSetHeader>(
      "INSERT INTO boards (name, description) VALUES (?, ?)",
      [name, description]
    );

    const boardId = boardResult.insertId; // Extract the insertId from the result

    // Insert members and collect their insertIds
    const memberIds: number[] = [];
    for (const member of members) {
      const [memberResult] = await pool.query<ResultSetHeader>(
        "INSERT INTO members (name, role) VALUES (?, ?)",
        [member.name, member.role]
      );
      memberIds.push(memberResult.insertId); // Add member insertId to the array
    }

    // Insert board-member associations
    for (let i = 0; i < memberIds.length; i++) {
      const member = members[i];
      await pool.query(
        "INSERT INTO board_members (board_id, member_id, name) VALUES (?, ?, ?)",
        [boardId, memberIds[i], member.name]  // Use boardId here
      );
    }

    return new Response(JSON.stringify({ message: "Board created successfully!" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating board" }), { status: 500 });
  }
}