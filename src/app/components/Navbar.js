"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export default function Navbar() {
  const [navData, setNavData] = useState(null);
  const [error, setError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

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

  const handleClick = () => {
    setMobileMenuOpen(false); // Close mobile menu on link click
  };

  if (error) {
    return (
      <nav className="bg-white shadow-md h-24 flex items-center justify-center">
        Failed to load navbar.
      </nav>
    );
  }

  if (!navData) {
    return (
      <nav className="bg-white shadow-md h-24 flex items-center justify-center">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="bg-white font-orpheus text-black text-base lg:text-lg text-gray-800 hover:text-black transition-colors font-normal h-auto leading-[32.688px] tracking-[0.7264px] pb-[1.816px] pt-[1.816px] no-underline whitespace-nowrap">
      <div className="container mx-auto px-5 flex items-center justify-between h-20 md:h-24 lg:h-28">
        {/* Left - Navigation Links */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 flex-1 justify-start">
          {navData.menu.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer pb-1 transition-all ${
                pathname === item.url
                  ? "border-b-2 border-black"
                  : "hover:transparent border-black"
              }`}
              onClick={handleClick}
            >
              <Link
                href={item.url}
                className={`text-base lg:text-lg ${
                  pathname === item.url ? "text-black" : "text-gray-800"
                } hover:text-black transition-colors`}
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
        <div className="hidden md:flex space-x-6 flex-1 justify-end">
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

        {/* Mobile Menu Toggle - Custom Two-Line Icon */}
        <div className="md:hidden">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* Custom Two-Line Icon */}
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-gray-500"></span>
              <span className="block h-0.5 w-6 bg-gray-500"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-20 z-40">
          <ul className="flex flex-col space-y-4 p-4">
            {navData.menu.map((item, index) => (
              <li key={index} onClick={handleClick}>
                <Link
                  href={item.url}
                  className={`block ${
                    pathname === item.url ? "text-black" : "text-gray-800"
                  } hover:text-black transition-colors`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {navData.socialMedia.map(({ name, url }) => (
              <li key={name} className="flex items-center">
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`/data/icons/${name}.png`}
                    alt={name}
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
