import type {Metadata} from "next";
import {Inter} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import Providers from "./providers";

const myFont = localFont({
  src: "./mainFonts.ttf",
});

export const metadata: Metadata = {
  title: "ESSystems Dev",
  description: "Hospitality business solution",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={myFont.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
