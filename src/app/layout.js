import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import "tailwindcss/tailwind.css"
import { SceneProvider } from "@/context/sceneContext";




const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "Hello, and welcome to my portfolio !",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={clsx(inter.variable, "bg-background, text-foreground")}>
        <SceneProvider>
          {children}
        </SceneProvider>
      </body>
    </html>


  );
}
