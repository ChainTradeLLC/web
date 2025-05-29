import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/app/lib/prisma';
import { createEvent } from 'ics';
import FormData from "form-data";
import Mailgun from "mailgun.js";
import moment from 'moment';


// Simple in-memory rate limiter
const registrationCounts: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMIT = 5; // Max registrations per IP per hour
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  if (!registrationCounts[ip] || registrationCounts[ip].resetTime < now) {
    registrationCounts[ip] = { count: 0, resetTime: now + WINDOW_MS };
  }

  if (registrationCounts[ip].count >= RATE_LIMIT) {
    return NextResponse.json({ message: 'Too many registrations, try again later' }, { status: 429 });
  }

  const { name, email } = await req.json();
  const { eventId } = await params;

  if (!name || !email) {
    return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
  }

  function dateArray(iso: string) {
    const d = new Date(iso);
    return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
  }

  const even = {
    id: `${eventId}`,
    slug: 'scaling-intra-african-trade-2025',
    title: 'Scaling Intra-African Trade Challenges, Innovations, and Solutions',
    description:
      'Exploring practical pathways to boost trade within Africa, moving beyond policy frameworks like AfCFTA to spotlight real-world innovation and action.',
    location: `Zoom Webinar (link) · https://us06web.zoom.us/j/89804950427`,
  
    start: '2025-06-12T16:00:00Z',
    end:   '2025-06-12T17:00:00Z',
  
    datePretty: 'Thu · 12 Jun 2025 · 5:00 PM – 6:00 PM WAT',
  }
  
  const [y, m, d, hh, mm] = dateArray(even.start);
  const [y2, m2, d2, hh2, mm2] = dateArray(even.end ?? even.start);

  const { value } = createEvent({
    title: even.title,
    description: even.description,
    location: even.location,
    start: [y, m, d, hh, mm],
    end: [y2, m2, d2, hh2, mm2],
    url: `https://chaintrade.africa/events/${even.id}`,
    uid: `${even.id}@chaintrade.network`,
  });

//   if ( value !== undefined ) {
//     const icsBuf: Buffer = Buffer.from(value);
//   }
// console.log(value);

const icsBuf: Buffer = Buffer.from(value || '');
// console.log(icsBuf);

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: { email, eventId },
    });
    if (existingRegistration) {
      return NextResponse.json({ message: 'You are already registered for this event' }, { status: 409 });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        name,
        email,
        eventId,
      },
    });

    registrationCounts[ip].count += 1;

    const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
          });
    
          try {
            const data = await mg.messages.create("www.chaintrade.network", {
              from: "ChainTrade <postmaster@www.chaintrade.network>",
              to: [`${email}`],
              subject: `Your seat for ${even.title} is confirmed—details inside`,
              template: "event",
              "h:X-Mailgun-Variables": JSON.stringify({
                name: `${name}`,
                eventName: `${event.title}`,
                eventDatePretty: `${moment(even.start).format("llll")} (WAT)`,
                eventLocation: `${even.location}`,
              }),
              attachment: [
                {
                  data: icsBuf,
                  filename: `${even.slug}.ics`,
                  contentType: 'text/calendar',
                },
              ],
            });
            console.log(data);
            console.log(icsBuf);
          } catch (error) {
            console.log(error);
          }

    return NextResponse.json({ message: 'Registered successfully', registration }, { status: 201 });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}