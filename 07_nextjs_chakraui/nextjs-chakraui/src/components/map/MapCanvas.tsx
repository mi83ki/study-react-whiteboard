"use client";

import MapData from "@/hooks/MapData";
import MapNode from "@/hooks/MapNode";
import { useEffect, useRef, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import ItemLines from "./ItemLines";
import ItemNodes from "./ItemNodes";
import Sidebar, { LinkItemProps } from "./Sidebar";
import {
  FiCircle,
  FiMinus,
  FiMousePointer,
  FiPenTool,
  FiStopCircle,
  FiTarget,
  LiaRouteSolid,
} from "./icons";

const mapData: MapData = new MapData();

/**
 * サイドバーのナビアイテム
 */
const naviItems: Array<LinkItemProps> = [
  { id: "NAVI_SELECT", name: "選択", icon: FiMousePointer },
  { id: "NAVI_NODE_CHARGE", name: "充電ステーション", icon: FiTarget },
  { id: "NAVI_NODE_MISSION_PAD", name: "ミッションパッド", icon: FiStopCircle },
  { id: "NAVI_NODE_DEFAULT", name: "ノード", icon: FiCircle },
  { id: "NAVI_PATH", name: "パス", icon: FiMinus },
  { id: "NAVI_PEN", name: "お絵描き", icon: FiPenTool },
  { id: "NAVI_TASK", name: "タスク", icon: LiaRouteSolid },
];

/**
 * マップキャンバスコンポーネント
 * @returns
 */
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

  /**
   * サイドバーがクリックされたときのコールバック
   * @param name
   */
  const handleSidebarClick = (name: string) => {
    console.log({ action: "handleSidebarClick", name: name });
    setSelectedTool(name);
  };

  /**
   * Stageのクリックイベント
   * @param event
   */
  const handleStageClick = (event: any) => {
    const { offsetX, offsetY } = event.evt;
    switch (selectedTool) {
      case "NAVI_NODE_CHARGE":
        mapData.addNode(offsetX, offsetY, "CHARGE");
        setNodes(() => [...mapData.nodes]);
        break;
      case "NAVI_NODE_MISSION_PAD":
        mapData.addNode(offsetX, offsetY, "MISSION_PAD");
        setNodes(() => [...mapData.nodes]);
        break;
      case "NAVI_NODE_DEFAULT":
        mapData.addNode(offsetX, offsetY, "DEFAULT");
        setNodes(() => [...mapData.nodes]);
        break;
      default:
        break;
    }
    console.log({ action: "handleStageClick", nodes: nodes.length });
  };

  /**
   * マウス押下イベント
   * @param e
   */
  const handleMouseDown = (e: any) => {
    console.log({ action: "handleMouseDown", msg: "called" });
    const { offsetX, offsetY } = e.evt;

    switch (selectedTool) {
      case "NAVI_PEN":
        // 新しい直線の始点を設定
        setLines([...lines, { points: [offsetX, offsetY] }]);
        setIsDrawing(true);
        break;
      default:
        break;
    }
  };

  /**
   * マウス移動イベント
   * @param e
   * @returns
   */
  const handleMouseMove = (e: any) => {
    //console.log({ action: "handleMouseMove", msg: "called" });
    switch (selectedTool) {
      case "NAVI_PEN":
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.evt;
        // 直線の終点を追加
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([offsetX, offsetY]);
        // 直線を更新
        const newLines = [...lines];
        newLines.splice(lines.length - 1, 1, lastLine);
        setLines(newLines);
        break;
      default:
        break;
    }
  };

  /**
   * マウスアップイベント
   */
  const handleMouseUp = () => {
    console.log({ action: "handleMouseUp", msg: "called" });
    switch (selectedTool) {
      case "NAVI_PEN":
        setIsDrawing(false);
        break;
      default:
        break;
    }
  };

  /**
   * ノードクリックイベント
   * @param nodeId ノードID
   */
  const handleNodeClick = (nodeId: string) => {
    console.log({ action: "handleNodeClick", nodeId: nodeId });
    switch (selectedTool) {
      case "NAVI_PATH":
        setIsDrawing(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={heightRef}>
      <Sidebar naviItems={naviItems} onClickNavi={handleSidebarClick}>
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
            <ItemNodes onClickNode={handleNodeClick} nodes={nodes} />
            <ItemLines lines={lines} />
          </Stage>
        </div>
      </Sidebar>
    </div>
  );
}
