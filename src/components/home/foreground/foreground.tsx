'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './foreground.module.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import ContractBg from '@/src/components/contract/contract';
import { FaLock } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus'; 
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from '@/src/app/lib/font';


export function Foreground() {
    const rootRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !h2Ref.current) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect(); 

        root.style.visibility = 'visible';

        document.fonts.ready.then(() => {
          const { words } = splitText(h2Ref.current!);
          h2Ref.current.style.visibility = 'visible';

          animate(
            words,
            { opacity: [0, 1], y: [10, 0] },
            { type: 'spring', duration: 2, bounce: 0, delay: stagger(0.05) }
          );
          animate(
            div1Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: .9, duration: 0.4 } 
          );
          animate(
            div2Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 1.1, duration: 0.4 } 
          );
          animate(
            div3Ref.current!,
            { opacity: [0, 1], y: [10, 0] },
            { delay: 1.3, duration: 0.4 }
          );
        });
      },
      { threshold: 0.1 }  
    );

    io.observe(root);
    return () => io.disconnect();          
  }, []);

  return (
      <div className={`${styles.foreground} isolate`} ref={rootRef}>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
            className="aspect-1108/632 w-277 flex-none bg-linear-to-r from-[#58a279] to-[#ffc91a] opacity-25"
          />
        </div>
        <ContractBg />
        <div className={`${styles.header}`}>
            <h2 className={`${Mont_Bold.className} tracking-tight text-balance uppercase max-xs:text-2xl max-sm:text-4xl max-md:text-4xl text-5xl transform-gpu`} ref={h2Ref}>Pioneering inclusive commerce for all</h2>
        </div>
        <div className={`${styles.lock}`} ref={div1Ref}>
            <FaLock className={`${styles.lock_icon}`} />
            <h3 className={`${Nexa_Bold.className}`}>Trigger Smart contract, Tamper-Proof, <br />and onchain transaction</h3>
        </div>
        <div className={`${styles.private}`} ref={div2Ref}>
            <FaEye className={`${styles.private_icon}`} />
            <h3 className={`${Nexa_Bold.className}`}>Control Transaction <br />Data Visibility</h3>
        </div>
        <div className={`${styles.secure}`} ref={div3Ref}>
            <SiAdguard className={`${styles.secure_icon}`} />
            <h3 className={`${Nexa_Bold.className}`}>No Middlemen, Zero Risk</h3>
        </div>
      </div>
  );
}