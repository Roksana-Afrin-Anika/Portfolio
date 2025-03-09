"use client";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/about/about.json");
      const data = await response.json();
      setAboutData(data);
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return <p className="text-center py-8">Loading...</p>;
  }

  return (
    <section className="font-orpheus font-normal min-h-screen flex items-center bg-[#f1f1ef]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Image Section - Full width on small screens, fixed width on larger screens */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center items-center">
          <img
            src={aboutData.about_image}
            alt="About Me"
            className="w-full h-full object-cover md:rounded-none"
          />
        </div>

        {/* Text Section - Full width on small screens, fixed width on larger screens */}
        <div className="w-full md:w-1/2 lg:w-7/12 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-black mb-4 sm:mb-6">
            {aboutData.title}
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-4 sm:mb-6">
            {aboutData.heading}
          </h2>
          <p className="text-sm sm:text-base  text-[18.16px] font-normal lg:text-lg text-gray-600 text-black not-italic font-normal">
            {aboutData.description}
          </p>
        </div>
      </div>
    </section>
  );
}
