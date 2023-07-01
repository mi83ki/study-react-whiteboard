"use client";
import dynamic from "next/dynamic";
const MapCanvas = dynamic(() => import("@/components/map/MapCanvas"), {
  ssr: false,
});

export default function Home() {
  return <MapCanvas />;
}
