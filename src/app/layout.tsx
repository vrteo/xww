import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xikers Worldwide Fanbase",
  description: "Xikers Worldwide Fanbase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <footer className="bg-gray-950 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Xikers Worldwide. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
