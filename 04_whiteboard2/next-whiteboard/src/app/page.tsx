import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [cards, setCards] = useState({
    id1: { t: "Wash", x: 100, y: 100 },
    id2: { t: "your hands", x: 200, y: 300 },
  });
  const update = (key, card) => setCards({ ...cards, [key]: card });

  const [dragging, setDragging] = useState({ key: "", x: 0, y: 0 });
  const [editMode, setEditMode] = useState({ key: "" });

  return (
    <main className={styles.main}>
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
    </main>
  )
}
