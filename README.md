# study-react-whiteboard

Reactでホワイトボードアプリを作成する勉強

## 参考にした情報

- 【100行で出来る】在宅でもブレストがしたいので、オンラインホワイトボード（付箋アプリ）を作ろう
  - <https://qiita.com/numanomanu/items/e0ace008565164c17b75>

- Next.jsインストールメモ
  - <https://gitlab.com/theme20-xsa-cloud/xsa-cloud/-/blob/main/z_personal/den/nextjsTest/my-app/devMemo.md>

## Reactベースのホワイトボードアプリ

以下をindex.htmlで保存してブラウザで開けばOK。

~~~html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>StayHomeBoard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  <script type="text/babel">
    const Board = () => {
      const [cards, setCards] = React.useState({
        id1: { t: "Wash", x: 100, y: 100 },
        id2: { t: "your hands", x: 200, y: 300 },
      });
      const update = (key, card) => setCards({ ...cards, [key]: card });

      const [dragging, setDragging] = React.useState({ key: "", x: 0, y: 0 });
      const [editMode, setEditMode] = React.useState({ key: "" });
      return (
        <div
          style={{ width: "1000px", height: "1000px", position: "relative" }}
          onDrop={(e) => {
            if (!dragging || !cards) return;
            update(dragging.key, { ...cards[dragging.key], x: e.clientX - dragging.x, y: e.clientY - dragging.y });
          }}
          onDragOver={(e) => e.preventDefault()} // enable onDrop event
        >
          {Object.keys(cards).map((key) => (
            <div
              key={key}
              style={{ position: "absolute", top: cards[key].y + "px", left: cards[key].x + "px" }}
              draggable={true}
              onDragStart={(e) => setDragging({ key, x: e.clientX - cards[key].x, y: e.clientY - cards[key].y })}
            >
              {editMode.key === key ? (
                <textarea
                  onBlur={(e) => setEditMode({ key: "" })}
                  onChange={(e) => update(key, { ...cards[key], t: e.target.value })}
                  defaultValue={cards[key].t}
                />
              ) : (
                <div onClick={(e) => setEditMode({ key })}>{cards[key].t}</div>
              )}
            </div>
          ))}
        </div>
      );
    };
    ReactDOM.render(<Board />, document.getElementById("root"));
    </script>
</head>

<body>
  <div id="root" />
</body>

</html>
~~~

## Next.jsで動かす

### Next.jsプロジェクトの作成

以下のコマンドでプロジェクトを作成する

~~~bash
npx create-next-app@latest
~~~

プロジェクト名、各種選択は以下で設定

~~~bash
Need to install the following packages:
create-next-app@13.4.4
Ok to proceed? (y) y
√ What is your project named? ... next-todo-app
√ Would you like to use TypeScript with this project? ... Yes
√ Would you like to use ESLint with this project? ... Yes
√ Would you like to use Tailwind CSS with this project? ... No
√ Would you like to use `src/` directory with this project? ... Yes
√ Use App Router (recommended)? ... Yes
√ Would you like to customize the default import alias? ... No
Creating a new Next.js app in C:\Users\Mr_te\Documents\01_git\study-react-whiteboard\01_todo\next-todo-app.
~~~

### Next.jsアプリの起動

以下のコマンドでNext.jsアプリを起動し、<http://localhost:3000/>にアクセスする

~~~bash
npm run dev
~~~

### useStateでエラーが発生する

以下のエラーが発生した。

~~~text
You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.

   ,-[C:\Users\Mr_te\Documents\01_git\study-react-whiteboard\04_whiteboard2\next-whiteboard\src\app\page.tsx:1:1]
 1 | //"use client"; // This is a client component
 2 | 
 3 | import { useState } from 'react';
   :          ^^^^^^^^
 4 | import styles from './page.module.css';
 5 | 
 6 | export default function Home() {
   `----

Maybe one of these should be marked as a client entry with "use client":
./src\app\page.tsx
~~~

Next.jsではパフォーマンスの向上のため、サーバーコンポーネントには、クライアント固有のコード (たとえば、useStateなどのフック) を含めるべきではないらしい。したがってuseStateを使う場合は、明示的にクライアントコンポーネントであることを宣言する必要がある。\
ファイルの先頭に`"use client";`を追加すると解決する。

~~~diff
+ "use client"; // This is a client component

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [cards, setCards] = useState({
    id1: { t: "Wash", x: 100, y: 100 },
    id2: { t: "your hands", x: 200, y: 300 },
  });
  const update = (key, card) => setCards({ ...cards, [key]: card });
~~~

## Next.jsでDrawio風のアプリ作成

以下のコマンドでプロジェクトを作成する。

~~~bash
npx create-next-app drawio-app
cd drawio-app
npm install react react-dom next react-konva konva
npm install canvas
~~~

このとき、src/ディレクトリは使用しない、Appルーターは使用しないを選択。

~~~bash
√ Would you like to use `src/` directory with this project? ... No
√ Use App Router (recommended)? ... No
~~~


pages/index.tsxファイルを作成し、以下を入力して終了。

~~~tsx
import { useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string>('selection');
  const [shapes, setShapes] = useState<any[]>([]);

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleStageClick = (event: any) => {
    const { offsetX, offsetY } = event.evt;
    const newShape = {
      type: 'rect',
      x: offsetX,
      y: offsetY,
      width: 100,
      height: 50,
      fill: 'white',
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <button
          className={selectedTool === 'selection' ? styles.active : ''}
          onClick={() => handleToolSelect('selection')}
        >
          Selection
        </button>
        <button
          className={selectedTool === 'rectangle' ? styles.active : ''}
          onClick={() => handleToolSelect('rectangle')}
        >
          Rectangle
        </button>
        <button
          className={selectedTool === 'circle' ? styles.active : ''}
          onClick={() => handleToolSelect('circle')}
        >
          Circle
        </button>
      </div>
      <Stage
        width={800}
        height={600}
        onClick={handleStageClick}
      >
        <Layer>
          {shapes.map((shape, index) => {
            if (shape.type === 'rect') {
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
          <Text
            text="Hello, Draw.io!"
            x={20}
            y={20}
          />
        </Layer>
      </Stage>
    </div>
  );
}
~~~

styles/Home.module.cssを以下に変更する。

~~~css
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.toolbar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.toolbar button {
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toolbar button.active {
  background-color: #ccc;
}

.stage {
  border: 1px solid #ccc;
}
~~~
