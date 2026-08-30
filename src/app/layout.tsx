import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlayerBar from "@/components/PlayerBar";
import { PlayerProvider } from "@/lib/player-context";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display-raw",
  subsets: ["latin"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono-raw",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sailor VIII Music",
  description:
    "Electric guitar, electroacoustic textures, and Ableton production — listen and download.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PlayerProvider>
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-28">
            {children}
          </main>
          <Footer />
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
