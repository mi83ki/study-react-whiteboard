"use client";
import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const MapCanvas = dynamic(() => import("@/components/MapCanvas"), {
  ssr: false,
});

export default function Home() {
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const targetRef: any = useRef(null);

  /** 読み込み完了コールバックでキャンバスの幅を設定する */
  useEffect(() => {
    if (targetRef !== null && targetRef.current !== null) {
      const prop = targetRef.current.getBoundingClientRect();
      const height = Math.trunc(prop.height);
      setCanvasHeight(height);
    }
  }, []);

  return (
    <div ref={targetRef}>
      <Sidebar>
        <MapCanvas canvasHeight={canvasHeight} />
      </Sidebar>
    </div>
  );
}
