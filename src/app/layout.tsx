import type { Metadata } from "next";

const siteConfig = {
  title:
    "ChainTrade: The ecosystem for decentralized, trustless, and permissioned commerce on the blockchain.",
  description:
    "Chaintrade is a layer one blockchain building the trust layer for the future of global commerce, enabling secure, transparent, and efficient trade transactions on the blockchain using smart contracts and decentralized applications.",
  url: "https://www.chaintrade.network",
  ogImage: "https://www.chaintrade.network/icon-2.jpg",
  twitterHandle: "@ChainTradeLLC",
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ChainTrade`,
  },
  description: siteConfig.description,

  keywords: [
    "ChainTrade",
    "commerce",
    "decentralized",
    "trustless",
    "permissioned",
    "blockchain",
    "dApp",
    "smart contracts",
    "DeFi",
    "Web3 Commerce",
  ],

  authors: [{ name: "The ChainTrade Team", url: `${siteConfig.url}/about` }],
  creator: "The ChainTrade Team",
  publisher: "ChainTrade Foundation",

  metadataBase: new URL(siteConfig.url),

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  // --- Robots and Indexing (from your original) ---
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- Icons and Manifest (Expanded from your original) ---
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png", // For Apple devices
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest", // For PWA capabilities

  // --- Viewport and Theme ---
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1, // Good for web-apps, prevents unwanted zoom
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }, // Assumes you have a dark mode
  ],

  // --- Open Graph (for Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "ChainTrade",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "ChainTrade Blockchain Ecosystem",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage], // Must be an absolute URL
  },

  // --- App-specific (for PWAs and mobile) ---
  applicationName: "ChainTrade",
  appleWebApp: {
    title: "ChainTrade",
    capable: true,
    statusBarStyle: "default", // or 'black-translucent'
  },
  formatDetection: {
    telephone: false,
  },

  // --- Verification (Replace with your actual codes) ---
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    other: {
      // Example for linking to other profiles
      me: ["contact@chaintrade.network", `${siteConfig.url}`],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
