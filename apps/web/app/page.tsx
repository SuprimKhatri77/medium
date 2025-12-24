"use client";

import { Spinner } from "@/components/ui/spinner";
import { API_URL } from "../utils/base-url";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isPending } = useQuery<{ success: boolean; message: string }>({
    queryKey: ["home"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/`, { credentials: "include" });
      const data = await res.json();
      return data;
    },
  });
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>No data found.</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>{JSON.stringify(data)}</h1>
      <p>{data.success ? "true" : "false"}</p>
      <p>{data.message}</p>
    </div>
  );
}
