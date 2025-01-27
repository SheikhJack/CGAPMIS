import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db'


export async function POST(req: Response) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );

    return NextResponse.json({ message: 'User registered successfully!', userId: result.insertId });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}




