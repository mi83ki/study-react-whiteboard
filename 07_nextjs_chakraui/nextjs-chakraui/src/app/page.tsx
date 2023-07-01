"use client";
import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";
const MapCanvas = dynamic(() => import("@/components/MapCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <Sidebar>
      <MapCanvas />
    </Sidebar>
  );
}
