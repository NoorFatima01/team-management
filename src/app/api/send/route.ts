import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import EmailTemplate from '@/components/welcome-email-template';

import { RESEND_KEY } from '@/constant/env';

const resend = new Resend(RESEND_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json(); //body will contain name and email

    const data = await resend.emails.send({
      from: process.env.RESEND_EMAIL as string,
      to: [body.email],
      subject: 'Welcome to TeamManager!',
      react: EmailTemplate({ userName: body.name }),
    });

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
