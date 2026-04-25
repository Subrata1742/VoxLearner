import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/homePage/navbar";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import Footer from "@/components/homePage/footer";
import Loading from "./loading";
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
              colorBackground: " #1a1a2e",
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
              avatarImageActionsUpload: "text-white!",
              drawerRoot: "z-999! "
            }
          }}

        >
          <div className="layout-container ">

            <Navbar />
            <ClerkLoading>
              <Loading />
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
            <Footer />
          </div>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
