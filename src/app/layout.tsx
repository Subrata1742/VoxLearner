import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/homePage/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoxLearner",
  description: " A Real-Time, Voice-Driven Al Learning Companion ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#e94560",
              colorBackground: "#0f3460",
              colorForeground: "#ffffff",
              colorMutedForeground: "rgba(255,255,255,0.6)",
              colorBorder: "rgba(255,255,255,1)",
              borderRadius: "10px",
              fontFamily: "var(--font-geist-sans)",

            },
            elements: {
              userButtonPopoverActionButton: "text-white! ",
              tabButton: " text-gray-200! focus:text-[#e94560]! hover:text-white!",

              socialButtonsBlockButtonText: "text-white!",




            }
          }}

        >
          <div className="layout-container ">

            <Navbar />
            {children}
          </div>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
