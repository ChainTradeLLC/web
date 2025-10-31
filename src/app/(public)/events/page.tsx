import { Metadata } from "next";
import Event from "./event";

export const metadata: Metadata = {
  title: "Events",
};

export default function Page() {
  return (
    <>
      <Event />
    </>
  );
}
