import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/app/lib/mongodb";

// Constants for safety and readability
const COLLECTION_NAME = "Publication";
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// GET: Fetch all published publications with optional pagination
export async function GET(request: NextRequest) {
  // Extract pagination parameters from the URL
  const searchParams = request.nextUrl.searchParams;

  // Parse limit, clamping it between 1 and MAX_LIMIT
  let limit = Math.min(
    parseInt(searchParams.get("limit") || DEFAULT_LIMIT.toString(), 10),
    MAX_LIMIT,
  );
  limit = Math.max(1, limit);

  // Calculate skip for pagination
  const page = Math.max(0, parseInt(searchParams.get("page") || "0", 10));
  const skip = page * limit;

  try {
    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
      throw new Error("MONGODB_DB environment variable is not set.");
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // 💡 Improvement: Apply sorting and pagination limits to the original query
    const cursor = db
      .collection(COLLECTION_NAME)
      .find({ status: "PUBLISHED" }) // Filter by PUBLISHED status as in original code
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    const publications = await cursor.toArray();

    // Optionally return pagination info in headers or body for the client
    return NextResponse.json(publications, {
      headers: {
        "X-Pagination-Page": page.toString(),
        "X-Pagination-Limit": limit.toString(),
        // Consider adding 'X-Pagination-Total-Count' if performance allows
      },
    });
  } catch (error) {
    // 💡 CRITICAL IMPROVEMENT: Consistent and enabled error logging
    console.error(`[API/${COLLECTION_NAME} List] Failed to fetch data.`, error);

    return NextResponse.json(
      { error: "Failed to fetch publications due to a server error." },
      { status: 500 },
    );
  }
}
