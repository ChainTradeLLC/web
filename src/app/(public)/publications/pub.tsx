"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./publications.module.scss";
import moment from "moment";
import LoadingRipple from "@/src/components/ui/loading";

export default function Pub() {
  const [publications, setPublications] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublications() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("/api/publication", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        // console.log("Fetched Publications:", data);
        setPublications(Array.isArray(data) ? data : []);
      } catch (err: any) {
        // console.error("Error fetching Publications", err);
        setError("Failed to load Publications");
      } finally {
        setLoading(false);
      }
    }
    fetchPublications();
  }, []);

  return (
    <div className={`${styles.publications}`}>
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
          {/* <svg x="50%" y={-1} className="overflow-visible fill-[#f5f5f5] dark:fill-[#664e00]">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg> */}
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
          className={`${styles.publications_header} relative isolate overflow-hidden py-10 sm:py-12 lg:pb-10 mt-14 lg:mb-2`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl capitalize opacity-80 tex-pretty prose">
                Publications
              </h2>
              <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8 opacity-60">
                Discover our latest publications to gain deeper insights into
                our mission, explore our research, and stay informed about
                innovations shaping the future of trade.
              </p>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingRipple />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : publications.length === 0 ? (
          <p className="text-white">No publications available.</p>
        ) : (
          <div className="py-16 lg:py-24 sm:py-20 lg:pt-10">
            <div className="mx-auto w-full px-6 lg:px-8 ">
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {publications.map((publication) => (
                  <Link
                    href={`/publications/${publication?.slug}`}
                    key={publication?._id}
                    className={`${styles.publications_single}`}
                  >
                    <article
                      key={publication?.id}
                      className="flex flex-col items-start justify-between"
                    >
                      <div className="relative w-full">
                        <img
                          alt=""
                          src={publication?.coverImage}
                          className="aspect-video w-full rounded-2xl bg-[#000000] object-cover sm:aspect-2/1 lg:aspect-3/2 dark:bg-[#000000]"
                        />
                        <div className="absolute inset-0 rounded-2xl inset-ring inset-ring-[#ffc300]/10 dark:inset-ring-white/10" />
                      </div>
                      <div className="flex max-w-xl grow flex-col justify-between">
                        <div className="mt-8 flex items-center gap-x-4 text-xs">
                          <time
                            dateTime={publication.publishedAt}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {moment(publication?.publishedAt).format(
                              "MMMM D, YYYY",
                            )}
                          </time>
                          <div className="relative z-10 rounded-full bg-[#28a745] px-3 py-1.5 font-medium text-[#f5f5f5] hover:bg-[#000000] dark:bg-[#28a745]/60 dark:text-[#f5f5f5] dark:hover:bg-[#000000]">
                            {publication?.type}
                          </div>
                        </div>
                        <div className="group relative grow">
                          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                            <Link href={`/publications/${publication?.slug}`}>
                              <span className="absolute inset-0" />
                              {publication?.title}
                            </Link>
                          </h3>
                          <p
                            className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400"
                            dangerouslySetInnerHTML={{
                              __html: publication?.excerpt,
                            }}
                          />
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                          <img
                            alt=""
                            src={"/icon-2.jpg"}
                            className="size-10 rounded-full bg-gray-100 dark:bg-gray-800"
                          />
                          <div className="text-sm/6">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              <div>
                                <span className="absolute inset-0" />
                                {`ChainTrade`}
                              </div>
                            </p>
                            {/* <p className="text-gray-600 dark:text-gray-400">{``}</p> */}
                          </div>
                        </div>
                      </div>
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
