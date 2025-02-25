"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [navData, setNavData] = useState(null);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/privacy/navbar.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch navbar data");
        }
        return response.json();
      })
      .then((data) => setNavData(data))
      .catch((error) => {
        console.error("Error fetching navbar data:", error);
        setError(true);
      });
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
    setMobileMenuOpen(false);
  };

  if (error) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 h-24 flex items-center justify-center">
        Failed to load navbar.
      </nav>
    );
  }

  if (!navData) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50 h-24 flex items-center justify-center">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="bg-white sticky top-0 z-50 h-24 font-orpheus">
      <div className="container mx-auto px-5 flex items-center justify-between h-20 md:h-24 lg:h-28">
        {/* Left - Navigation Links */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 flex-1 justify-start pl-4 md:pl-6 lg:pl-8">
          {navData.menu.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer pb-1 transition-all ${
                activeIndex === index
                  ? "border-b-2 border-black"
                  : "hover:border-b-2 border-black"
              }`}
              onClick={() => handleClick(index)}
            >
              <Link
                href={item.url}
                className="text-base lg:text-lg text-gray-800 hover:text-black transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <img
              src={navData.brand.logo}
              alt={navData.brand.name}
              className="h-6"
            />
          </Link>
        </div>

        {/* Right - Social Media Links */}
        <div className="hidden md:flex space-x-6 flex-1 justify-end pr-4 md:pr-6 lg:pr-8">
          {navData.socialMedia.map(({ name, url }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={`/data/icons/${name}.png`}
                alt={name}
                className="h-5.3 w-6"
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-20 z-40">
          <ul className="flex flex-col space-y-4 p-4">
            {navData.menu.map((item, index) => (
              <li key={index} onClick={() => handleClick(index)}>
                <Link
                  href={item.url}
                  className="block text-gray-800 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {Object.entries(navData.socialMedia).map(([key, url]) => (
              <li key={key} className="flex items-center">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`/data/icons/${key}.png`}
                    alt={key}
                    className="h-6 w-6"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
