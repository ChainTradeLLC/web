"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./token.module.scss";
import localFont from "next/font/local";
import Link from "next/link";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";

export function Token() {
  return (
    <div className={`${styles.token}`}>
      <Image
        alt="background"
        src="/gradient_6.png"
        fill
        style={{
          objectFit: "cover",
        }}
        className={`${styles.layer_1}`}
      />
      <div className={`${styles.token_box}`}>
        <div className={`${styles.token_showcase}`}>
          <Image
            alt="tokens"
            src="/tokens.png"
            fill
            style={{
              objectFit: "cover",
            }}
            className={`${styles.layer_2}`}
          />
        </div>
      </div>
      <div className={`${styles.token_info}`}>
        <h2 className={`${Mont_Bold.className}`}>
          Chaintrade Token{" "}
          <span>
            <i>$CHTR</i>
          </span>
        </h2>
        <p className={`${Mont.className}`}>
          The Chaintrade Token{" "}
          <span>
            <i>$CHTR</i>
          </span>{" "}
          is the native utility token of the Chaintrade protocol, designed to
          facilitate transactions, incentivize participation, and govern the
          ecosystem.
        </p>
        <button className={`${styles.landing_btn} ${Nexa_Bold.className}`}>
          <span className={styles.title}>View Tokenomics</span>
          <span className={styles.circle}></span>
        </button>
      </div>
    </div>
  );
}
