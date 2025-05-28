import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import FormData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
  }

  try {
    // Check for duplicate email
    const existingEntry = await prisma.waitlist.findFirst({
      where: { email },
    });
    if (existingEntry) {
      return NextResponse.json({ message: 'Already joined waitlist' }, { status: 400 });
    }

    const waitlistEntry = await prisma.waitlist.create({
      data: {
        name,
        email,
      },
    });

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
      });

      try {
        const data = await mg.messages.create("www.chaintrade.network", {
          from: "ChainTrade <postmaster@www.chaintrade.network>",
          to: [`${email}`],
          subject: "🎉 You’re on the list!",
          template: "waitlist",
          "h:X-Mailgun-Variables": JSON.stringify({
            name: `${name}`,
          }),
        });
        console.log(data); // logs response data
      } catch (error) {
        console.log(error); // logs any error
      }

    console.log('Created waitlist entry:', waitlistEntry);

    // TODO: Implement email confirmation (e.g., using nodemailer or a service like SendGrid)
    // For now, log the action
    console.log(`Send confirmation email to ${email} (not implemented)`);

    return NextResponse.json(
      { message: 'Successfully joined waitlist', entry: waitlistEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating waitlist entry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}