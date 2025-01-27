import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../lib/db';



export async function POST(req: NextRequest) {
    try {
      const { email, password, code } = await req.json();  
  
      // 1. Validate code - must be 10 digits and provided
      if (!code) {
        return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
      }
      
      if (code.length !== 10) {  // Check if code is exactly 10 digits
        return NextResponse.json({ error: 'Code must be exactly 10 digits long.' }, { status: 400 });
      }
  
      // Check if the code is valid in the code_admin table
      let [codeAdminRows]: any = await pool.execute(
        'SELECT id FROM code_admin WHERE code = ?',
        [code]
      );
  
      if (codeAdminRows.length === 0) {
        return NextResponse.json({ error: 'Invalid code.' }, { status: 401 });
      }
  
      // 2. Validate email and password if code is valid
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
      }
  
      // Validate email format (simple check)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
      }
  
      // Validate password length (at least 6 characters)
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
      }
  
      // Check email and password in users_admin table
      let [userRows]: any = await pool.execute(
        'SELECT id, name FROM users_admin WHERE email = ? AND password = ?',
        [email, password]
      );
  
      if (userRows.length === 0) {
        return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
      }
  
      // If code and email/password are valid, return success
      const user = userRows[0];
      return NextResponse.json({
        message: 'Code validated and login successful!',
        user: { id: user.id, name: user.name },
      });
  
    } catch (error) {
      console.error('Error during validation:', error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }

  

// export async function POST(req: NextRequest) {
//     try {
//       const { email, password, code } = await req.json();  
  
//       // Check if code is provided and valid (exactly 10 digits)
//       if (code) {
//         if (code.length !== 10) {  // Reject if the code is not 10 digits
//           return NextResponse.json({ error: 'Code must be exactly 10 digits long.' }, { status: 400 });
//         }
  
//         // Check the code in code_admin table
//         let [codeAdminRows]: any = await pool.execute(
//           'SELECT id, name FROM code_admin WHERE code = ?',
//           [code]
//         );
  
//         // If code is not found in code_admin, return an error
//         if (codeAdminRows.length === 0) {
//           return NextResponse.json({ error: 'Invalid code.' }, { status: 401 });
//         }
  
//         // If code is found, return a success message
//         const user = codeAdminRows[0];  // Assume the first matching row contains the user data
//         return NextResponse.json({
//           message: 'Code validated successfully!',
//           user: { id: user.id, name: user.name },
//         });
//       }
  
//       // If no code is provided, return an error
//     //   return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
  
      
  
//       let [userRows]: any = await pool.execute(
//         'SELECT id, name FROM users_admin WHERE email = ? AND password = ?',
//         [email, password]
//       );
  
//       if (userRows.length === 0) {
//         return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
//       }
  
//       const user = userRows[0];  
//       return NextResponse.json({
//         message: 'Login successful!',
//         user: { id: user.id, name: user.name },
//       });
  
//     } catch (error) {
//       console.error('Error during validation:', error);
//       return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
//     }
//   }
  