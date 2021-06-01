import React from "react";
import { Stage, Layer, Line } from "react-konva";

const Canvas = () => {
  const [tool, setTool] = React.useState("pen");
  const [lines, setLines] = React.useState([]);
  const [height, setHeight] = React.useState(window.innerHeight);

  const isDrawing = React.useRef(false);


  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let newLine = lines;
    let size = lines.length - 1;
    let lastLine = lines[size];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    newLine[size] = lastLine;
    setLines(newLine.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const calculateHeight = () => {
    if (window.innerHeight + window.scrollY > height) {
      setHeight(window.innerHeight + window.scrollY);
      return window.innerHeight + window.scrollY;
    }
    return height;
  }

  return (
    <div>
      <div className="canvas">
      <Stage
        width={window.innerWidth}
        height={calculateHeight()}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        style={{ position: "absolute", top: "5px", left: "5px" }}
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      </div>
    </div>
  );
};

export default Canvas;
