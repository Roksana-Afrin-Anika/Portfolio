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
    <section className="relative font-orpheus pt-[30px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center gap-12">
        {/* About Image - Centered Vertically */}
        <div className="w-full md:w-5/12 flex justify-center items-center">
          <img
            src={aboutData.about_image}
            alt="About Me"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section - Centered Vertically */}
        <div className="w-full md:w-7/12 flex flex-col justify-center">
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {aboutData.title}
          </h1>
          <h2 className="font-montserrat text-3xl font-bold text-gray-900 mb-6">
            {aboutData.heading}
          </h2>
          <p className="font-montserrat text-lg text-gray-600 mb-8">
            {aboutData.description}
          </p>
        </div>
      </div>
    </section>
  );
}
