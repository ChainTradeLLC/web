"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./footer.module.scss";
import localFont from "next/font/local";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";

const navigation = {
  resources: [
    { name: "Guides", href: "#" },
    { name: "Explorer", href: "#" },
    { name: "Whitepaper", href: "#" },
    { name: "Wallet", href: "#" },
  ],
  publications: [
    { name: "Blog", href: "#" },
    { name: "Media Kits", href: "#" },
  ],
  community: [
    { name: "Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Events", href: "#" },
    { name: "Partnerships", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Terms of service", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "License", href: "#" },
  ],
};

export default function Footer() {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [windowWidth, setWindowWidth] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("xMidYMid slice");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowWidth >= 320 && windowWidth <= 480) {
      setAspectRatio("xMidYMid meet");
    } else if (windowWidth > 480 && windowWidth <= 600) {
      setAspectRatio("xMidYMid meet");
    } else if (windowWidth > 600 && windowWidth <= 768) {
      setAspectRatio("xMidYMid meet");
    } else if (windowWidth > 768 && windowWidth <= 992) {
      setAspectRatio("xMidYMid meet");
    } else if (windowWidth > 992 && windowWidth <= 1200) {
      setAspectRatio("xMidYMid meet");
    } else {
      setAspectRatio("xMidYMid meet");
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   const svgElement = svgRef.current;
  //   if (svgElement) {
  //     const paths = svgElement.querySelectorAll('path');
  //     paths.forEach((path: any) => {
  //       const pathLength = path.getTotalLength();
  //       console.log(`Path length: ${pathLength}`);
  //       // console.log(`Path length: ${paths.length}`);
  //     });
  //   }
  // }, [true]);

  return (
    <footer className={`${styles.footer}`} ref={ref}>
      <div className={`${styles.footer_container}`}>
        <div className={`${styles.footer_column}`}>
          <div className={`${styles.footer_brand}`}>
            <Link href="/" className={`${styles.logo_footer}`}>
              <Image
                alt="ChainTrade Logo"
                src="/icon-2.jpg"
                fill
                style={{
                  objectFit: "cover",
                }}
                className=""
              />
            </Link>
          </div>
          <p className={`${styles.brand_tagline} ${Mont.className}`}>
            The infra for decentralised commerce onchain
          </p>
        </div>

        <div className={`${styles.footer_column} ${styles.footer_links}`}>
          <h4>Community</h4>
          <ul>
            <li>
              <Link href="#">Team</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Media Kits</Link>
            </li>
            <li>
              <Link href="#">Partnerships</Link>
            </li>
            <li>
              <Link href="#">Support</Link>
            </li>
          </ul>
        </div>

        <div className={`${styles.footer_column} ${styles.footer_links}`}>
          <h4>Resources</h4>
          <ul>
            <li>
              <Link href="#">Docs</Link>
            </li>
            <li>
              <Link href="#">Whitepaper</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Explorer</Link>
            </li>
            <li>
              <Link href="#">Ecosystem</Link>
            </li>
          </ul>
        </div>

        <div className={`${styles.footer_column} ${styles.footer_links}`}>
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.footer_bottom}`}>
        <p className={``}>
          &copy; 2025 ChainTrade Blockchain, LLC. All rights reserved.
        </p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-12 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:top-auto lg:-bottom-48 lg:translate-y-0 lg:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-l from-[#333333] to-[#f8f8f8] opacity-25"
        />
      </div>
    </footer>
  );
}
