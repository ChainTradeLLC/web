import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/app/lib/mongodb";

// Constants for readability
const COLLECTION_NAME = "Publication";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

// GET: Fetch a specific publication by slug
export async function GET(
  request: Request,
  context: RouteContext, 
) {
  try {
    // Access slug directly from the params object (no 'await' is needed)
    const { slug } = await context.params; 

    // Consistency Improvement: Check for required DB environment variable
    const dbName = process.env.MONGODB_DB;
    if (!dbName) {
      // Throwing an error here ensures the internal error message is logged
      throw new Error("MONGODB_DB environment variable is not set.");
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    
    const publication = await db
      .collection(COLLECTION_NAME)
      .findOne({ slug, status: "PUBLISHED" }); // Lookup by slug and PUBLISHED status

    if (!publication) {
      return NextResponse.json(
        { error: `Publication with slug '${slug}' not found` },
        { status: 404 },
      );
    }

    return NextResponse.json(publication);
  } catch (error) {
    // CRITICAL IMPROVEMENT: Consistent and enabled error logging
    console.error(`[API/${COLLECTION_NAME} Single Fetch] Failed to fetch data for slug:`, error);
    
    return NextResponse.json(
      { error: "Failed to fetch publication due to a server error." },
      { status: 500 },
    );
  }
}
