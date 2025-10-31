"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./events.module.scss";
import moment from "moment";
import LoadingRipple from "@/src/components/ui/loading";

export default function Event() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/event", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        // console.log("Fetched events:", data);
        setEvents(Array.isArray(data) ? data : []);
      } catch (err: any) {
        // console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className={`${styles.events}`}>
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200 dark:stroke-white/10"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-1}
            className="overflow-visible fill-[#f5f5f5] dark:fill-[#664e00]"
          >
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
            className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#cc9c00] to-[#ffc300] opacity-30"
          />
        </div>
        <div
          className={`${styles.events_header} relative isolate overflow-hidden py-10 sm:py-12 lg:pb-10 mt-14 mb-2 xs:mb-0`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl capitalize opacity-80">
                Events
              </h2>
              <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8 opacity-60">
                Join us at our upcoming events to learn more about our mission,
                meet the team, and explore opportunities to get involved.
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
          <div className="py-24 sm:py-32 lg:pt-20">
            <div className="mx-auto w-full px-6 lg:px-8 xs:px-0">
              <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {events.map((event) => (
                  <Link href={`/events/${event?._id}`} key={event?._id}>
                    <article
                      key={event?._id}
                      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
                    >
                      <img
                        alt=""
                        src={event?.image}
                        className="absolute inset-0 -z-10 size-full object-cover"
                      />
                      <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#000000] via-[#ffc300]/40" />
                      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-[#000000]/10 ring-inset" />

                      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                        <time dateTime={event?.date} className="mr-8">
                          {moment(event?.date).format("llll")} (WAT)
                        </time>
                        <div className="-ml-4 flex items-center gap-x-4">
                          <svg
                            viewBox="0 0 2 2"
                            className="-ml-0.5 size-0.5 flex-none fill-white/50"
                          >
                            <circle r={1} cx={1} cy={1} />
                          </svg>
                          <div className="flex gap-x-2.5">
                            <img
                              alt=""
                              src="/icon-2.jpg"
                              className="size-6 flex-none rounded-full bg-white/10"
                            />
                            {`ChainTrade`}
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-3 text-lg/6 font-semibold text-white">
                        <a href={"/"}>
                          <span className="absolute inset-0" />
                          {event?.title}
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
    </div>
  );
}
