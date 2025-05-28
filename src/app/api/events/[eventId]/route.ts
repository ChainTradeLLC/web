import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// @ts-ignore
export async function GET(req: Request, { params }: { params: Promise<{ eventId: string }> }) {
    const { eventId } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: { select: { name: true, email: true } },
        eventSpeakers: { include: { speaker: { select: { id: true, name: true, bio: true } } } },
        registrations: { select: { id: true, name: true, email: true, createdAt: true } },
      },
    });

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    // Transform to include speakers directly
    const transformedEvent = {
      ...event,
      speakers: event.eventSpeakers.map((es) => es.speaker),
    };

    return NextResponse.json(transformedEvent);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}