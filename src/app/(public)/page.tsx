"use client";
import styles from "./home.module.scss";
import { Landing } from "@/src/components/home/landing/landing";
import { Foreground } from "@/src/components/home/foreground/foreground";
import { Feature } from "@/src/components/home/feature/feature";
import { Token } from "@/src/components/home/token/token";
import { Community } from "@/src/components/home/community/community";
import { ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
  return (
    <ParallaxProvider>
      <div className={`${styles.home}`}>
        <Landing />
        <Foreground />
        <Feature />
        <Token />
        <Community />
      </div>
    </ParallaxProvider>
  );
}
