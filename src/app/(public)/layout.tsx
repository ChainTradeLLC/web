import type { Metadata } from "next";
import "../globals.scss";
import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer/footer";
// import AuthProvider from "@/src/app/providers/auth";

export const metadata: Metadata = {
  title: "Homepage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
