import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CoachingApp - Connect Coaches & Athletes",
  description: "A comprehensive platform connecting coaches and athletes for personalized training, workout management, and progress tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
