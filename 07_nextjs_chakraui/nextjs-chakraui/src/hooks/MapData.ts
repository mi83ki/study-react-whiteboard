import MapNode from "./MapNode";

/**
 * マップデータ管理クラス
 */
export default class MapData {
  /** ノードリスト */
  private _nodes: MapNode[] = [];

  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * ノードリストを取得する
   */
  get nodes(): MapNode[] {
    return this._nodes;
  }

  /**
   * ノードを追加する
   * @param x x座標
   * @param y y座標
   */
  addNode(x: number, y: number, category: string = "DEFAULT") {
    let node: MapNode = new MapNode(x, y, category);
    this._nodes.push(node);
  }
}
