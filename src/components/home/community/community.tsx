'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './community.module.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import { BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaInstagram, FaGithub, FaFacebookF } from "react-icons/fa6";
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus';
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from '@/src/app/lib/font';


export function Community() {
    const commsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const soc1Ref = useRef<HTMLAnchorElement>(null);
    const soc2Ref = useRef<HTMLAnchorElement>(null);
    const soc3Ref = useRef<HTMLAnchorElement>(null);
    const soc4Ref = useRef<HTMLAnchorElement>(null);
    const soc5Ref = useRef<HTMLAnchorElement>(null);
    const soc6Ref = useRef<HTMLAnchorElement>(null);
    const soc7Ref = useRef<HTMLAnchorElement>(null);
    const soc8Ref = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
          const root = commsRef.current;
            if (!root || !textRef.current) return;
    
            const io = new IntersectionObserver(
                  (entries, observer) => {
                    if (!entries[0].isIntersecting) return;
                    observer.disconnect(); 
            
                    document.fonts.ready.then(() => {
                        root.style.visibility = 'visible';
                      const { words } = splitText(textRef.current!);
                      animate(
                        words,
                        { opacity: [0, 1], y: [10, 0] },
                        { type: 'spring', duration: 2, bounce: 0, delay: stagger(0.05) }
                      );
                      animate(
                        soc1Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .4, duration: 0.4 } 
                      );
                      animate(
                        soc2Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .5, duration: 0.4 } 
                      );
                      animate(
                        soc3Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .6, duration: 0.4 }
                      );
                      animate(
                        soc4Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .7, duration: 0.4 }
                      );
                      animate(
                        soc5Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .8, duration: 0.4 }
                      );
                      animate(
                        soc6Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: .9, duration: 0.4 }
                      );
                      animate(
                        soc7Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: 1, duration: 0.4 }
                      );
                      animate(
                        soc8Ref.current!,
                        { opacity: [0, 1], y: [10, 0] },
                        { delay: 1.1, duration: 0.4 }
                      );
                    });
                  },
                  { threshold: 0.1 }  
                );
            
                io.observe(root);
                return () => io.disconnect();
          }, []);

  return (
      <div className={`${styles.community}`} ref={commsRef}>
        <div className={`${styles.header}`}>
            <h2 className={`${Mont_Bold.className} mt-2 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl uppercase`} ref={textRef}>Join our community</h2>
        </div>
        <div className={`${styles.socials}`}>
            <div className={`${styles.icons}`}>
            <Link href={`https://x.com/ChainTradeLLC`} className={`${styles.x} ${styles.icon}`} ref={soc1Ref}><BsTwitterX /></Link>
            <Link href={`https://t.me/chaintrade_llc`} className={`${styles.telegram} ${styles.icon}`} ref={soc2Ref}><FaTelegramPlane /></Link>
            <Link href={`https://www.linkedin.com/company/chain-trade-llc`} className={`${styles.linkedin} ${styles.icon}`} ref={soc3Ref}><FaLinkedinIn /></Link>
            <Link href={`https://www.instagram.com/chaintradellc/`} className={`${styles.instagram} ${styles.icon}`} ref={soc4Ref}><FaInstagram /></Link>
            <Link href={`https://github.com/ChainTrade-Blockchain`} className={`${styles.github} ${styles.icon}`} ref={soc5Ref}><FaGithub /></Link>
            <Link href={`https://web.facebook.com/profile.php?id=61576479951529`} className={`${styles.facebook} ${styles.icon}`} ref={soc6Ref}><FaFacebookF /></Link>
            <Link href={`https://web.facebook.com/profile.php?id=61576479951529`} className={`${styles.tiktok} ${styles.icon}`} ref={soc7Ref}><FaTiktok /></Link>
            <Link href={`https://www.youtube.com/@ChainTrade`} className={`${styles.facebook} ${styles.icon}`} ref={soc8Ref}><FaYoutube /></Link>
            </div>
        </div>
      </div>
  );
}