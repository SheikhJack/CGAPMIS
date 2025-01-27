import pool from "../../../../../lib/db"; // Adjust path to your database connection file

export async function POST(req: Request) {
  const { name, description, members } = await req.json();

  if (!name || !description || !members || members.length === 0) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  try {
    const [boardResult] = await pool.query(
      "INSERT INTO boards (name, description) VALUES (?, ?)",
      [name, description]
    );

    const boardId = boardResult.insertId;

    const memberIds: number[] = [];
    for (const member of members) {
      const [memberResult] = await pool.query(
        "INSERT INTO members (name, role) VALUES (?, ?)",
        [member.name, member.role]
      );
      memberIds.push(memberResult.insertId); 
    }

    for (let i = 0; i < memberIds.length; i++) {
      const member = members[i]; 
      await pool.query(
        "INSERT INTO board_members (board_id, member_id, name) VALUES (?, ?, ?)",
        [boardId, memberIds[i], member.name]  
      );
    }

    return new Response(JSON.stringify({ message: "Board created successfully!" }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating board" }), { status: 500 });
  }
}
