"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./community.module.scss";
import localFont from "next/font/local";
import Link from "next/link";

export function Community() {
  return (
    <div className={`${styles.community}`}>
      <div className={`${styles.container}`}>
        <div className={styles.head}>
          <h2 className={styles.title}>Join our growing community</h2>
        </div>
        <div className={styles.socials}>
          <Link
            href="https://github.com/ChainTrade-Blockchain"
            target="_blank"
            className={styles.social}
          >
            <Image
              alt="chain background"
              src="/chrome-chains-8.png"
              fill
              style={{
                objectFit: "cover",
              }}
              className={`${styles.chain}`}
            />
            <div className={styles.inner}>
              <svg
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.375"
                  y="0.375"
                  width="26.25"
                  height="26.25"
                  rx="13.125"
                  stroke-width="0.75"
                />
                <path
                  d="M17.375 13.3628H9.875"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3501 10.3506L17.3751 13.3626L14.3501 16.3751"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Github</p>
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/company/chain-trade-llc"
            target="_blank"
            className={styles.social}
          >
            <Image
              alt="chain background"
              src="/chrome-chains-8.png"
              fill
              style={{
                objectFit: "cover",
              }}
              className={`${styles.chain}`}
            />
            <div className={styles.inner}>
              <svg
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.375"
                  y="0.375"
                  width="26.25"
                  height="26.25"
                  rx="13.125"
                  stroke-width="0.75"
                />
                <path
                  d="M17.375 13.3628H9.875"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3501 10.3506L17.3751 13.3626L14.3501 16.3751"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>LinkedIn</p>
            </div>
          </Link>
          <Link
            href="https://t.me/chaintrade_llc"
            target="_blank"
            className={styles.social}
          >
            <Image
              alt="chain background"
              src="/chrome-chains-8.png"
              fill
              style={{
                objectFit: "cover",
              }}
              className={`${styles.chain}`}
            />
            <div className={styles.inner}>
              <svg
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.375"
                  y="0.375"
                  width="26.25"
                  height="26.25"
                  rx="13.125"
                  stroke-width="0.75"
                />
                <path
                  d="M17.375 13.3628H9.875"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3501 10.3506L17.3751 13.3626L14.3501 16.3751"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Telegram</p>
            </div>
          </Link>
          <Link
            href="https://x.com/ChainTradeLLC"
            target="_blank"
            className={styles.social}
          >
            <Image
              alt="chain background"
              src="/chrome-chains-8.png"
              fill
              style={{
                objectFit: "cover",
              }}
              className={`${styles.chain}`}
            />
            <div className={styles.inner}>
              <svg
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.375"
                  y="0.375"
                  width="26.25"
                  height="26.25"
                  rx="13.125"
                  stroke-width="0.75"
                />
                <path
                  d="M17.375 13.3628H9.875"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.3501 10.3506L17.3751 13.3626L14.3501 16.3751"
                  stroke-width="1.125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>x.com</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
