"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [whiteBg, setWhiteBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav
      className={`${
        whiteBg ? "bg-white" : "bg-[var(--figma-light-gray)]"
      } sticky top-0 z-50 transition-colors h-[80px] flex items-center`}
    >
      <div className="max-w-[1440px] mx-auto w-full relative flex items-center justify-center px-6 md:px-8 lg:px-16">

        {/* LOGO LEFT */}
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

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-medium text-[var(--figma-dark)] hover:opacity-80 relative pb-1 ${
                  isActive ? "after:scale-x-100" : "after:scale-x-0"
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black after:origin-left after:transition-transform`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* DESKTOP CTA */}
        <Link
          href="/quote"
          className="hidden lg:flex absolute right-0 bg-[var(--figma-orange)] text-[var(--figma-dark)] hover:opacity-90 px-6 py-3 rounded-[20px] font-semibold text-[14px] w-[180px] items-center justify-center"
        >
          Get a Quote
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden absolute right-0 flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[var(--figma-dark)] transition-all ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[var(--figma-dark)] transition-all ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[var(--figma-dark)] transition-all ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 right-0 bg-white shadow-lg border-t">
          <div className="flex flex-col py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-6 py-3 text-[14px] font-medium text-[var(--figma-dark)] hover:bg-gray-50 ${
                    isActive
                      ? "bg-orange-50 border-l-4 border-[var(--figma-orange)]"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/quote"
              onClick={() => setIsMenuOpen(false)}
              className="mx-6 mt-4 bg-[var(--figma-orange)] text-[var(--figma-dark)] px-6 py-3 rounded-[20px] font-semibold text-[14px] text-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
