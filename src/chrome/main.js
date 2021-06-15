import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../Canvas';

const blackBoardApp = document.getElementById('blackboard-extension-root-1234');
if(blackBoardApp) {
  blackBoardApp.parentNode.removeChild(blackBoardApp);
} else {
  const app = document.createElement('div');
  app.id = "blackboard-extension-root-1234"
  document.body.appendChild(app);
  ReactDOM.render(<Canvas/>, app);
}

