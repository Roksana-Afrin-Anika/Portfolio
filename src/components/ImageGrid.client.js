"use client"; // Mark this as a Client Component

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGrid({ images, projectTitle }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <>
      {/* Masonry Grid Layout for Images */}
      <div className="w-full">
        <div className="columns-1 sm:columns-2 gap-2 sm:gap-4 w-full">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden mb-2 sm:mb-4 break-inside-avoid cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative w-full h-auto aspect-[4/3]">
                  <Image
                    src={`/${image}`}
                    alt={`${projectTitle} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No images available for this project.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Full-Size Image with Navigation */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-white/90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={30} strokeWidth={1} />
            </button>

            <Image
              src={`/${images[selectedImageIndex]}`}
              alt={`${projectTitle} - Full Size`}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              style={{ width: "auto", height: "auto" }}
            />

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={30} strokeWidth={1} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
