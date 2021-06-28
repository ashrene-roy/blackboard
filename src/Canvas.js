import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Toolbox from './components/Toolbox/Toolbox';
import TextBox from './components/TextBox/TextBox';
import { TOOLBOX, ACTIONS, DEFAULT_STROKE_WIDTH, APP_ROOT_ID, APP_CANVAS_ID, APP_TOOLBOX_ID } from './constants/values';
import { DEFAULT_TOOL_COLOUR } from './constants/theme';

const CanvasMain = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  z-index: 2147483647;
  background:none transparent;
  margin: 0;
  padding: 0;
  box-shadow: 0px 0px 0px 3px limegreen inset;
`;

const Canvas = () => {

  const [tool, setTool] = React.useState(TOOLBOX.PEN);
  const [lines, setLines] = React.useState([]);
  const [textBoxes, setTextBoxes] = React.useState([]);
  const [strokeWidth,setStrokeWidth] = React.useState(DEFAULT_STROKE_WIDTH);
  const [colourValue, setColourValue] = React.useState(DEFAULT_TOOL_COLOUR);
  const [isUndoDisabled, setUndoDisabled] = React.useState(false);
  const [isRedoDisabled, setRedoDisabled] = React.useState(false);

  const [undoStack, setUndoStack] = React.useState([]);
  const [redoStack, setRedoStack] = React.useState([]);
  const [undoEvent, setUndoEvent] = React.useState();
  const [redoEvent, setRedoEvent] = React.useState();

  const isStageListening = React.useRef(true);
  const isDrawing = React.useRef(false);
  const colorRef = React.useRef();
  const textBoxRef = React.useRef();
  const lineRef = React.useRef();
  const undoStackRef = React.useRef();
  const strokeWidthRef = React.useRef();
  lineRef.current = lines;
  textBoxRef.current = textBoxes;
  colorRef.current = colourValue;
  undoStackRef.current = undoStack;
  strokeWidthRef.current = strokeWidth;

  let originalFixedTopElements = new Set();
  let originalFixedBottomElements = new Set();
  let canvas = document.createElement('canvas');
  let originalBodyOverflowY = document.body.style.overflowY;
  let originalHTMLOverflow = document.documentElement.style.overflow;
  let originalScroll = document.documentElement.style.scrollBehavior;

  const memoTextBoxEvent = React.useCallback((e) => {
    let originalTextbox = textBoxRef.current;
    const textbox = {
      top: window.scrollY + e.clientY,
      left: e.clientX,
      color: colorRef.current,
      id: `blackboard-${uuidv4()}`,
      fontSize: strokeWidthRef.current
    };
    originalTextbox.push(textbox);
    _push_to_stack(ACTIONS.CREATE_TEXTBOX, textbox);
    setTextBoxes(originalTextbox.concat());
  }, []);

  React.useEffect(() => {
    if(tool === TOOLBOX.TEXTBOX) {
      window.addEventListener('dblclick', memoTextBoxEvent, true);
    } else {
      window.removeEventListener('dblclick', memoTextBoxEvent, true);
    }
  },[tool]);

  React.useEffect(() => {
    if(tool === TOOLBOX.PEN || tool === TOOLBOX.ERASER) {
      isStageListening.current = true;
    } else {
      isStageListening.current = false;
    }
  },[tool]);

  React.useEffect(() => {
    undoStack.length > 0 ? setUndoDisabled(false) : setUndoDisabled(true);
    redoStack.length > 0 ? setRedoDisabled(false) : setRedoDisabled(true);
  },[undoStack,redoStack]);

  //Hook to handle undo event
  React.useEffect(() => {
    if(undoEvent) {
      const length = undoStack.length;
      const stack = undoStack.slice(0, length - 1);
      setUndoStack(stack);
      setRedoStack([...redoStack, undoEvent]);
      if(undoEvent.action === ACTIONS.CREATE_LINE) {
        const originalLines = lines.slice(0, lines.length-1);
        setLines(originalLines);
      }
      if(undoEvent.action === ACTIONS.CREATE_TEXTBOX) {
        const originalTextboxes = textBoxes.slice(0, textBoxes.length-1);
        setTextBoxes(originalTextboxes);
      }
      if(undoEvent.action === ACTIONS.DELETE_TEXTBOX) {
        setTextBoxes([...textBoxes, undoEvent.data]);
      }
      if(undoEvent.action === ACTIONS.RESET) {
        setLines(undoEvent.data.lines);
        setTextBoxes(undoEvent.data.textBoxes);
      }
    }
  },[undoEvent]);

  //Hook to handle redo event
  React.useEffect(() => {
    if(redoEvent) {
      const length = redoStack.length;
      const stack = redoStack.slice(0, length - 1);
      setRedoStack(stack);
      setUndoStack([...undoStack, redoEvent]);
      if(redoEvent.action === ACTIONS.CREATE_LINE) {
        setLines([...lines, redoEvent.data]);
      }
      if(redoEvent.action === ACTIONS.CREATE_TEXTBOX) {
        setTextBoxes([...textBoxes, redoEvent.data]);
      }
      if(redoEvent.action === ACTIONS.DELETE_TEXTBOX) {
        const originalTextboxes = textBoxes.slice(0, textBoxes.length-1);
        setTextBoxes(originalTextboxes);
      }
      if(redoEvent.action === ACTIONS.RESET) {
        setLines([]);
        setTextBoxes([]);
      }
    }
  },[redoEvent]);

  const handleUndo = () => {
    if(undoStack.length > 0) {
      setTool(TOOLBOX.DEFAULT);
      const length = undoStack.length;
      const event = {...undoStack[length - 1]};
      setUndoEvent(event);
    }
  };

  const handleRedo = () => {
    if(redoStack.length > 0) {
      setTool(TOOLBOX.DEFAULT);
      const length = redoStack.length;
      const event = {...redoStack[length - 1]};
      setRedoEvent(event);
    }
  };

  // Line drawing events
  const handleMouseDown = (e) => {
    if(!isStageListening.current) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool: {name: tool, strokeWidth: strokeWidth, colour: colourValue}, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if(!isStageListening.current) {
      return;
    }
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
    if(!isStageListening.current) {
      return;
    }
    _push_to_stack(ACTIONS.CREATE_LINE, lineRef.current[lineRef.current.length - 1]);
    isDrawing.current = false;
  };

  // Screenshot event
  const handleCapture = () => {
    let app = document.getElementById(APP_CANVAS_ID);
    let top = app.getBoundingClientRect().top + window.pageYOffset;
    let height = app.getBoundingClientRect().height;
    _prepare();
    
    let n = (height / (window.innerHeight - 80));
    let screenshots = [];
    canvas.width = window.innerWidth;
    canvas.height = height;
    let context = canvas.getContext('2d');
    for (let i = 0; i<n; i++) {
      screenshots[i] = {
        scrollTo: top,
      };
      top = top + window.innerHeight - 80; // To handle sticky/fixed headers
    }

    capture(0,n, screenshots, context);
    
  };


  const capture = (j,n,screenshots,context) => {
    let isComplete = (j-n <= 1 && j-n >= 0) ? true : false;
    if (!isComplete) window.scrollTo({top: screenshots[j].scrollTo});
    _getAllFixedElements();
    window.setTimeout(() => {
      if(!isComplete) {
        chrome.runtime.sendMessage({message: 'capture_screenshot'}, (captured) => {
          let dY = window.scrollY;
          _getAllFixedElements();
          let image = new Image();
          image.onload = () => {
            context.globalCompositeOperation='destination-over';
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
    for(let item of originalFixedTopElements) { 
      item.element.style.position = item.style;
    }
    for(let item of originalFixedBottomElements) { 
      item.element.style.display = item.style;
    }
    let toolbox = document.getElementById(APP_TOOLBOX_ID);
    toolbox.style.display = 'flex';
    let app = document.getElementById(APP_CANVAS_ID);
    app.style.boxShadow = '0px 0px 0px 3px limegreen inset';
    document.body.style.overflowY = originalBodyOverflowY;
    document.documentElement.style.overflow = originalHTMLOverflow;
    document.documentElement.style.scrollBehavior = originalScroll;
  };
  
  const _getAllFixedElements = () => {
    let elems = document.body.getElementsByTagName('*');
    let length = elems.length;
    for(let i = 0; i < length; i++) { 
      let elemStyle = window.getComputedStyle(elems[i]);
      if(elemStyle.getPropertyValue('position') === 'fixed' || elemStyle.getPropertyValue('position') === 'sticky' ) { 
        if(elems[i].getBoundingClientRect().top < window.innerHeight/2) {
          const originalStylePosition = elemStyle.getPropertyValue('position');
          elems[i].style.position = 'absolute';
          originalFixedTopElements.add({style: originalStylePosition, element: elems[i]});
        } else {
          const originalStyleDisplay = elemStyle.getPropertyValue('display');
          elems[i].style.display = 'none';
          originalFixedBottomElements.add({style: originalStyleDisplay, element: elems[i]});
        }
      }
    }
  };

  const _prepare = () => {
    let toolbox = document.getElementById(APP_TOOLBOX_ID);
    let app = document.getElementById(APP_CANVAS_ID);
    toolbox.style.display = 'none';
    app.style.boxShadow = 'none';
    document.documentElement.style.scrollBehavior = 'auto';
    if(window.getComputedStyle(document.body).getPropertyValue('overflow-y') !== 'overlay') {
      document.body.style.overflowY = 'visible';
      document.documentElement.style.overflow = 'hidden';
    }
  };

  const handlePencilOption = (width) => {
    setStrokeWidth(width);
  };

  const handleColourPalette = (value) => {
    setColourValue(value);
  };

  // Erase all event
  const handleReset = () => {
    _push_to_stack(ACTIONS.RESET, {lines, textBoxes});
    setLines([]);
    setTextBoxes([]);

  };

  // Textbox events
  const handleTextboxDelete = (id) => {
    let updatedTextboxList = textBoxes.filter((textbox) => {
      if(textbox.id === id) {
        _push_to_stack(ACTIONS.DELETE_TEXTBOX,textbox);
        return false;
      }
      return true;
    });
   
    setTextBoxes(updatedTextboxList);
  };
  
  const handleTextChange = (id, text) => {
    let updatedTextboxList = textBoxes.map((textbox) => {
      if(textbox.id === id) {
        textbox.text = text;
      }
      return textbox;
    });
    setTextBoxes(updatedTextboxList);
  };

  const calculateHeight = () => {
    const bodyHeight = document.documentElement.scrollHeight;
    // use heightRef instead of height inside window eventlistener of useEffect : https://stackoverflow.com/questions/56511176/state-being-reset
    // MAX canvas length in chrome and firefox is around 32767 pixels
    if (bodyHeight < 8000) {
      return bodyHeight - 5; // Subtract few pixels to avoid extending body length
    }
    return 8000;
  };

  const _push_to_stack = (action, data) => {
    let stack = {
      action,
      data,
    };
    setUndoStack([...undoStackRef.current, stack]);
    setRedoStack([]);
  };

  const handleAppClose = () => {
    const blackBoardApp = document.getElementById(APP_ROOT_ID);
    if(blackBoardApp) {
      blackBoardApp.parentNode.removeChild(blackBoardApp);
    }
  };

  return (
    <CanvasMain id={APP_CANVAS_ID}>
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
              stroke={line.tool.colour}
              strokeWidth={line.tool.strokeWidth}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool.name === TOOLBOX.ERASER ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      {
        textBoxes.map((textbox) => (
          <TextBox 
            id={textbox.id}
            key={textbox.id}
            top={textbox.top}
            left={textbox.left}
            color={textbox.color}
            text={textbox.text}
            fontSize={textbox.fontSize}
            disabled={tool === TOOLBOX.TEXTBOX ? true : false}
            handleTextboxDelete={() => handleTextboxDelete(textbox.id)}
            handleTextChange={handleTextChange}
          />
        ))
      }
      <Toolbox
        handleSetTool={(tool) => {
          setTool(tool);
        }}
        tool={tool}
        handleCapture={handleCapture}
        handlePencilOption={handlePencilOption}
        handleColourPalette={handleColourPalette}
        handleReset={handleReset}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleAppClose={handleAppClose}
        strokeWidth={strokeWidth}
        colourValue={colourValue}
        isUndoDisabled={isUndoDisabled}
        isRedoDisabled={isRedoDisabled}
      ></Toolbox>
        
    </CanvasMain>
  );
};

export default Canvas;
