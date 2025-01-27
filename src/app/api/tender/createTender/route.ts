import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { FormData } from 'formdata-node'; 

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmail = async (data: any, file: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'kealebogakido@gmail.com', 
    subject: 'New Tender Application',
    text: `Tender Application from ${data.name}\n\nContact Info: ${data.contactInfo}\nCover Letter: ${data.coverLetter}`,
    attachments: [
      {
        filename: file.name,
        content: file.buffer, 
        encoding: 'base64',
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};

export async function POST(req: NextRequest) {

  
  try {
  console.log("Received request:", req);
    const formData = await req.formData();
    const name = formData.get('name');
    const contactInfo = formData.get('contactInfo');
    const coverLetter = formData.get('coverLetter');
    const pdfFile = formData.get('pdfFile') as File;

    console.log("Form data received:", { name, contactInfo, coverLetter, pdfFile });

    if (!name || !contactInfo || !coverLetter || !pdfFile) {
      return NextResponse.json({ error: 'All fields are required!' }, { status: 400 });
    }

    await sendEmail({ name, contactInfo, coverLetter }, pdfFile);

    return NextResponse.json({ message: 'Tender application submitted successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error sending the email. Please try again later.' }, { status: 500 });
  }
}
