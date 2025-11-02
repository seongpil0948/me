"use client";

import { useMemo, useState } from "react";

import { Dictionary } from "@/types/portfolio";
import { Locale } from "@/app/[locale]/dictionaries";
import { projectImages } from "@/data/portfolio";

import ProjectImageSwiper from "./project-image-swiper";

interface ProjectsContentProps {
  dict: Dictionary;
  locale: Locale;
}

interface Project {
  content: string[];
  images?: readonly string[];
  subtitle: string;
  title: string;
}

const DEFAULT_EXPANDED_COUNT = 3;

export default function ProjectsContent({ dict }: ProjectsContentProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects: Project[] = useMemo(
    () => [
      {
        title: dict.projects.monitoring.title,
        subtitle: dict.projects.monitoring.subtitle,
        content: dict.projects.monitoring.content,
        images: projectImages.monitoring,
      },
      {
        title: dict.projects.dataLake.title,
        subtitle: dict.projects.dataLake.subtitle,
        content: dict.projects.dataLake.content,
        images: projectImages.dataLake,
      },
      {
        title: dict.projects.theshop.title,
        subtitle: dict.projects.theshop.subtitle,
        content: dict.projects.theshop.content,
        images: projectImages.theshop,
      },
      {
        title: dict.projects.gateway.title,
        subtitle: dict.projects.gateway.subtitle,
        content: dict.projects.gateway.content,
        images: projectImages.gateway,
      },
      {
        title: dict.projects.airflow.title,
        subtitle: dict.projects.airflow.subtitle,
        content: dict.projects.airflow.content,
        images: projectImages.airflow,
      },
      {
        title: dict.projects.ixiStudio.title,
        subtitle: dict.projects.ixiStudio.subtitle,
        content: dict.projects.ixiStudio.content,
        images: projectImages.ixiStudio,
      },
      {
        title: dict.projects.ixiAdmin.title,
        subtitle: dict.projects.ixiAdmin.subtitle,
        content: dict.projects.ixiAdmin.content,
        images: projectImages.ixiAdmin,
      },
      {
        title: dict.projects.drone.title,
        subtitle: dict.projects.drone.subtitle,
        content: dict.projects.drone.content,
        images: projectImages.drone,
      },
      {
        title: dict.projects.robotPlatform.title,
        subtitle: dict.projects.robotPlatform.subtitle,
        content: dict.projects.robotPlatform.content,
        images: projectImages.robotPlatform,
      },
      {
        title: dict.projects.inoutbox.title,
        subtitle: dict.projects.inoutbox.subtitle,
        content: dict.projects.inoutbox.content,
        images: projectImages.inoutbox,
      },
      {
        title: dict.projects.campi.title,
        subtitle: dict.projects.campi.subtitle,
        content: dict.projects.campi.content,
        images: projectImages.campi,
      },
      {
        title: dict.projects.virtualTryOn.title,
        subtitle: dict.projects.virtualTryOn.subtitle,
        content: dict.projects.virtualTryOn.content,
        images: projectImages.virtualTryOn,
      },
      {
        title: dict.projects.intellisysWebsite.title,
        subtitle: dict.projects.intellisysWebsite.subtitle,
        content: dict.projects.intellisysWebsite.content,
        images: projectImages.intellisysWebsite,
      },
    ],
    [dict]
  );

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isExpanded = (idx: number) =>
    expandedIndex === idx ||
    (expandedIndex === null && idx < DEFAULT_EXPANDED_COUNT);

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="border-b"
              style={{ borderColor: "var(--color-border-primary)" }}
            >
              <button
                className="w-full text-left py-4 px-2 hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(idx)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  <svg
                    className={`w-5 h-5 transform transition-transform ${isExpanded(idx) ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {isExpanded(idx) && (
                <div className="px-2 pb-4">
                  {project.images && project.images.length > 0 && (
                    <div className="mb-4">
                      <ProjectImageSwiper
                        alt={project.title}
                        images={project.images}
                      />
                    </div>
                  )}

                  <ul className="space-y-2">
                    {project.content.map((item, iidx) => (
                      <li
                        key={iidx}
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
