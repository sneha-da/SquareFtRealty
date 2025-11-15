"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [whiteBg, setWhiteBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("featured-properties");
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      setWhiteBg(top <= 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`${whiteBg ? "bg-white" : "bg-[var(--figma-light-gray)]"} px-8 lg:px-16 py-6 sticky top-0 z-50 transition-colors`}>
      <div className="max-w-[1440px] mx-auto relative flex items-center justify-center">
        {/* Logo - Top Left, absolutely positioned */}
        <Link 
          href="/"
          className="absolute left-0 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/21.png"
            alt="SquareFt Realty Logo"
            width={180}
            height={60}
            className="h-auto"
            priority
          />
        </Link>

        {/* Navigation Links - Centered */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-[14px] font-medium text-[var(--figma-dark)] hover:opacity-80 transition-all duration-300 ease-in-out relative pb-1 ${
                  isActive 
                    ? 'after:scale-x-100' 
                    : 'after:scale-x-0'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-[0.5px] after:bg-black after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button - Top Right, absolutely positioned */}
        <Link 
          href="/quote"
          className="absolute right-0 bg-[var(--figma-orange)] text-[var(--figma-dark)] hover:opacity-90 transition-opacity px-6 py-3 rounded-[20px] font-semibold text-[14px] w-[180px] flex items-center justify-center"
        >
          Get a Quote
        </Link>
      </div>
    </nav>
  );
}
