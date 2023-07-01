"use client";

import { useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";

export default function MapCanvas() {
  const [selectedTool, setSelectedTool] = useState<string>("selection");
  const [shapes, setShapes] = useState<any[]>([]);

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleStageClick = (event: any) => {
    const { offsetX, offsetY } = event.evt;
    const newShape = {
      type: "rect",
      x: offsetX,
      y: offsetY,
      width: 100,
      height: 50,
      fill: "white",
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
      >
        <Layer>
          {shapes.map((shape, index) => {
            if (shape.type === "rect") {
              return (
                <Rect
                  key={index}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.fill}
                  draggable
                />
              );
            }
            // Add more shape types (e.g., circle) here if needed
            return null;
          })}
          <Text text="Hello, Draw.io!" x={20} y={20} />
        </Layer>
      </Stage>
    </div>
  );
}
