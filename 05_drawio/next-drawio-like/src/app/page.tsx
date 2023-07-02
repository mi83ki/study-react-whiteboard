"use client"; // This is a client component
import { useState } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import styles from './page.module.css';

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
