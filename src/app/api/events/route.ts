import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, image, date, location, speakerIds } = await req.json();

  if (!title || !date) {
    return NextResponse.json({ message: 'Title and date are required' }, { status: 400 });
  }

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        image,
        date: new Date(date),
        location,
        // @ts-ignore
        organizerId: session?.user?.id,
        eventSpeakers: speakerIds
          ? {
              create: speakerIds.map((speakerId: string) => ({
                speaker: { connect: { id: speakerId } },
              })),
            }
          : undefined,
      },
      include: {
        organizer: { select: { name: true, email: true } },
        // @ts-ignore
        eventSpeakers: { include: { speaker: { select: { id: true, name: true, bio: true, image: true, job: true, } } } },
      },
    });

    return NextResponse.json({ message: 'Event created', event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: { select: { name: true, email: true } },
        // @ts-ignore
        eventSpeakers: { include: { speaker: { select: { id: true, name: true, bio: true, image: true, job: true, } } } },
      },
    });

    // Transform to include speakers directly
    const transformedEvents = events.map((event) => ({
      ...event,
      // @ts-ignore
      speakers: event.eventSpeakers.map((es) => es.speaker),
    }));

    return NextResponse.json(transformedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}