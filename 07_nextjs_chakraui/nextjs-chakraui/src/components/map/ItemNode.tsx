"use client";

import MapNode from "@/hooks/MapNode";
import { Image } from "react-konva";

/**
 * propsの定義
 */
interface ItemNodeProps {
  node: MapNode;
  image: HTMLImageElement | undefined;
  onClickNode: (nodeId: string) => void;
}

/**
 * ノードアイテムのコンポーネント
 * @param props
 * @returns
 */
export default function ItemNode(props: ItemNodeProps) {
  const { node, image, onClickNode } = props;

  const handleClick = () => {
    onClickNode(node.id);
  };

  return (
    <Image
      onClick={handleClick}
      image={image}
      id={node.id}
      x={node.x - node.width / 2}
      y={node.y - node.height / 2}
      width={node.width}
      height={node.height}
      alt=""
    />
  );
}
