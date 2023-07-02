"use client";

import MapPath from "@/hooks/MapPath";
import { Layer, Line } from "react-konva";

/**
 * リンクアイテムの定義
 */
interface ItemPathsProps {
  paths: MapPath[];
}

/**
 * パスアイテムのコンポーネント
 * @param props
 * @returns
 */
export default function ItemPaths(props: ItemPathsProps) {
  const { paths } = props;
  return (
    <Layer>
      {paths.map((path: MapPath, index: number) => {
        return (
          <Line
            key={index}
            points={[path.start.x, path.start.y, path.end.x, path.end.y]}
            stroke="rgb(255, 101, 117)"
            opacity={0.3}
            strokeWidth={path.strokeWidth}
          />
        );
      })}
    </Layer>
  );
}
