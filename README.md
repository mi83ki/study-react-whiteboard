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

## Next.jsのチュートリアル

以下のチュートリアルが勉強になる。
<https://nextjs.org/learn/foundations/about-nextjs>

## エラーが出る

nextjsのプロジェクトを作成してサンプルコードをnpm run devすると、エラーになる。

~~~bash
SyntaxError: Unexpected token '??='
    at wrapSafe (internal/modules/cjs/loader.js:1001:16)
    at Module._compile (internal/modules/cjs/loader.js:1049:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:14)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:92:18)
    at Object.<anonymous> (C:\Users\miya\Documents\03_git\study-react-whiteboard\06_nextjs_tutorial\04_nextjs_blog\nextjs-blog\node_modules\next\dist\telemetry\post-payload.js:17:20)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
~~~

node.jsをアップデートすると解決（v14.17.3→v18.16.1）

## App Routerについて

App RouterはNext.js 13.4 で Stable となり本番環境でも利用することができるようになった機能。
ファイル名でルーティングを設定していた既存の Page Router とは全く異なる機能で設定方法も一から学び直す必要がある。
App Routerは積極的にprefetchを行うことで、従来のpagesとは違い直前の画面が表示されて待たされると言うことがほぼなく、即座に遷移が発生するような体験がデフォルトになる。
新たにプロジェクトを作成するのであれば App Router を利用することが推奨されている。

<https://reffect.co.jp/react/next-js-13-app/>
<https://zenn.dev/akfm/articles/next-app-router-navigation>

## Chakra UI

誰でもデザインを簡単に作ることができるデザインコンポーネントライブラリである Chakra UI を勉強する。
参考にさせていただいたURL：<https://zenn.dev/dala/books/nextjs-chatgpt/viewer/chakra>

### インストール

まずNext.jsのプロジェクトを作成する。

~~~bash
npx create-next-app@latest
~~~

プロジェクト名、各種選択は以下で設定

~~~bash
Need to install the following packages:
create-next-app@13.4.4
Ok to proceed? (y) y
√ What is your project named? ... nextjs-chakraui
√ Would you like to use TypeScript with this project? ... Yes
√ Would you like to use ESLint with this project? ... Yes
√ Would you like to use Tailwind CSS with this project? ... No
√ Would you like to use `src/` directory with this project? ... Yes
√ Use App Router (recommended)? ... Yes
√ Would you like to customize the default import alias? ... Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in C:\Users\Mr_te\Documents\01_git\study-react-whiteboard\01_todo\next-todo-app.
~~~

続いてChakra UIをインストールする

~~~bash
cd nextjs-chakraui/
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
~~~

### 初期設定

Chakra UI を使うためには ChakraProvider をアプリケーションのルートに設定する必要がある。
App Router においては app/layout.tsx がルート要素になる。
ここに ChakraProvider を設定する。
<https://zenn.dev/azukiazusa/articles/next-js-app-dir-tutorial>

appディレクトリにProvider.tsxを作成し、以下を記述する。

~~~tsx
// app/Provider.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
~~~

layout.tsxに以下の行を追加する

~~~diff
    // app/layout.tsx
    import Link from "next/link";
+   import Provider from "./Provider";

    export default function RootLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html lang="ja">
        <head />
        <body>
+           <Provider>
                <header>
                    {/* ... */}
+           </Provider>
        </body>
        </html>
    );
    }
~~~

Chakra UI のコンポーネントを使うたびに "use client" を宣言するのは手間がかかる。
app/common/components/index.tsx でまとめて Chatra UI のコンポーネントを export して Client Component として使えるようにする。

~~~tsx
// app/common/components/index.tsx
"use client";
export * from "@chakra-ui/react";
~~~

Chakra UIのコンポーネントを使う場合は以下のように書けば、use clientが不要になる。

~~~tsx
import { Button } from "./common/components";
~~~

## React Icon

React Icons は、Font Awesome や Material、Codicons（VSCode のアイコン）などのアイコンを簡単に利用することができる React 用のライブラリ。
<https://zenn.dev/taichifukumoto/articles/how-to-use-react-icons>

~~~bash
npm install react-icons
~~~

## React Konva

react-konvaは2Dグラフィックスを描くためのJavaScriptライブラリで、canvasをReact風に宣言的に使えるようにしたライブラリ

~~~bash
npm install react-konva konva
~~~

### React KonvaをNextjsで使用すると以下のエラーが発生する

~~~error
./node_modules/konva/lib/index-node.js:4:0
Module not found: Can't resolve 'canvas'
Did you mean './canvas'?
Requests that should resolve in the current directory need to start with './'.
Requests that start with a name are treated as module requests and resolve within module directories (node_modules, C:\Users\miya\Documents\03_git\study-react-whiteboard\07_nextjs_chakraui\nextjs-chakraui).
If changing the source code is not an option there is also a resolve options called 'preferRelative' which tries to resolve these kind of requests in the current directory too.

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/react-konva/lib/ReactKonva.js
./src/components/MapCanvas.tsx
./src/app/page.tsx
~~~

React Konvaはcanvasモジュールを使用するが、その依存関係が明示的でないためにこのエラーが発生するらしい。
これを回避するには、例えば以下のように動的読み込みを使用する必要がある。
<https://github.com/konvajs/react-konva#usage-with-nextjs>

~~~tsx
// components/canvas.tsx
'use client';
import { Stage, Layer, Circle } from 'react-konva';

function Canvas(props) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default Canvas;
~~~

~~~tsx
// page.tsx
'use client';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('../components/canvas'), {
  ssr: false,
});

export default function Page(props) {
  return <Canvas />;
}
~~~
