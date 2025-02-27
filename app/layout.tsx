import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Main from "@/components/main";
import Footer from "@/components/footer";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advent of Code solutions",
  description: "Javascript solutions to the Advent of Code challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased caret-transparent`}
      >
        <div className="flex flex-col items-center justify-items-center min-h-screen min-w-80 p-8 pb-20 sm:p-20">
          <Header />
          <Main className="mb-auto">
            {children}
          </Main>
          <Footer />
        </div>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
