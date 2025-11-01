"use client";

import { Image } from "@heroui/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface ProjectImageSwiperProps {
  alt?: string;
  autoplay?: boolean;
  images: string[];
}

export default function ProjectImageSwiper({
  images,
  alt = "Project Image",
  autoplay = false,
}: ProjectImageSwiperProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const modules = autoplay
    ? [Navigation, Pagination, Scrollbar, A11y, Autoplay]
    : [Navigation, Pagination, Scrollbar, A11y];

  return (
    <div className="w-full my-4">
      <Swiper
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: images.length > 1 ? 2 : 1,
          },
          1024: {
            slidesPerView: images.length > 2 ? 3 : images.length,
          },
        }}
        className="rounded-lg"
        modules={modules}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        spaceBetween={30}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                alt={`${alt} ${index + 1}`}
                className="object-cover w-full h-full"
                src={image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
