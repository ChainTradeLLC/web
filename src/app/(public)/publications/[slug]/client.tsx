"use client";
import { motion, useSpring, useScroll } from "motion/react";
import styles from "./publication.module.scss";
import dayjs from "dayjs";
import Image from "next/image";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";

export default function Client({ publication }: { publication: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ffc300",
        }}
      />
      <div className={`${styles.publication}`}>
        <div className={`${styles.header}`}>
          <div className={`${styles.sub} ${Nexa_Bold.className} text-base/7`}>
            <span className="font-bold rounded-lg bg-[#2e8b57] py-2 px-4">
              {publication?.type}
            </span>{" "}
            <span
              className={`${Mont.className} ml-2 text-[#f5f5f5] font-medium`}
            >
              {dayjs(publication?.publishedAt).format("dddd, MMMM D, YYYY")}
            </span>
          </div>
          <h1
            className={`${styles.title} ${Mont_Bold.className} mt-4 text-4xl font-extrabold tracking-tight text-pretty sm:text-7xl capitalize`}
          >
            {publication?.title}
          </h1>
          <div
            className={`${styles.author} ${Mont_Bold.className} relative mt-2 flex items-center gap-x-4 justify-self-start`}
          >
            <img alt="" src={"/icon-2.jpg"} className="size-16 rounded-full" />
            <div className="text-sm/6 lg:text-lg">
              <p className="font-semibold">
                <div>
                  <span className="absolute inset-0" />
                  {`ChainTrade`}
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.body}`}>
          <div className={`${styles.img}`}>
            <Image
              alt="image publication"
              src={`${publication?.coverImage}`}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="aspect-video rounded-xl"
            />
          </div>
          <div
            className={`${styles.content} prose mt-6 text-xl/8 text-pretty`}
            dangerouslySetInnerHTML={{ __html: publication?.content }}
          ></div>
        </div>
      </div>
    </>
  );
}
