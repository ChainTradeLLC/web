"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./feature.module.scss";
import localFont from "next/font/local";
import Link from "next/link";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";
import Item from "./Item";
import Illustration1 from "./Illustration1";
import Illustration2 from "./Illustration2";

export function Feature() {
  const featureRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = featureRef.current;
    if (!root || !headerRef.current) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        root.style.visibility = "visible";

        document.fonts.ready.then(() => {
          const { words } = splitText(headerRef.current!);
          headerRef.current.style.visibility = "visible";
          animate(
            words,
            { opacity: [0, 1], y: [10, 0] },
            { type: "spring", duration: 2, bounce: 0, delay: stagger(0.05) },
          );
          animate(
            div1Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 0.4, duration: 0.4 },
          );
          animate(
            div2Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 0.6, duration: 0.4 },
          );
          animate(
            div3Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 0.8, duration: 0.4 },
          );
          animate(
            div4Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 1, duration: 0.4 },
          );
        });
      },
      { threshold: 0.06 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${styles.feature}`} ref={featureRef}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.check}>
            <Image
              className={styles.image}
              src="/cosmos-outline.svg"
              fill
              style={{
                objectFit: "fill",
              }}
              alt=""
            />
            <div className={styles.circle}>
              <div className={styles.dot}></div>
            </div>
          </div>
          <h2 className={styles.title}>
            A gateway to a universe of blockchains
          </h2>
        </div>
        <div className="">
          <Item
            className={styles.item}
            classOvarlay={styles.overlay}
            title="Secure, Scalable, and Interoperable"
            content="ChainTrade is built on the Cosmos ecosystem, ensuring high security, scalability, and interoperability with other blockchains"
            icon="/plus.svg"
            gradient="/gradient_1.png"
          >
            <Illustration1 />
          </Item>
          <Item
            className={styles.item}
            classOvarlay={styles.overlay}
            title="EVM (Ethereum Virtual Machine) Compatible"
            content="Deploy EVM-compatible smart contracts, enabling developers and organisations build and deploy decentralized applications (dApps) on chaintrade"
            icon="/plus.svg"
            gradient="/gradient_2.png"
          >
            <Illustration2 />
          </Item>
        </div>
      </div>
    </div>
  );
}
