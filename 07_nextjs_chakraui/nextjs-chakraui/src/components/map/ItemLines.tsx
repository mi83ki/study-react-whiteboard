"use client";

import { Layer, Line } from "react-konva";

export default function ItemLines(props: any) {
  const { lines } = props;
  return (
    <Layer>
      {lines.map((line: any, index: number) => (
        <Line key={index} points={line.points} stroke="black" strokeWidth={2} />
      ))}
    </Layer>
  );
}
