import { v4 as uuidv4 } from "uuid";

/**
 * ノードクラス
 */
export default class MapNode {
  /** ノードID */
  id: string = "";
  /** x座標 */
  x: number = 0;
  /** y座標 */
  y: number = 0;
  /** 幅 */
  width: number = 50;
  /** 高さ */
  height: number = 50;
  /** ノードカテゴリ */
  category: string = "DEFAULT";

  /**
   * コンストラクタ
   * @param x x座標
   * @param y y座標
   */
  constructor(x: number, y: number, category: string = "DEFAULT") {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.category = category;
  }
}
