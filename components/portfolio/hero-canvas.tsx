"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { HERO_IMAGE_URLS } from "@/constants/images";
import {
  useHeroAnimation,
  drawImageOnCanvas,
} from "@/hooks/use-hero-animation";

/**
 * Hero canvas component with scroll-based animation
 * Displays animated character image that responds to scroll
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { images, currentFrame, rotate, isLoading } = useHeroAnimation({
    imageUrls: HERO_IMAGE_URLS,
  });

  // Draw current frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !images[currentFrame]) return;

    drawImageOnCanvas(canvas, images[currentFrame]);
  }, [currentFrame, images]);

  return (
    <motion.div
      ref={containerRef}
      animate={{ opacity: isLoading ? 0 : 1 }}
      className="relative w-full aspect-square"
      initial={{ opacity: 0 }}
      style={{
        rotate,
      }}
      transition={{ duration: 0.5 }}
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-default-400">Loading...</div>
        </div>
      )}
    </motion.div>
  );
}
