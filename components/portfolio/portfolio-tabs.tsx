"use client";

import { useState } from "react";
import { Tabs } from "@heroui/react";

interface PortfolioTabsProps {
  aboutContent: React.ReactNode;
  skillsCertificationsContent: React.ReactNode;
  experienceContent: React.ReactNode;
  projectsContent: React.ReactNode;
}

export default function PortfolioTabs({
  aboutContent,
  skillsCertificationsContent,
  experienceContent,
  projectsContent,
}: PortfolioTabsProps) {
  const [selected, setSelected] = useState("about");

  return (
    <Tabs
      className="w-full"
      selectedKey={selected}
      variant="secondary"
      onSelectionChange={(key) => {
        setSelected(String(key));
      }}
    >
      <Tabs.ListContainer>
        <Tabs.List
          aria-label="Portfolio sections"
          className="w-full border-b border-border *:px-8 *:py-3"
        >
          <Tabs.Tab id="about">
            프로필
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="skills-certifications">
            자격
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="experience">
            경력
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="projects">
            프로젝트
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="about">{aboutContent}</Tabs.Panel>
      <Tabs.Panel id="skills-certifications">
        {skillsCertificationsContent}
      </Tabs.Panel>
      <Tabs.Panel id="experience">{experienceContent}</Tabs.Panel>
      <Tabs.Panel id="projects">{projectsContent}</Tabs.Panel>
    </Tabs>
  );
}
