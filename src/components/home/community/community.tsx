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

const Nexa_Bold = localFont({
    src: '../../../app/assets/fonts/nexaserif_trial-extrabold.otf',
    display: 'swap',
});

const Mont = localFont({
    src: '../../../app/assets/fonts/mont-extralightdemo.otf',
    display: 'swap',
});

const Mont_Bold = localFont({
    src: '../../../app/assets/fonts/mont-heavydemo.otf',
    display: 'swap',
});


export function Community() {
    const commsRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const soc1Ref = useRef<HTMLDivElement>(null);
    const soc2Ref = useRef<HTMLDivElement>(null);
    const soc3Ref = useRef<HTMLDivElement>(null);
    const soc4Ref = useRef<HTMLDivElement>(null);
    const soc5Ref = useRef<HTMLDivElement>(null);
    const soc6Ref = useRef<HTMLDivElement>(null);
    const soc7Ref = useRef<HTMLDivElement>(null);
    const soc8Ref = useRef<HTMLDivElement>(null);

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
                  { threshold: 0.3 }  
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
            <div className={`${styles.x} ${styles.icon}`} ref={soc1Ref}><BsTwitterX /></div>
            <div className={`${styles.telegram} ${styles.icon}`} ref={soc2Ref}><FaTelegramPlane /></div>
            <div className={`${styles.linkedin} ${styles.icon}`} ref={soc3Ref}><FaLinkedinIn /></div>
            <div className={`${styles.instagram} ${styles.icon}`} ref={soc4Ref}><FaInstagram /></div>
            <div className={`${styles.github} ${styles.icon}`} ref={soc5Ref}><FaGithub /></div>
            <div className={`${styles.facebook} ${styles.icon}`} ref={soc6Ref}><FaFacebookF /></div>
            <div className={`${styles.facebook} ${styles.icon}`} ref={soc7Ref}><FaTiktok /></div>
            <div className={`${styles.facebook} ${styles.icon}`} ref={soc8Ref}><FaYoutube /></div>
            </div>
        </div>
      </div>
  );
}