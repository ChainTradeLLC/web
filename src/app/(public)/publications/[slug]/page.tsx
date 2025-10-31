import LoadingRipple from "@/src/components/ui/loading";
import Client from "./client";
import { Metadata } from "next";

function stripHtmlAndLimit(htmlString: string | null | undefined): string {
  if (!htmlString) return "";

  let plainText = htmlString.replace(/<[^>]*>/g, "");

  plainText = plainText.replace(/\s+/g, " ").trim();

  if (plainText.length > 160) {
    return plainText.substring(0, 160).trim() + "...";
  }

  return plainText;
}

interface PageParams {
  params: Promise<{ slug: string }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:8787";

async function getPublicationData(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/publication/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    // console.error(`Error fetching publication data from ${BASE_URL}/api/publication/${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationData(slug);

  if (!publication) {
    return { title: "Publication Not Found" };
  }

  const metaDescription = stripHtmlAndLimit(publication.excerpt);

  return {
    title: publication.title,
    description: metaDescription,
    alternates: {
      canonical: `https://www.chaintrade.network/publications/${publication.slug}`,
    },
    openGraph: {
      title: publication.title,
      description: metaDescription,
      url: `https://www.chaintrade.network/publications/${publication.slug}`,
      siteName: "ChainTrade",
      images: [
        {
          url: publication.coverImage,
          width: 1200, // Standard size for OG
          height: 630,
          alt: publication.title,
        },
      ],
      type: "article",
      publishedTime: publication.publishedAt,
    },

    // --- Twitter Card ---
    twitter: {
      card: "summary_large_image",
      title: publication.title,
      description: metaDescription,
      creator: "@ChainTradeLLC",
      images: [publication.coverImage],
    },
  };
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const publication = await getPublicationData(slug);

  if (!publication) return <LoadingRipple />;

  return <Client publication={publication} />;
}
