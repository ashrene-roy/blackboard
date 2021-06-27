// Called when the user clicks on the browser action
chrome.action.onClicked.addListener(() => {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow:true}, (tabs) => {
    let activeTab = tabs[0];
    chrome.scripting.executeScript({ target: {tabId: activeTab.id},  files: ["static/js/main.js"] }, () => {
      if (chrome.runtime.lastError) {
        alert("Sorry this page is not accessible due to chrome web store policies");
        return;
      }
    });
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
        chrome.tabs.create({ url: 'capture.html' }, () => {
          sendResponse('done');
        });
      });
      break;
    default:
      console.log('Unmatched request of \'' + request + '\' from script to background.js from ' + sender);
    }
    return true;
  }
);

chrome.runtime.onInstalled.addListener(
  (details) => {
    if(details.reason === 'install') {
      chrome.tabs.create({ url: 'about.html' }, () => {});
    }
  }
);