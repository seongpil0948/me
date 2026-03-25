"use client";

import type { ReactNode } from "react";

import Zoom from "react-medium-image-zoom";

import { useLocale } from "@/hooks/use-locale";

const zoomLabels = {
    en: {
        unzoom: "Minimize image",
        zoom: "Expand image",
    },
    ko: {
        unzoom: "이미지 축소",
        zoom: "이미지 확대",
    },
    zh: {
        unzoom: "缩小图片",
        zoom: "放大图片",
    },
} as const;

interface ZoomableImageProps {
    children: ReactNode;
    inline?: boolean;
    isDisabled?: boolean;
    zoomMargin?: number;
}

export default function ZoomableImage({
    children,
    inline = false,
    isDisabled = false,
    zoomMargin = 24,
}: ZoomableImageProps) {
    const locale = useLocale();
    const labels = zoomLabels[locale as keyof typeof zoomLabels] ?? zoomLabels.en;

    return (
        <Zoom
            a11yNameButtonUnzoom={labels.unzoom}
            a11yNameButtonZoom={labels.zoom}
            classDialog="portfolio-zoom-dialog"
            isDisabled={isDisabled}
            wrapElement={inline ? "span" : "div"}
            zoomMargin={zoomMargin}
        >
            {children}
        </Zoom>
    );
}
