import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/lib/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // @ts-ignore
  if (!session || session?.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Forbidden: Admin access required" },
      { status: 403 },
    );
  }

  const { name, bio, image, job } = await req.json();

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const speaker = await prisma.speaker.create({
      data: {
        name,
        bio,
        image,
        // @ts-ignore
        job,
      },
    });
    return NextResponse.json(
      { message: "Speaker created", speaker },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      include: {
        eventSpeakers: {
          include: { event: { select: { id: true, title: true } } },
        },
      },
    });

    // Transform to include events directly
    const transformedSpeakers = speakers.map((speaker) => ({
      ...speaker,
      events: speaker.eventSpeakers.map((es) => es.event),
    }));

    return NextResponse.json(transformedSpeakers);
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
