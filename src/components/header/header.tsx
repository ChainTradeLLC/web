"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import Link from "next/link";
import styles from "./header.module.scss";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  MagnifyingGlassCircleIcon,
  Bars3Icon,
  QuestionMarkCircleIcon,
  CodeBracketSquareIcon,
  CameraIcon,
  NewspaperIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";

const resources = [
  {
    name: "Docs",
    description:
      "Get a headstart on navigating your way around ChainTrade blockchain",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
  {
    name: "Github",
    description: "Chaintrade open-source code repository",
    href: "#",
    icon: CodeBracketSquareIcon,
  },
  {
    name: "Brand Kits",
    description: "Press and Media assets for all publications",
    href: "#",
    icon: CameraIcon,
  },
  {
    name: "WhitePaper",
    description: "Official whitepaper of chaintrade blockchain",
    href: "#",
    icon: NewspaperIcon,
  },
  {
    name: "Explorer",
    description: "Explore the network ledger and transactions",
    href: "#",
    icon: MagnifyingGlassCircleIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact us", href: "#", icon: PhoneIcon },
];
const community = [
  {
    name: "Team",
    href: "#",
    description:
      "Meet the passionate team behind our mission to drive blockchain innovation and empower global african commerce.",
  },
  {
    name: "Careers",
    href: "#",
    description:
      "Join our mission to shape the future of blockchain. Explore open roles and career opportunities.",
  },
  {
    name: "Events",
    href: "/events",
    description:
      "Stay updated with our latest events, webinars, and insights from our blockchain experts.",
  },
  {
    name: "Partnerships",
    href: "#",
    description:
      "Explore collaboration opportunities to build a stronger blockchain ecosystem with our partners.",
  },
  {
    name: "Support",
    href: "#",
    description:
      "Access our support team and community forums for help with your blockchain journey.",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 111);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  return (
    <>
      <header
        className={`${styles.header} ${sticky ? `${styles.sticky}` : ""}`}
      >
        <nav
          aria-label="Global"
          className="mx-auto flex items-center justify-between"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className={`${styles.logo}`}>
              <Image
                alt="ChainTrade Logo"
                src="/main-2.png"
                fill
                style={{
                  objectFit: "cover",
                }}
                className=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold uppercase outline-none">
                <h5 className={`${styles.txt} opacity-80`}>Resources</h5>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400 opacity-80"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className={`${styles.pop} absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in`}
              >
                <div className="p-4">
                  {resources.map((item) => (
                    <div
                      key={item.name}
                      className={`${styles.pop_body} group relative flex gap-x-6 rounded-lg p-4 text-sm/6`}
                    >
                      <div
                        className={`${styles.pop_icon} mt-1 flex size-11 flex-none items-center justify-center rounded-lg`}
                      >
                        <item.icon aria-hidden="true" className="size-6" />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className={`${styles.pop_header} ${Mont.className} block font-semibold uppercase`}
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className={`${styles.pop_descripton} mt-1`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`${styles.pop_footer} grid grid-cols-2 divide-x divide-gray-900`}
                >
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`${styles.pop_footer_text} flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold`}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="size-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm/6 font-semibold uppercase">
              <h5 className={`${styles.txt} opacity-80`}>Ecosystem</h5>
            </a>

            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold uppercase outline-none">
                <h5 className={`${styles.txt} opacity-80`}>Community</h5>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400 opacity-80"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className={`${styles.pop} absolute top-full -left-8 z-10 mt-3 w-96 rounded-3xl p-4 shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in`}
              >
                {community.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.pop_body} relative rounded-lg p-4`}
                  >
                    <a
                      href={item.href}
                      className={`${styles.pop_header} ${Mont.className} block text-sm/6 font-semibold`}
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className={`${styles.pop_descripton}mt-1 text-sm/6`}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm/6 font-semibold uppercase">
              <h5 className={`${styles.txt} opacity-80`}>Blog</h5>
            </a>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className={`${styles.signup} ${Nexa_Bold.className}`}>
              <span className={styles.title}>Launch App</span>
              <span className={styles.circle}></span>
            </button>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel
            className={`${styles.mob} fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <Link href="/" className={`${styles.logo_mobile}`}>
                  <Image
                    alt="ChainTrade Logo"
                    src="/main-2.png"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    className=""
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-100"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`${styles.mob_body} group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base/7 font-semibold`}
                      >
                        <div
                          className={`${styles.mob_icon} flex size-11 flex-none items-center justify-center rounded-lg`}
                        >
                          <item.icon aria-hidden="true" className="size-6" />
                        </div>
                        <span
                          className={`${styles.mob_header} ${Mont.className} uppercase`}
                        >
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="space-y-2 py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-50"
                    >
                      Ecosystem
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-50"
                    >
                      Blog
                    </a>

                    {community.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6 w-full">
                    <button
                      className={`${styles.signup} ${Nexa_Bold.className}`}
                    >
                      <span className={styles.title}>Launch App</span>
                      <span className={styles.circle}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.mob_footer} sticky bottom-0 grid grid-cols-2 divide-x divide-gray-900 text-center`}
            >
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${styles.mob_footer_text} p-3 text-base/7 font-semibold`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
