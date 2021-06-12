/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import CapturePage from '../CapturePage';

chrome.storage.local.get("image", function(data) {
    const app = document.getElementById('root');
    document.body.appendChild(app);
    ReactDOM.render(<CapturePage image={data.image}/>, app);

  });

