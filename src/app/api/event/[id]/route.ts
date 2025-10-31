import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/app/lib/mongodb";
import { ObjectId } from "mongodb";

// Constants for readability, consistent with the main event route
const COLLECTION_NAME = "Event";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET: Fetch a specific event by ID
export async function GET(
  request: Request,
  context: RouteContext,
) {
  try {
    // Access ID directly from params object (no 'await' is needed on 'context' or 'params')
    const { id } = await context.params; 

    // Consistency Improvement: Check for required DB environment variable
    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
      throw new Error("MONGODB_DB environment variable is not set.");
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    
    // Ensure the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const event = await db
      .collection(COLLECTION_NAME) // Use constant
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    // CRITICAL IMPROVEMENT: Consistent and enabled error logging
    console.error(`[API/${COLLECTION_NAME} Single Fetch] Failed to fetch data for ID:`, error);
    
    return NextResponse.json(
      { error: "Failed to fetch event due to a server error." },
      { status: 500 },
    );
  }
}
