// /pages/api/updateProfile.ts

import { NextResponse } from 'next/server';
import pool from '../../../../lib/db'; // Assuming you already have a configured MySQL connection pool

interface FormData {
  name: string;
  position: string;
  age: string;
  contactNumber: string;
  email: string;
  about: string;
  coverImage: Blob | null;
  profileImage: Blob | null;
}

// Extract the userId from session or token if needed (pseudo-code)
const getUserIdFromSession = () => {
  // You can implement your own logic to fetch the userId (from session, JWT, etc.)
  return 1; // For example, returning a mock userId for now.
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData(); // Extract FormData from the request
    
    // Extracting data from the form
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const age = formData.get('age') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const email = formData.get('email') as string;
    const about = formData.get('about') as string;
    const coverImage = formData.get('coverImage') as File | null;
    const profileImage = formData.get('profileImage') as File | null;

    // Ensure that all required fields are present
    if (!name || !position || !age || !contactNumber || !email) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Implement file handling and storage logic here (if necessary)

    const userId = getUserIdFromSession(); // You need to handle this method to fetch user ID

    // Update the profile in the database
    const query = `
      UPDATE profiles SET 
        name = ?, 
        position = ?, 
        age = ?, 
        contactNumber = ?, 
        email = ?, 
        about = ?, 
        coverImage = ?, 
        profileImage = ? 
      WHERE userId = ?`;

    const values = [
      name, 
      position, 
      age, 
      contactNumber, 
      email, 
      about, 
      coverImage ? coverImage.name : null, // Save image name or URL here, not the file itself
      profileImage ? profileImage.name : null, // Same as above
      userId, // Assuming userId is fetched from session or token
    ];

    // Use the connection pool to execute the query
    const [result] = await pool.query(query, values);

    // Correctly access affectedRows from the result
    if ((result as any).affectedRows > 0) {
      return NextResponse.json({ message: 'Profile updated successfully' });
    } else {
      return NextResponse.json({ message: 'Profile update failed' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}



