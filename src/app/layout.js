import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SquareFt Realty - Your Trusted Real Estate Partner",
  description: "Find your dream home with SquareFt Realty. Expert real estate services for buying, selling, and renting properties.",
  icons: {
    icon: [
      { url: "/sqfeetrealty favicon.ico" },
      { url: "/sqfeetrealty favicon.png", type: "image/png" }
    ],
    shortcut: "/sqfeetrealty favicon.ico",
    apple: "/sqfeetrealty favicon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{fontFamily: "'Poppins', sans-serif"}}
      >
        {children}
      </body>
    </html>
  );
}
