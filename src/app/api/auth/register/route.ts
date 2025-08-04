import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/app/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const enabled: String = process.env.SIGNUP_ENABLED;

  if (enabled === "false") {
    return NextResponse.json(
      { message: "Registrations are disabled now" },
      { status: 400 },
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "admin",
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
