"use client";

import { useState, useEffect, use } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import styles from "./event.module.scss";
import LoadingRipple from "@/src/components/ui/loading";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { FaVideo } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import moment from "moment";
import localFont from "next/font/local";
//@ts-ignore
import NewEventModal from "@/src/components/events/register";
//@ts-ignore
import NewEventModalX from "@/src/components/events/register-x";
//@ts-ignore
import { Nexa_Bold, Mont, Mont_Bold } from "@/src/app/lib/font";
import Link from "next/link";

export default function Page({ params }: { params: any }) {
  const { id }: { id: any } = use(params);
  // console.log("ID use:", id);
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/event/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [id]);

  if (!event) return <LoadingRipple />;

  if (error)
    return <p className="text-red-500 max-w-5xl mx-auto mt-10 p-4">{error}</p>;

  // if (!event)
  //   return (
  //     <p className="text-white max-w-5xl mx-auto mt-10 p-4">Event not found.</p>
  //   );

  return (
    <>
      <div
        className={`${styles.event} relative isolate overflow-hidden py-24 sm:py-32`}
      >
        <div
          aria-hidden="true"
          className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
        >
          <div
            style={{
              clipPath:
                "polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)",
            }}
            className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ffc300] to-[#ffc300] opacity-30"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`${styles.event_header} mx-auto max-w-2xl lg:mx-0`}>
            <p
              className={`${styles.subtext} ${Nexa_Bold.className} text-base/7 font-semibold text-indigo-600`}
            >
              <span>Host:</span> {`ChainTrade`}
            </p>
            <h1
              className={`${styles.title} mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl`}
            >
              {event.title}
            </h1>
            <a
              className={`${styles.sublink} ${Nexa_Bold.className} text-base/7 font-semibold`}
            >
              {/* <NewEventModalX eventId={eventId} /> */}
            </a>
            <div
              className={`${styles.description} prose mt-6 text-xl/8`}
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div className="relative lg:order-last lg:col-span-5 lg:-mt-50 lg:-mr-30">
              <svg
                aria-hidden="true"
                className="absolute -top-160 left-1 -z-10 h-256 w-702 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)] stroke-gray-900/10"
              >
                <defs>
                  <pattern
                    id="e87443c8-56e4-4c20-9111-55b82fa704e3"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path stroke="#664e00" d="M0.5 0V200M200 0.5L0 0.499983" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
              <figure className="">
                <img
                  alt=""
                  src={`${event.image}`}
                  className="aspect-6/5 w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-180"
                />
              </figure>
            </div>
            <div className="max-w-xl text-base/7 text-gray-700 lg:col-span-7">
              <ul
                role="list"
                className={` ${styles.nex} mt-8 max-w-xl space-y-8`}
              >
                <li className="flex gap-x-3">
                  <FaVideo className="mt-1 size-5 flex-none" />
                  <span className={`${styles.nex_span}`}>
                    Location:{" "}
                    <span
                      className={`${Mont_Bold.className} font-semibold uppercase`}
                    >
                      {event.location} | {event.address}
                    </span>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FaClock className="mt-1 size-5 flex-none" />
                  <span className={`${styles.nex_span}`}>
                    Time:{" "}
                    <span
                      className={`${Mont_Bold.className} font-semibold uppercase`}
                    >
                      <time dateTime={event.date} className="">
                        {moment(event.date).format("llll")} (WAT)
                      </time>
                    </span>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FaClock className="mt-1 size-5 flex-none" />
                  <span className={`${styles.nex_span}`}>
                    Registration Link:{" "}
                    <Link
                      href={event.link}
                      target="_blank"
                      className={`font-semibold lowercase underline bg-[#000000] px-3 py-2 rounded-md text-gray-100 italic cursor-pointer hover:bg-[#ffc300] hover:text-gray-900 transition-all duration-300`}
                    >
                      {event?.link}
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
