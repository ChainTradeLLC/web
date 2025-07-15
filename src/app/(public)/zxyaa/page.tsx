'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Button } from '@/src/components/ui/button';
import { fireCelebration } from '@/src/app/lib/confettiPresets';

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const send = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const res = await fetch(`/api/mail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        console.log('Newsletter response:', data);
  
      if (res.ok) {
      console.log('Newsletter Data:', data)
      setTimeout(async () => await fireCelebration(), 3000)
      } else {
          console.log(`error`)
      }
    };

  return (
    <div className={`text-center`}>
        <div className={`relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32`}>
        <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => send(e)}>Send Newsletter</Button>
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#FFC300] to-[#FFC300] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#FFC300] to-[#FFC300] opacity-20"
        />
      </div>
    </div>
    </div>
  );
}