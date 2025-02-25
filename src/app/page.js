"use client"; // Ensure this is a Client Component if using Next.js
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Ensure you import the fade effect CSS

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
    <div className="font-orpheus">
      {/* Swiper Slider Section */}
      <section className="w-full h-screen overflow-hidden mb-0">
        <div className="w-full h-full">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]} // Removed Pagination module
            spaceBetween={30}
            slidesPerView={1}
            effect="fade" // Use the fade effect
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop={homeData.sliderImages.length > 2} // Enable loop only if there are more than 2 slides
            className="mySwiper"
          >
            {homeData.sliderImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  className="w-full h-screen object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Render Other Sections (Featured, About, Services, Testimonials, CTA) */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Our Recent Works
          </h2>

          {/* Swiper Slider for Featured Images */}
          <div className="relative w-full overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 15, // Added space between items on smaller screens
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20, // Added space between items on larger screens
                },
              }}
              navigation={{
                nextEl: ".featured-next",
                prevEl: ".featured-prev",
              }}
              className="mySwiper w-full"
              initialSlide={0}
            >
              {homeData.featured.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold mt-4">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="featured-prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-3 rounded-full shadow-lg hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="featured-next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-white/80 p-3 rounded-full shadow-lg hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
