"use client";

import MapNode from "@/hooks/MapNode";
import { Layer } from "react-konva";

import ItemNode from "./ItemNode";
import { useIconImage } from "./useIconImage";

/**
 * リンクアイテムの定義
 */
interface ItemNodesProps {
  onClickNode: (nodeId: string) => void;
  nodes: MapNode[];
}

/**
 * ノードアイテムのコンポーネント
 * @param props
 * @returns
 */
export default function ItemNodes(props: ItemNodesProps) {
  const { onClickNode, nodes } = props;
  const nodeImages: { [name: string]: HTMLImageElement | undefined } = {
    DEFAULT: useIconImage("FiCircle", 50),
    CHARGE: useIconImage("FiTarget", 50),
    MISSION_PAD: useIconImage("FiStopCircle", 50),
  };

  return (
    <Layer>
      {nodes.map((node: MapNode, index: number) => {
        return (
          <ItemNode
            node={node}
            key={index}
            image={nodeImages[node.category]}
            onClickNode={onClickNode}
          />
        );
      })}
    </Layer>
  );
}
