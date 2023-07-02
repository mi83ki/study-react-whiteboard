"use client";

import MapData from "@/hooks/MapData";
import MapNode from "@/hooks/MapNode";
import { useEffect, useRef, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import ItemLines from "./ItemLines";
import ItemNodes from "./ItemNodes";
import Sidebar from "./Sidebar";

const mapData: MapData = new MapData();

export default function MapCanvas() {
  const heightRef: any = useRef(null);
  const widthRef: any = useRef(null);
  const [selectedTool, setSelectedTool] = useState<string>("selection");
  const [nodes, setNodes] = useState<MapNode[]>(mapData.nodes);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  /** 読み込み完了コールバックでキャンバスの幅を設定する */
  useEffect(() => {
    if (widthRef !== null && widthRef.current !== null) {
      const prop = widthRef.current.getBoundingClientRect();
      const width = Math.trunc(prop.width);
      setCanvasWidth(width);
    }
    if (heightRef !== null && heightRef.current !== null) {
      const prop = heightRef.current.getBoundingClientRect();
      const height = Math.trunc(prop.height);
      setCanvasHeight(height);
    }
  }, []);

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
  };

  /**
   * Stageのクリックイベント
   * @param event
   */
  const handleStageClick = (event: any) => {
    const { offsetX, offsetY } = event.evt;
    mapData.addNode(offsetX, offsetY, "DEFAULT");

    setNodes(mapData.nodes);
  };

  /**
   * マウス押下イベント
   * @param e
   */
  const handleMouseDown = (e: any) => {
    const { offsetX, offsetY } = e.evt;

    // 新しい直線の始点を設定
    setLines([...lines, { points: [offsetX, offsetY] }]);
    setIsDrawing(true);
  };

  /**
   * マウス移動イベント
   * @param e
   * @returns
   */
  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.evt;

    // 直線の終点を追加
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([offsetX, offsetY]);

    // 直線を更新
    const newLines = [...lines];
    newLines.splice(lines.length - 1, 1, lastLine);
    setLines(newLines);
  };

  /**
   * マウスアップイベント
   */
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div ref={heightRef}>
      <Sidebar>
        <div ref={widthRef}>
          <Stage
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleStageClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              <Text text="Hello, Draw.io!" x={20} y={20} />
            </Layer>
            <ItemNodes nodes={nodes} />
            <ItemLines lines={lines} />
          </Stage>
        </div>
      </Sidebar>
    </div>
  );
}
