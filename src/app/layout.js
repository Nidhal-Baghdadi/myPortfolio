import { Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css"
import { Toaster } from "react-hot-toast";
import Header from "@components/Header";

import { ActiveSectionProvider } from "@/context/activeSectionContext";
import ThemeContextProvider from "@/context/themeContext";
import ThemeSwitch from "@components/ThemeSwitch";
import Footer from "@components/Footer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "My tech journey",
  description: "My personal portfolio."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="!scroll-smooth" >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} bg-slate-100 text-gray-950 relative h-[5000px] pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 `}>
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem]  rounded-full blur-[10rem] sm:w-[68.75rem] " ></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[50rem] w-[31.25rem]  rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left[-28rem] xl:left[-15rem] 2xl:left[-5rem] " ></div>
        <ThemeContextProvider>
          <ActiveSectionProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionProvider>
        </ThemeContextProvider>

      </body>
    </html >


  );
}
