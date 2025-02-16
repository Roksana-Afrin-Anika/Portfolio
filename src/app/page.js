"use client"; // Ensure this is a Client Component if using Next.js

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    // Fetch the home.json data
    fetch("/data/home/home.json")
      .then((response) => response.json())
      .then((data) => setHomeData(data))
      .catch((error) => console.error("Error fetching home data:", error));
  }, []);

  if (!homeData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url('${homeData.hero.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        {/* Content */}
        <div className="relative z-10 text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-light font-josefin-sans text-black mb-14">
            {homeData.hero.title}
          </h1>
          <div className="flex gap-4 justify-center">
            <a
              href={homeData.hero.cta.url}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              {homeData.hero.cta.text}
            </a>
            <a
              href="/contact"
              className="border font-montserrat text-black px-6 py-3 rounded-lg font-semibold bg-[#D2B48C] hover:bg-[#8B4513] hover:text-white transition-colors"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Swiper Slider Section */}
      <section className="py-16 px-4 w-full">
        <div className="w-full max-w-full">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            className="mySwiper"
          >
            {homeData.sliderImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Render Other Sections (Featured, About, Services, Testimonials, CTA) */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Recent Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.featured.map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={item.url}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
