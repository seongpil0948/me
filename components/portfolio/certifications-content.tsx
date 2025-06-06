import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

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
              backgroundColor: "#FFFAF0",
              borderColor: "#E8E8E5",
            }}
          >
            <CardBody className="p-0">
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#262626" }}
              >
                {cert.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: "#787872" }}>
                {cert.org}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#525250" }}>
                  {cert.date}
                </span>
                <Chip
                  size="sm"
                  style={{
                    backgroundColor:
                      cert.status === "certified" ? "#E5F7F0" : "#FFF3D1",
                    color: cert.status === "certified" ? "#00A367" : "#A37800",
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
