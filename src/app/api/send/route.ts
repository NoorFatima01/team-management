import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { EmailTemplate } from '@/components/email-template';

import { RESEND_KEY } from '@/constant/env';

const resend = new Resend(RESEND_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['nfatima101204@gmail.com'],
      subject: 'Testing Resend',
      react: EmailTemplate({ firstName: 'John' }),
      text: 'Hello world', // Add the missing 'text' property
    });

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}
