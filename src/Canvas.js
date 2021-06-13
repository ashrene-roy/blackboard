/*global chrome*/
import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import styled from 'styled-components';

const CanvasBorder = styled.div`
  border: solid 3px limegreen;
`
const Canvas = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [height, setHeight] = React.useState(window.innerHeight);

  const isDrawing = React.useRef(false);

  let originalFixedElements = new Set();
  let canvas = document.createElement('canvas');

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
  };

  const handleCapture = () => {
    let top = document.getElementById('blackboard-canvas-1234').getBoundingClientRect().top + window.pageYOffset;
    let height = document.getElementById('blackboard-canvas-1234').getBoundingClientRect().height;
    let n = (height / window.innerHeight);
    let screenshots = [];
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
    
  };


  const capture = (j,n,screenshots,context) => {
    let isComplete = (j-n <= 1 && j-n >= 0) ? true : false;
    if (!isComplete) window.scrollTo({top: screenshots[j].scrollTo});
    window.setTimeout(() => {
      if(!isComplete) {
        chrome.runtime.sendMessage({message: 'capture_screenshot'}, (captured) => {
          let dY = window.scrollY;
          _getAllFixedElements();
          let image = new Image();
          image.onload = () => {
            context.drawImage(image, 0, dY, window.innerWidth, window.innerHeight);
          };
          image.src = captured;
          let k = j + 1;
          capture(k,n,screenshots,context);
        });
				
      } else {
        chrome.runtime.sendMessage({message: 'save', image: canvas.toDataURL('image/png')}, () => {
          _cleanup();
        });
      }	
    }, 150);
  };

  const _cleanup = () => {
    for(let element of originalFixedElements) { 
      element.style.display = 'block';
    }
  };
  
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
  };

  return (
    <div>
      <CanvasBorder id="blackboard-canvas-1234">
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
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        <select
          style={{ position: 'absolute', top: '5px', left: '5px' }}
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <button onClick={handleCapture}>Capture</button>
      </CanvasBorder>
    </div>
  );
};

export default Canvas;
