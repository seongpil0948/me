"use client";

import { Button, Drawer, Link } from "@heroui/react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, DiscordIcon } from "@/components/icons";
import LanguageSwitcher from "@/components/language-switcher";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Brand */}
        <NextLink className="flex items-center gap-2 font-bold text-lg" href="/">
          Sp Choi
        </NextLink>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            aria-label="Discord"
            className="text-default-500 hover:text-default-700"
            href={siteConfig.links.discord}
            rel="noreferrer"
            target="_blank"
          >
            <DiscordIcon />
          </Link>
          <Link
            aria-label="Github"
            className="text-default-500 hover:text-default-700"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </Link>
          <ThemeSwitch />
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center gap-3">
          <Link
            aria-label="Github"
            className="text-default-500"
            href={siteConfig.links.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </Link>
          <ThemeSwitch />
          <LanguageSwitcher />

          {/* Mobile Menu Drawer — trigger button must be first child of Drawer */}
          <Drawer>
            <Button isIconOnly aria-label="Menu" variant="ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content className="w-72" placement="right">
                <Drawer.Dialog>
                  <Drawer.Header>Navigation</Drawer.Header>
                  <Drawer.Body>
                    <div className="flex flex-col gap-4">
                      <Link
                        aria-label="Discord"
                        href={siteConfig.links.discord}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <DiscordIcon /> Discord
                      </Link>
                      <Link
                        aria-label="Github"
                        href={siteConfig.links.github}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <GithubIcon /> Github
                      </Link>
                    </div>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};
