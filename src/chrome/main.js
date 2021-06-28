import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from '../Canvas';
import { APP_ROOT_ID } from '../constants/values';

const blackBoardApp = document.getElementById(APP_ROOT_ID);
if(blackBoardApp) {
  if(blackBoardApp.style.display === 'none') {
    blackBoardApp.style.display = 'block';
  } else {
    blackBoardApp.style.display = 'none';
  }
} else {
  const app = document.createElement('div');
  app.id = APP_ROOT_ID;
  document.body.appendChild(app);
  ReactDOM.render(<Canvas/>, app);
}

