"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) =>
    pathname === path
      ? "text-indigo-700 underline"
      : "";

  if (!mounted) return null;

  return (
    <nav className="w-full px-4 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/search.png"
            alt="Search Icon"
            className="h-8 w-auto mr-4"
          />
          <Link href="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            SEO Inspect
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${isActive("/")}`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${isActive("/about")}`}
          >
            About
          </Link>

          <Link
            href="/json"
            className={`text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${isActive("/json")}`}
          >
            PWAs
          </Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
