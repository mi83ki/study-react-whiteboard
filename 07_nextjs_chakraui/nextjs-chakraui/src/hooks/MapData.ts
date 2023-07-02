import MapNode from "./MapNode";
import MapPath from "./MapPath";

/**
 * マップデータ管理クラス
 */
export default class MapData {
  /** ノードリスト */
  private _nodes: MapNode[] = [];
  /** パスリスト */
  private _paths: MapPath[] = [];

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
   * @returns ノードID
   */
  addNode(x: number, y: number, category: string = "DEFAULT"): string {
    let node: MapNode = new MapNode(x, y, category);
    this._nodes.push(node);
    return node.id;
  }

  /**
   * IDを指定してノードを取得する
   * @param id ノードID
   * @returns
   */
  getNode(id: string): MapNode | undefined {
    return this._nodes.find((element) => element.id === id);
  }

  /**
   * 指定した距離の範囲内で最も近いノードを取得する
   * @param x
   * @param y
   * @param distance
   * @returns
   */
  searchNode(x: number, y: number, distance: number = 50 / 2): MapNode | null {
    let minDistance = distance;
    let retNode: MapNode | null = null;
    this._nodes.forEach((node: MapNode) => {
      const d = node.calcDistance(x, y);
      if (d <= minDistance) {
        minDistance = d;
        retNode = node;
        console.log({
          action: "searchNode",
          minDistance: minDistance,
          retNode: retNode,
        });
      }
    });
    return retNode;
  }

  /**
   * パスリストを取得する
   */
  get paths(): MapPath[] {
    return this._paths;
  }

  /**
   * パスを追加する
   * @param x x座標
   * @param y y座標
   * @returns パスID
   */
  addPath(start: MapNode | null, end: MapNode | null = null): string {
    let path: MapPath = new MapPath(start, end);
    this._paths.push(path);
    console.log({ action: "addPath", paths: this._paths });
    return path.id;
  }

  /**
   * パスの終端を設定する
   * @param id
   * @param x
   * @param y
   * @returns
   */
  setPathEnd(id: string, end: MapNode): boolean {
    const path = this._paths.find((element) => element.id === id);
    if (path === undefined) return false;
    path.end = end;
    return true;
  }

  /**
   * パスを削除する
   * @param id パスID
   */
  deletePath(id: string): boolean {
    let deleteIndex = null;
    this._paths.forEach((path: MapPath, index: number) => {
      if (path.id === id) {
        deleteIndex = index;
      }
    });
    if (deleteIndex !== null) {
      this._paths.splice(deleteIndex, 1);
      console.log({
        action: "deletePath",
        deleteIndex: deleteIndex,
        paths: this._paths,
      });
      return true;
    }
    return false;
  }
}
