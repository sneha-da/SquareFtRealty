import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin - SquareFt Realty",
  description: "Admin dashboard for SquareFt Realty property management.",
  icons: {
    icon: [
      { url: "/sqfeetrealty favicon.ico" },
      { url: "/sqfeetrealty favicon.png", type: "image/png" }
    ],
    shortcut: "/sqfeetrealty favicon.ico",
    apple: "/sqfeetrealty favicon.png"
  }
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
