// Called when the user clicks on the browser action
/*global chrome*/
chrome.browserAction.onClicked.addListener(() => {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow:true}, (tabs) => {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {'message': 'clicked_browser_action'});
  });
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    switch (request.message) {
    case 'capture_screenshot':
      chrome.tabs.captureVisibleTab(
        null, {format: 'png'}, (dataURI) => {
          sendResponse(dataURI);
        });
      break;
    case 'save':
      chrome.storage.local.set({image: request.image}, () => {
        chrome.tabs.create({ url: 'capture.html' }, (tab) => {
          sendResponse('done');
        });
      });
      break;
    default:
      // helps debug when request message doesn't match
      console.log('Unmatched request of \'' + request + '\' from script to background.js from ' + sender);
    }
    return true;
  }
);