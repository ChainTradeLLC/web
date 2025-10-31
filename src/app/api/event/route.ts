import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/app/lib/mongodb";

// Constants for safety and readability
const COLLECTION_NAME = "Event";
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
  // Extract pagination parameters from the URL
  const searchParams = request.nextUrl.searchParams;
  
  // Parse limit, clamping it between 1 and MAX_LIMIT
  let limit = Math.min(
    parseInt(searchParams.get('limit') || DEFAULT_LIMIT.toString(), 10),
    MAX_LIMIT
  );
  limit = Math.max(1, limit);
  
  // Calculate skip for pagination
  const page = Math.max(0, parseInt(searchParams.get('page') || '0', 10));
  const skip = page * limit;

  try {
    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
      throw new Error("MONGODB_DB environment variable is not set.");
    }
    
    const client = await clientPromise;
    const db = client.db(dbName);

    // 💡 Improvement: Added sorting and pagination limits
    const cursor = db.collection(COLLECTION_NAME)
      .find({})
      .sort({ date: -1 }) // Sort by a field like 'date' or 'createdAt' descending
      .skip(skip)
      .limit(limit);

    const events = await cursor.toArray();

    // 💡 Improvement: Optionally return pagination info in headers or body for the client
    return NextResponse.json(events, {
      headers: {
        'X-Pagination-Page': page.toString(),
        'X-Pagination-Limit': limit.toString(),
        // To include total count, you would need to await db.collection(COLLECTION_NAME).countDocuments({})
      }
    });

  } catch (error) {
    // 💡 CRITICAL IMPROVEMENT: Ensure error details are logged
    // The previous code had console.error commented out. This must be present
    // to diagnose issues in a production environment.
    console.error(`[API/${COLLECTION_NAME}] Failed to fetch data.`, error);
    
    return NextResponse.json(
      { error: "Failed to fetch events due to a server error." },
      { status: 500 },
    );
  }
}
