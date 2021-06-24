/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import CapturePage from '../CapturePage';
import GlobalStyle from './theme';

const App = (props) => (
  <>
    <GlobalStyle />
    <CapturePage image={props.data.image}/>
  </>
);

chrome.storage.local.get("image", (data) => {
  const app = document.getElementById('capture-root');
  ReactDOM.render(<App data={data}/>, app);
});