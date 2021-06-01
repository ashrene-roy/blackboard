/*global chrome*/
import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = (props) => {

  const [responseFromContent, setResponseFromContent] = React.useState('');

  const sendTestMessage = () => {
    const message = {
        from: React,
        message: "Hello from React",
    }

    const queryInfo = {
        active: true,
        currentWindow: true
    };

    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        const currentTabId = tabs[0].id;
        /**
         * Sends a single message to the content script(s) in the specified tab,
         * with an optional callback to run when a response is sent back.
         *
         * The runtime.onMessage event is fired in each content script running
         * in the specified tab for the current extension.
         */
        chrome.tabs.sendMessage(
            currentTabId,
            message,
            (response) => {
                setResponseFromContent(response);
            });
        });
  };

    return (
      <div className="App">
        <header className="App-header">
          {props.isExt ? 
            <img src={chrome.runtime.getURL("static/media/logo.svg")} className="App-logo" alt="logo" />
          :
            <img src={logo} className="App-logo" alt="logo" />
          }

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={sendTestMessage}>SEND MESSAGE</button>
      </div>
    );
  }

export default App;
