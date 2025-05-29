'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './landing.module.scss';
import localFont from 'next/font/local';
import Link from 'next/link';
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus'; 
import { GridPattern } from '@/src/components/ui/grid';
import WaitlistModal from '@/src/components/waitlist/modal'
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from '@/src/app/lib/font';


export function Landing() {
  const landingRef = useRef<HTMLDivElement>(null);
  const primaryRef   = useRef<HTMLHeadingElement>(null);
  const secondaryRef   = useRef<HTMLParagraphElement>(null);
  const buttonRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!landingRef.current || !primaryRef.current || !secondaryRef.current) return;

    landingRef.current.style.visibility = 'visible';

    document.fonts.ready.then(() => {
      const { words } = splitText(primaryRef.current!);
      const { words: words2 } = splitText(secondaryRef.current!);

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: 'spring',
          duration: 2,
          bounce: 0,
          delay: stagger(0.05),
        },
      );

      animate(
        words2,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: 'spring',
          duration: 1.5,
          bounce: 0,
          delay: stagger(0.05),
        },
      );

      animate(
        buttonRef.current!,
        { opacity: [0, 1], y: [10, 0] },
        { delay: 1.4, duration: 0.6 }
      );

    });
  }, []);

  return (
      <div className={`${styles.landing}`}>
        <GridPattern
            className="absolute inset-x-0 lg:top-14 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-50 stroke-neutral-950/5"
            yOffset={-96}
            interactive
          />
      <div className="relative isolate px-6 pt-60 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#FFC300] to-[#333333] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-4xl">
          <div className={`${styles.text} text-center`} ref={landingRef}>
            <h1 className={`${styles.primary_text} ${Mont_Bold.className} tracking-tight text-balance uppercase text-5xl`} ref={primaryRef}>
              Powering open, decentralized commerce in Africa
            </h1>
            <p className={`${styles.secondary_text} mt-4 text-pretty px-20`} ref={secondaryRef}>
            Chaintrade is a decentralized blockchain built for commerce, enabling trustless and permissioned transactions on the blockchain. Businesses and individuals can engage in a secure trade environment without intermediaries.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6" ref={buttonRef}>
              {/* <Link href="/" className={`${styles.landing_btn} ${Nexa_Bold.className} rounded-md text-sm font-bold uppercase shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}>
            Join Waitlist
          </Link> */}
          <WaitlistModal />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#FFC300] to-[#333333] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
      </div>
  );
}