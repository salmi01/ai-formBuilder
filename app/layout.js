import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/landing-page/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Form Builder",
  description: "Build your forms using AI in seconds, not hours",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>
      <html lang="en" >
        <head>
          <link rel="icon" href="/favicon.png" />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
