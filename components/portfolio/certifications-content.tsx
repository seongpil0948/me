import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

import { Dictionary, Certification } from "@/types/portfolio";

interface CertificationsContentProps {
  certifications: Certification[];
  dict: Dictionary;
}

export default function CertificationsContent({
  certifications,
  dict,
}: CertificationsContentProps) {
  // Add status to certifications based on their index
  const certsWithStatus = certifications.map((cert, idx) => ({
    ...cert,
    status: idx < 3 ? ("certified" as const) : ("in-progress" as const),
  }));

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {certsWithStatus.map((cert, idx) => (
          <Card
            key={idx}
            className="p-6 border"
            style={{
              backgroundColor: "var(--color-background-secondary)",
              borderColor: "var(--color-border-primary)",
            }}
          >
            <CardBody className="p-0">
              <div className="flex items-start gap-4 mb-4">
                {cert.logo && (
                  <Image
                    alt={`${cert.org} logo`}
                    className="object-contain shrink-0"
                    height={60}
                    src={cert.logo}
                    width={60}
                  />
                )}
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {cert.org}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {cert.date}
                </span>
                <Chip
                  size="sm"
                  style={{
                    backgroundColor:
                      cert.status === "certified"
                        ? "var(--color-success-bg)"
                        : "var(--color-warning-bg)",
                    color:
                      cert.status === "certified"
                        ? "var(--color-success)"
                        : "var(--color-warning)",
                  }}
                  variant="flat"
                >
                  {cert.status === "certified"
                    ? dict.certifications.certified
                    : "In Progress"}
                </Chip>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
