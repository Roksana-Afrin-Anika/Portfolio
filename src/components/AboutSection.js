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
    <section className="relative font-orpheus font-normal -mt-10 pt-0 h-screen flex items-center">
      <div className="max-w-7xl mx-auto ml-[-8px] px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center gap-12 font-normal h-full">
        {/* About Image - Adjusted for visibility */}
        <div className="w-full md:w-5/12 flex justify-center items-center h-full">
          <img
            src={aboutData.about_image}
            alt="About Me"
            className="w-full h-full max-h-screen object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="w-full ml-[-50px] md:w-7/12 flex flex-col justify-center font-orpheus-pro">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-black mb-6">
            {aboutData.title}
          </h1>
          <h2 className="text-3xl font-normal text-gray-900 mb-6">
            {aboutData.heading}
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-black not-italic font-normal">
            {aboutData.description}
          </p>
        </div>
      </div>
    </section>
  );
}
