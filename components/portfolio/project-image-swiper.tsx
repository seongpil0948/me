"use client";

import Image from "next/image";
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
  images: readonly string[];
}

export default function ProjectImageSwiper({
  images,
  alt = "Project Image",
  autoplay = false,
}: ProjectImageSwiperProps) {
  const validImages = images.filter((image) => image.trim().length > 0);

  if (validImages.length === 0) {
    return null;
  }

  const modules = autoplay
    ? [Navigation, Pagination, Scrollbar, A11y, Autoplay]
    : [Navigation, Pagination, Scrollbar, A11y];

  return (
    <div className="w-full my-4">
      <Swiper
        navigation
        zoom
        autoplay={
          autoplay
            ? {
              delay: 3000,
              disableOnInteraction: false,
            }
            : false
        }
        // breakpoints={{
        //   640: {
        //     slidesPerView: 1,
        //   },
        //   768: {
        //     slidesPerView: validImages.length > 1 ? 2 : 1,
        //   },
        //   1024: {
        //     slidesPerView: validImages.length > 2 ? 3 : validImages.length,
        //   },
        // }}
        className="rounded-lg"
        modules={modules}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        spaceBetween={30}
      >
        {validImages.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div
              aria-label={`${alt} ${index + 1}`}
              className="relative w-full h-75 overflow-hidden rounded-lg md:h-100"
              style={{ backgroundImage: `url("${image}")` }}
            >
              <Image
                fill
                alt={`${alt} ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
