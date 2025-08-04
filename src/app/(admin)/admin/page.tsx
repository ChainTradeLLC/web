import { Stat } from "./stat";
import { Avatar } from "@/src/components/ui/avatar";
import { Heading, Subheading } from "@/src/components/ui/heading";
import { Select } from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getRecentOrders } from "./data";
import { authOptions } from "@/src/app/lib/authOptions";
import { getServerSession } from "next-auth";

async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Heading>Good afternoon, {session?.user?.name}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total event" value="0" change="+0%" />
        <Stat title="Total Blog" value="0" change="+0%" />
        {/* <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" /> */}
      </div>
    </div>
  );
}

export default Admin;
