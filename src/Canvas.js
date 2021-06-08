/*global chrome*/
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

  let originalFixedElements = new Set();

  const handleCapture = () => {
    let top = document.getElementById('blackboard-canvas').getBoundingClientRect().top + window.pageYOffset;
    let height = document.getElementById('blackboard-canvas').getBoundingClientRect().height;
    let n = height / window.innerHeight;
    let screenshots = [];
    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = height;
    let context = canvas.getContext('2d');
    for (let i = 0; i<n; i++) {
      screenshots[i] = {
        scrollTo: top,
      };
      top = top + window.innerHeight;
    }

    capture(0,n, screenshots, context);
    
    window.setTimeout(() => {
      chrome.runtime.sendMessage({directive: "save", image: canvas.toDataURL('image/png')}, (captured) => {
        _cleanup();
      });
    },6000);
    
}


const capture = (j,n,screenshots,context) => {
  window.scrollTo({top: screenshots[j].scrollTo});
  window.setTimeout(() => {
    chrome.runtime.sendMessage({directive: "capture_screenshot"}, (captured) => {
      let dY = window.scrollY;
      _getAllFixedElements();
      if (captured && j<n) {
          let image = new Image();
          image.onload = () => {
            context.drawImage(image, 0, dY, window.innerWidth, window.innerHeight);
          };
          image.src = captured;
          let k = j + 1;
          capture(k,n,screenshots,context);
      }
    });
    }, 150);
  }

  const _cleanup = () => {
    for(let element of originalFixedElements) { 
      element.style.display = 'block';
    }
  }
  
  const _getAllFixedElements = () => {
    let elems = document.body.getElementsByTagName('*');
    let length = elems.length;
    for(let i = 0; i < length; i++) { 
      let elemStyle = window.getComputedStyle(elems[i]);
      if(elemStyle.getPropertyValue('position') === 'fixed' || elemStyle.getPropertyValue('position') === 'sticky' ) { 
        elems[i].style.display = 'none';
        originalFixedElements.add(elems[i]);
      } 
    }
  }

  return (
    <div>
      <div className="canvas" id="blackboard-canvas">
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
      <button onClick={handleCapture}>Capture</button>
      </div>
    </div>
  );
};

export default Canvas;
