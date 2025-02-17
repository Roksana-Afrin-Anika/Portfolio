"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("/data/privacy/footer.json");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return <p className="text-center py-8">Loading footer...</p>;

  return (
    <footer className="bg-[#f8f8f8] text-[#333] py-[60px] px-5 font-orpheus">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-10 justify-between">
        {/* Brand Section */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-[1.75rem] font-semibold text-[#2d3748] font-playfair mb-4">
            {footerData.brand.name}
          </h2>
          <p className="text-[#4a5568] text-base leading-relaxed">
            {footerData.brand.tagline}
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-[1.25rem] font-semibold text-[#2d3748] font-playfair mb-4">
            {footerData.socialMedia.title}
          </h3>
          <div className="flex flex-col gap-3">
            {footerData.socialMedia.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a5568] hover:text-[#c53030] transition-colors text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex-1 min-w-[250px]">
          <h3 className="text-[1.25rem] font-semibold text-[#2d3748] font-playfair mb-4">
            {footerData.contact.title}
          </h3>
          <p className="text-[#4a5568] text-base mb-3">
            Email:{" "}
            <Link
              href={`mailto:${footerData.contact.email}`}
              className="hover:text-[#c53030] transition-colors"
            >
              {footerData.contact.email}
            </Link>
          </p>
          <p className="text-[#4a5568] text-base">
            Phone:{" "}
            <Link
              href={`tel:${footerData.contact.phone}`}
              className="hover:text-[#c53030] transition-colors"
            >
              {footerData.contact.phone}
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-[60px] pt-[20px] border-t border-[#e2e8f0] text-center">
        <p className="text-[0.875rem] text-[#718096]">
          {footerData.copyright.text.replace("2024", new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
