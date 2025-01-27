
import { NextResponse } from 'next/server';
import  pool  from '../../../../../lib/db'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, education, experience, contact } = body;

    if (!name || !education || !experience || !contact) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const connection = await pool.getConnection();

    const query = `
      INSERT INTO candidates (name, education, experience, contact)
      VALUES (?, ?, ?, ?)
    `;
    const values = [name, education, experience, contact];

    await connection.execute(query, values);

    return NextResponse.json({ success: true, message: "Candidacy submitted successfully" });
  } catch (error) {
    console.error("Error submitting candidacy:", error);
    return NextResponse.json({ success: false, error: "Failed to submit candidacy" }, { status: 500 });
  }
}

export async function GET(req: Response) {
  const connection = await pool.getConnection();
  
  try {
    const [rows] = await connection.execute('SELECT name, education, experience, contact FROM candidates');
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch candidates' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    connection.release();
  }
}
