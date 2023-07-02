"use client";

import MapNode from "@/hooks/MapNode";
import { Image, Layer, Text } from "react-konva";

import { useIconImage } from "./useIconImage";

/**
 * リンクアイテムの定義
 */
interface ItemNodesProps {
  nodes: MapNode[];
}

/**
 * ノードアイテムのコンポーネント
 * @param props
 * @returns
 */
export default function ItemNodes(props: ItemNodesProps) {
  const { nodes } = props;
  const nodeImages: { [name: string]: HTMLImageElement | undefined } = {
    DEFAULT: useIconImage("FiCircle", 50),
    CHARGE: useIconImage("FiTarget", 50),
    MISSION_PAD: useIconImage("FiStopCircle", 50),
  };

  return (
    <Layer>
      {nodes.map((node: MapNode, index: number) => {
        return (
          <Image
            image={nodeImages[node.category]}
            key={index}
            x={node.x - node.width / 2}
            y={node.y - node.height / 2}
            width={node.width}
            height={node.height}
            draggable
            alt=""
          />
        );
      })}

      <Text text="Hello, Draw.io!" x={20} y={20} />
    </Layer>
  );
}
