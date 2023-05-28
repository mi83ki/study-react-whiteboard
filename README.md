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

## Next.jsプロジェクトの作成

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

## Next.jsアプリの起動

以下のコマンドでNext.jsアプリを起動し、<http://localhost:3000/>にアクセスする

~~~bash
npm run dev
~~~
