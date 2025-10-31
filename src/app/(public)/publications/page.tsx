import { Metadata } from "next";
import Pub from "./pub";

export const metadata: Metadata = {
  title: "Publications",
};

export default function Page() {
  return (
    <>
      <Pub />
    </>
  );
}
