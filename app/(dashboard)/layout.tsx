import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

import '../globals.css';
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Now Brewing - Admin Dashboard",
  description: "Admin dashboard to manage Now Brewing data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>

          <SignedIn>
            <ToasterProvider />
            <div className="flex max-lg:flex-col text-grey-1">
              <LeftSideBar />
              <TopBar />
              <div className="flex-1 pt-10">
                {children}
              </div>
            </div>
          </SignedIn>

        </body>
      </html>
    </ClerkProvider >
  );
}