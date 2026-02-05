import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreamy Launch - AI Landing Page Generator",
  description: "Generate a professional landing page in 60 seconds. Answer a few questions and let AI create your perfect page. Free to use, no signup required.",
  keywords: "landing page generator, AI website builder, free landing page, website generator",
  openGraph: {
    title: "Dreamy Launch - AI Landing Page Generator",
    description: "Generate a professional landing page in 60 seconds. Free to use.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
