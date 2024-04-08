"use client";

import useDisplaysStore from "@/middleware/displayStore";
import useFuelPricesStore from "@/middleware/fuelStore";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { setDisplays, displays } = useDisplaysStore();
  const { fetchData } = useFuelPricesStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setDisplays(user.id);
      fetchData();
    }
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={displays} />
    </div>
  );
}
