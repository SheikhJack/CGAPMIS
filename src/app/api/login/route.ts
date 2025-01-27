import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';


export async function POST(req: NextRequest) {
    try {
      const { email, password } = await req.json(); // Parse the JSON body
  
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }
  
      const [rows]: any = await pool.execute(
        'SELECT id, name FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
  
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
      }
  
      const user = rows[0];
      return NextResponse.json({
        message: 'Login successful!',
        user: { id: user.id, name: user.name },
      });
    } catch (error) {
      console.error('Error during login:', error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }