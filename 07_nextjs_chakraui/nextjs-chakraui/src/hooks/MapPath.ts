import { v4 as uuidv4 } from "uuid";
import MapNode from "./MapNode";

/**
 * パスクラス
 */
export default class MapPath {
  /** パスID */
  id: string = "";
  /** 始点 */
  start: MapNode | null = null;
  /** 終点 */
  end: MapNode | null = null;
  /** 線幅 */
  strokeWidth: number = 50;

  /**
   * コンストラクタ
   * @param x x座標
   * @param y y座標
   */
  constructor(start: MapNode | null, end: MapNode | null = null) {
    this.id = uuidv4();
    this.start = start;
    this.end = end;
  }
}
