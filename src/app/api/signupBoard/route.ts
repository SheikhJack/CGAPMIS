import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db'
import { ResultSetHeader } from 'mysql2';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const [result]: [ResultSetHeader, any] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users_board (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return NextResponse.json({ message: 'User registered successfully!', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}