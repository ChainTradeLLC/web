'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import Link from 'next/link';
import styles from './events.module.scss';
import moment from 'moment';
import LoadingRipple from '@/src/components/ui/loading';

export default function Page() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setError('');
      setLoading(true);
      try {
        const res = await fetch('/api/events', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        console.log('Fetched events:', data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className={`${styles.events}`}>
        <div className={`${styles.events_header} relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32`}>
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl lowercase opacity-80">Events</h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8 opacity-60">
            Join us at our upcoming events to learn more about our mission, meet the team, and explore opportunities to get involved.
          </p>
        </div>
      </div>
    </div>
      {loading ? (
        <LoadingRipple />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-white">No events available.</p>
      ) : (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
            <article
            key={event.id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
          >
            <img alt="" src={event.image} className="absolute inset-0 -z-10 size-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
              <time dateTime={event.date} className="mr-8">
              {moment(event.date).format("llll")} (WAT)
              </time>
              <div className="-ml-4 flex items-center gap-x-4">
                <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="flex gap-x-2.5">
                  <img alt="" src="/icon-2.jpg" className="size-6 flex-none rounded-full bg-white/10" />
                  {event.organizer.name}
                </div>
              </div>
            </div>
            <h3 className="mt-3 text-lg/6 font-semibold text-white">
              <a href={'/'}>
                <span className="absolute inset-0" />
                {event.title}
              </a>
            </h3>
          </article>
          </Link>
          ))}
          </div>
            </div>
          </div>
      )}
    </div>
  );
}