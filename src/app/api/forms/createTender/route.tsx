import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const { title, description, deadline, budget, criteria } = await req.json();

    if (!title || !description || !deadline || !budget || !criteria) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (isNaN(budget)) {
      return NextResponse.json({ error: 'Budget must be a valid number.' }, { status: 400 });
    }

    const parsedDeadline = Date.parse(deadline);
    if (isNaN(parsedDeadline)) {
      return NextResponse.json({ error: 'Invalid deadline format.' }, { status: 400 });
    }

    const query = `
      INSERT INTO create_tender (title, description, deadline, budget, criteria)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [title, description, deadline, budget, criteria];

    const [result]: [ResultSetHeader, any] = await pool.query<ResultSetHeader>(query, values);

    return NextResponse.json(
      { message: 'Tender created successfully.', tenderId: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to insert tender into the database.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = 'SELECT * FROM create_tender';
    const [results]: [RowDataPacket[], any] = await pool.query<RowDataPacket[]>(query);

    // Check if any tenders exist
    if (results.length === 0) {
      return NextResponse.json({ message: 'No tenders found.' }, { status: 404 });
    }

    return NextResponse.json({ tenders: results }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch tenders from the database.' },
      { status: 500 }
    );
  }
}
