"use client";

import { Circle, Layer, Text } from "react-konva";

export default function ItemRects(props: any) {
  const { shapes } = props;
  return (
    <Layer>
      {shapes.map((shape: any, index: number) => {
        if (shape.type === "rect") {
          return (
            <Circle
              key={index}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              stroke="rgb(255, 101, 117)"
              strokeWidth={10}
              draggable
            />
          );
        }
        // Add more shape types (e.g., circle) here if needed
        return null;
      })}

      <Text text="Hello, Draw.io!" x={20} y={20} />
    </Layer>
  );
}
