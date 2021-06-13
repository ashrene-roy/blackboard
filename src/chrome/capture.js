/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import CapturePage from '../CapturePage';

chrome.storage.local.get("image", (data) => {
  const app = document.getElementById('capture-root');
  ReactDOM.render(<CapturePage image={data.image}/>, app);
});