"use client";

import { useEffect, useRef, useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";

export default function MapCanvas(props: any) {
  const targetRef: any = useRef(null);
  const [selectedTool, setSelectedTool] = useState<string>("selection");
  const [shapes, setShapes] = useState<any[]>([]);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const { canvasHeight } = props;

  /** 読み込み完了コールバックでキャンバスの幅を設定する */
  useEffect(() => {
    if (targetRef !== null && targetRef.current !== null) {
      const prop = targetRef.current.getBoundingClientRect();
      const width = Math.trunc(prop.width);
      setCanvasWidth(width);
    }
  }, []);

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
    <div ref={targetRef}>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
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
