"use client";

import { useEffect, useState } from "react";
import {
  useScroll,
  useSpring,
  useVelocity,
  useMotionValue,
} from "framer-motion";

interface UseHeroAnimationOptions {
  imageUrls: string[];
  scrollDamping?: number;
  scrollStiffness?: number;
}

interface UseHeroAnimationReturn {
  images: HTMLImageElement[];
  currentFrame: number;
  rotate: any;
  isLoading: boolean;
}

/**
 * Custom hook for hero canvas animation logic
 * Handles image preloading and scroll-based frame updates
 */
export function useHeroAnimation({
  imageUrls,
  scrollDamping = 50,
  scrollStiffness = 400,
}: UseHeroAnimationOptions): UseHeroAnimationReturn {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: scrollDamping,
    stiffness: scrollStiffness,
  });

  // Rotation based on scroll velocity
  const rotate = useMotionValue(0);

  // Preload all images
  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      const loadPromises = imageUrls.map((url) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();

          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        const loadedImages = await Promise.all(loadPromises);

        if (mounted) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      } catch {
        // Failed to load hero images, continue with loading state
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, [imageUrls]);

  // Update frame based on scroll velocity
  useEffect(() => {
    const unsubscribe = smoothVelocity.on("change", (latest) => {
      const frame = Math.abs(
        Math.floor(
          imageUrls.length * (currentFrame / imageUrls.length + latest / 1000),
        ),
      );

      if (frame !== currentFrame && frame < imageUrls.length) {
        setCurrentFrame(frame);
      }

      // Update rotation based on velocity
      rotate.set(Math.max(0, Math.min(5, latest / 100)));
    });

    return () => unsubscribe();
  }, [smoothVelocity, currentFrame, imageUrls.length, rotate]);

  return {
    images,
    currentFrame,
    rotate,
    isLoading,
  };
}

/**
 * Draw image on canvas with aspect ratio preservation
 */
export function drawImageOnCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
): void {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate scale to fit canvas while maintaining aspect ratio
  const scale = Math.min(
    canvas.width / image.width,
    canvas.height / image.height,
  );
  const x = (canvas.width - image.width * scale) / 2;
  const y = (canvas.height - image.height * scale) / 2;

  ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
}
