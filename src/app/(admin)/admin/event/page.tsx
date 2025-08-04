"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Divider } from "@/src/components/ui/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/src/components/ui/dropdown";
import { Heading } from "@/src/components/ui/heading";
import { Input, InputGroup } from "@/src/components/ui/input";
// import { Link } from '@/components/ui/link'
import { Select } from "@/src/components/ui/select";
import { getEvents } from "../data";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import Modal from "@/src/components/speaker/Modal";
import EventModal from "@/src/components/events/event-modal";

// export const metadata: Metadata = {
//   title: 'Events',
// }

export default function Events() {
  //   let events = await getEvents()
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      console.log("Fetching Events...");
      try {
        const res = await fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        console.log("Fetch response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetch response data:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: Expected an array");
        }

        setEvents(data);
        console.log("Events state updated:", data);
      } catch (err: any) {
        console.error("Fetch Events error:", err);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Events</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search events&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <Modal />
        <EventModal />
        {/* <Button>Create event</Button> */}
      </div>
      {events.length >= 1 && (
        <ul className="mt-10">
          {events.map((event, index) => (
            <li key={event.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={event.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <div aria-hidden="true">
                      <img
                        className="aspect-3/2 rounded-lg shadow-sm"
                        src={event.image}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold text-gray-200">
                      <div>{event.name}</div>
                    </div>
                    <div className="text-xs/6 text-gray-300">
                      {event.date} <span aria-hidden="true">·</span>{" "}
                      {event.location}
                    </div>
                    <div className="text-xs/6 text-gray-400">
                      {event.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* <Badge className="max-sm:hidden" color={event.status === 'On Sale' ? 'lime' : 'zinc'}>
                  {event.status}
                </Badge> */}
                  {/* <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={event.url}>View</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
