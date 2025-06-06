"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";

import { Dictionary } from "@/types/portfolio";

interface PortfolioTabsProps {
  dict: Dictionary;
  aboutContent: React.ReactNode;
  skillsContent: React.ReactNode;
  experienceContent: React.ReactNode;
  projectsContent: React.ReactNode;
  certificationsContent: React.ReactNode;
}

export default function PortfolioTabs({
  dict,
  aboutContent,
  skillsContent,
  experienceContent,
  projectsContent,
  certificationsContent,
}: PortfolioTabsProps) {
  const [selected, setSelected] = useState("about");

  console.log("Current selected tab:", selected);

  return (
    <Tabs
      aria-label="Portfolio sections"
      className="w-full"
      variant="underlined"
      classNames={{
        base: "w-full",
        tabList:
          "gap-0 w-full relative rounded-none p-0 border-b border-divider",
        cursor: "w-full",
        tab: "max-w-fit px-8 h-12",
        tabContent: "group-data-[selected=true]:text-[#DC6B4A]",
      }}
      selectedKey={selected}
      onSelectionChange={(key) => {
        console.log("Tab clicked:", key);
        setSelected(String(key));
      }}
    >
      <Tab key="about" title="프로필">
        {aboutContent}
      </Tab>
      <Tab key="skills" title="기술 스택">
        {skillsContent}
      </Tab>
      <Tab key="experience" title="경력">
        {experienceContent}
      </Tab>
      <Tab key="projects" title="프로젝트">
        {projectsContent}
      </Tab>
      <Tab key="certifications" title="자격증">
        {certificationsContent}
      </Tab>
    </Tabs>
  );
}
