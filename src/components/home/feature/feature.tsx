'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './feature.module.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus'; 
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from '@/src/app/lib/font';


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
        
                root.style.visibility = 'visible';
        
                document.fonts.ready.then(() => {
                  const { words } = splitText(headerRef.current!);
                  animate(
                    words,
                    { opacity: [0, 1], y: [10, 0] },
                    { type: 'spring', duration: 2, bounce: 0, delay: stagger(0.05) }
                  );
                  animate(
                    div1Ref.current!,
                    { opacity: [0, 1], y: [10, 0] },
                    { delay: .4, duration: 0.4 } 
                  );
                  animate(
                    div2Ref.current!,
                    { opacity: [0, 1], y: [10, 0] },
                    { delay: .6, duration: 0.4 } 
                  );
                  animate(
                    div3Ref.current!,
                    { opacity: [0, 1], y: [10, 0] },
                    { delay: .8, duration: 0.4 }
                  );
                  animate(
                    div4Ref.current!,
                    { opacity: [0, 1], y: [10, 0] },
                    { delay: 1, duration: 0.4 }
                  );
                });
              },
              { threshold: 0.3 }  
            );
        
            io.observe(root);
            return () => io.disconnect();
      }, []);

  return (
      <div className={`${styles.feature}`} ref={featureRef}>
        <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className={`${styles.title} ${Mont_Bold.className} mx-auto mt-1 max-w-2xl text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl`} ref={headerRef}>
          What is Trade like on Chaintrade Blockchain
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2" ref={div1Ref}>
            <div className={`${styles.box} absolute inset-px rounded-lg lg:rounded-l-4xl`}></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white opacity-70 capitalize max-lg:text-center">
                  Smart contract powered transactions
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className={`${styles.bord} absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] shadow-2xl`}>
                  <img
                    className="size-full object-cover object-top"
                    src="/banner.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-4xl"></div>
          </div>
          <div className="relative max-lg:row-start-1" ref={div2Ref}>
            <div className={`${styles.box} absolute inset-px rounded-lg max-lg:rounded-t-4xl`}></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white opacity-70 capitalize max-lg:text-center">Zero risk on buyer funds loss</p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs rounded-xl"
                  src="/placehold-2.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-4xl"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2" ref={div3Ref}>
            <div className={`${styles.box} absolute inset-px rounded-lg`}></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white opacity-70 capitalize max-lg:text-center">Trade without borders</p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs rounded-xl"
                  src="/placehold.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2" ref={div4Ref}>
            <div className={`${styles.box} absolute inset-px rounded-lg max-lg:rounded-b-4xl lg:rounded-r-4xl`}></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white opacity-70 capitalize max-lg:text-center">
                Transperent, open and secure transactions with low fees
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className={`${styles.bord} absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] shadow-2xl`}>
                  <img
                    className="size-full object-cover object-bottom"
                    src="/banner.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
          </div>
        </div>
      </div>
    </div>
      </div>
  );
}