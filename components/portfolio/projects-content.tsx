"use client";

import { useState } from "react";

import { Dictionary } from "@/types/portfolio";
import { Locale } from "@/app/[locale]/dictionaries";

import ProjectImageSwiper from "./project-image-swiper";

interface ProjectsContentProps {
  dict: Dictionary;
  locale: Locale;
}

interface Project {
  content: string[];
  images?: string[];
  subtitle: string;
  title: string;
}

export default function ProjectsContent({ dict }: ProjectsContentProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: dict.projects.monitoring.title,
      subtitle: dict.projects.monitoring.subtitle,
      content: dict.projects.monitoring.content,
      images: [
        "/projects/otel-grafana/Grafana - System Dashboard.png",
        "/projects/otel-grafana/Grafana - Networking.png",
      ],
    },
    {
      title: dict.projects.dataLake.title,
      subtitle: dict.projects.dataLake.subtitle,
      content: dict.projects.dataLake.content,
      images: ["/projects/business-grafana/Grafana NPS.png"],
    },
    {
      title: dict.projects.theshop.title,
      subtitle: dict.projects.theshop.subtitle,
      content: dict.projects.theshop.content,
      images: [
        "/projects/theshop/TheShop_Pharmacy.png",
        "/projects/theshop/TheShop_Seller.png",
      ],
    },
    {
      title: dict.projects.gateway.title,
      subtitle: dict.projects.gateway.subtitle,
      content: dict.projects.gateway.content,
      images: ["/projects/APISIX-Dashboard.png"],
    },
    {
      title: dict.projects.airflow.title,
      subtitle: dict.projects.airflow.subtitle,
      content: dict.projects.airflow.content,
      images: ["/projects/Aiflow.png"],
    },
    {
      title: dict.projects.ixiStudio.title,
      subtitle: dict.projects.ixiStudio.subtitle,
      content: dict.projects.ixiStudio.content,
      images: [
        "/projects/ixi-studio/0.png",
        "/projects/ixi-studio/1.png",
        "/projects/ixi-studio/2.png",
        "/projects/ixi-studio/3.png",
        "/projects/ixi-studio/4.png",
      ],
    },
    {
      title: dict.projects.ixiAdmin.title,
      subtitle: dict.projects.ixiAdmin.subtitle,
      content: dict.projects.ixiAdmin.content,
      images: [
        "/projects/ixi-admin/1.png",
        "/projects/ixi-admin/2.png",
        "/projects/ixi-admin/3.png",
        "/projects/ixi-admin/4.png",
        "/projects/ixi-admin/5.png",
        "/projects/ixi-admin/6.png",
      ],
    },
    {
      title: dict.projects.drone.title,
      subtitle: dict.projects.drone.subtitle,
      content: dict.projects.drone.content,
      images: [
        "/projects/drone/1.jpeg",
        "/projects/drone/2.jpeg",
        "/projects/drone/3.png",
        "/projects/drone/4.png",
      ],
    },
    {
      title: dict.projects.robotPlatform.title,
      subtitle: dict.projects.robotPlatform.subtitle,
      content: dict.projects.robotPlatform.content,
      images: [
        "/projects/robot-platform/1.png",
        "/projects/robot-platform/2.png",
        "/projects/robot-platform/3.png",
        "/projects/robot-platform/4.png",
      ],
    },
    {
      title: dict.projects.inoutbox.title,
      subtitle: dict.projects.inoutbox.subtitle,
      content: dict.projects.inoutbox.content,
      images: [
        "/projects/iobox/inout-login.png",
        "/projects/iobox/main.png",
        "/projects/iobox/shop-main.png",
        "/projects/iobox/uncle-main.png",
        "/projects/iobox/vendor-main.png",
        "/projects/iobox/inquiry.png",
        "/projects/iobox/uncle-app-1.png",
        "/projects/iobox/uncle-app-2.png",
      ],
    },
    {
      title: dict.projects.campi.title,
      subtitle: dict.projects.campi.subtitle,
      content: dict.projects.campi.content,
      images: ["/projects/campi/feed.jpg", "/projects/campi/my-page.jpg"],
    },
    {
      title: dict.projects.virtualTryOn.title,
      subtitle: dict.projects.virtualTryOn.subtitle,
      content: dict.projects.virtualTryOn.content,
      images: ["/projects/try-on.png"],
    },
    {
      title: dict.projects.intellisysWebsite.title,
      subtitle: dict.projects.intellisysWebsite.subtitle,
      content: dict.projects.intellisysWebsite.content,
      images: ["/projects/intellisys.png"],
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
                    className={`w-5 h-5 transform transition-transform ${expandedIndex === idx || idx < 3 ? "rotate-180" : ""}`}
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

              {(expandedIndex === idx ||
                (expandedIndex === null && idx < 3)) && (
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
