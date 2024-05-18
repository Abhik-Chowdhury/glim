import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GLIM",
  description: "video Calling app",
  icons:'/icons/logo.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* adding the clerk provider for clerk user mangement */}
      {/* in the clerk customization */}
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl:'/icons/logo.svg',
          socialButtonsVariant:'iconButton'
        },
        variables:{
          colorText: '#fff',
          colorPrimary: '#38B6FF',
          colorBackground: '#1C1F2E',
          
        },
      }}
      >
        <body className={`${inter.className} bg-dark-2`}>{children}
        <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
