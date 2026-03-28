"use client";

import { useState } from "react";
import { Tabs } from "@heroui/react";
import type { Dictionary } from "@/types/i18n";

interface PortfolioTabsProps {
  aboutContent: React.ReactNode;
  dict: Dictionary;
  experienceContent: React.ReactNode;
  projectsContent: React.ReactNode;
  skillsCertificationsContent: React.ReactNode;
}

export default function PortfolioTabs({
  aboutContent,
  dict,
  experienceContent,
  projectsContent,
  skillsCertificationsContent,
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
            {dict.tabs.profile}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="skills-certifications">
            {dict.tabs.certifications}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="experience">
            {dict.tabs.experience}
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="projects">
            {dict.tabs.projects}
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
