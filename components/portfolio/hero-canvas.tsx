"use client";

import { useEffect, useRef, useState } from "react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const frameCount = 15;
const urls = new Array(frameCount)
  .fill(true)
  .map((_o, i) => `/me/moong-me/${(i + 1).toString()}.png`);

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [curFrame, setCurFrame] = useState(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Rotation animation based on scroll
  const inputRange = [0, 500];
  const rotate = useTransform(smoothVelocity, inputRange, [5, 0]);

  // Load images
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const loadedImages = urls.map((url) => {
      const img = new Image();

      img.src = url;

      // Draw first image when it loads
      if (url === urls[0]) {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };
      }

      return img;
    });

    setImages(loadedImages);
  }, []);

  // Update frame based on scroll
  useEffect(() => {
    const unsubscribe = smoothVelocity.on("change", (latest) => {
      const frame = Math.abs(
        Math.floor(urls.length * (curFrame / urls.length + latest / 1000) * 1)
      );

      if (frame !== curFrame && frame < urls.length) {
        setCurFrame(frame);
      }
    });

    return () => unsubscribe();
  }, [smoothVelocity, curFrame]);

  // Draw current frame
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !images[curFrame]) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[curFrame];

    // Draw image scaled to fit canvas while maintaining aspect ratio
    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [curFrame, images]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-square"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        rotate,
      }}
      whileHover={{
        scale: 1.2,
        rotate: 0,
        transition: {
          duration: 1,
        },
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        height={500}
        width={500}
      />
    </motion.div>
  );
}
