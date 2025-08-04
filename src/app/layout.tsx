import type { Metadata } from "next";
import AuthProvider from "@/src/app/providers/auth";

export const metadata: Metadata = {
  title: "ChainTrade Blockchain",
  description:
    "The ecosystem for decentralized, trustless, and permissioned commerce on the blockchain.",
  keywords: "ChainTrade, commerce, decentralized, trustless, blockchain",
  alternates: {
    canonical: "/",
  },
  icons: "/favicon.ico",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
