"use client";
import { useEffect, useState } from "react";

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
    <footer className="bg-[#f8f8f8] text-[#333] py-8 px-5 font-orpheus">
      {/* Copyright Notice */}
      <div className="mt-2 pt-4  text-center">
        <p className="text-base text-black">
          {footerData.copyright.text.replace(/\d{4}/, new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
