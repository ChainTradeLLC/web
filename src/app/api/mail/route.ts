import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/app/lib/prisma';
import FormData from "form-data";
import Mailgun from "mailgun.js";
import moment from 'moment';
import { createEvent } from 'ics';

export async function POST(req: NextRequest) {
    function dateArray(iso: string) {
        const d = new Date(iso);
        return [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];
      }
    
      const even = {
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
        url: `https://us06web.zoom.us/j/89804950427`,
        uid: `onyedika@chaintrade.network`,
      });

    const icsBuf: Buffer = Buffer.from(value || '');

  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY || "MAILGUN_API_KEY",
      });

      try {
        const data = await mg.messages.create("www.chaintrade.network", {
          from: "ChainTrade <postmaster@www.chaintrade.network>",
          to: [`onyedika@chaintrade.africa`],
          bcc: [`alandoleon664@gmail.com`, `edwordkaso100@gmail.com`, `esilva3946@gmail.com`],
          subject: "Thank You for Attending Scaling Intra-African Trade Webinar",
          template: "webinar",
          "h:X-Mailgun-Variables": JSON.stringify({}),
        });
        console.log(data);
        console.log(icsBuf);
      } catch (error) {
        console.log(error);
      }

    return NextResponse.json(
      { message: 'Newsletter sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating waitlist entry:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}