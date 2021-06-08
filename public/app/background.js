// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
   });
});

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
       switch (request.directive) {
       case "capture_screenshot":
            chrome.tabs.captureVisibleTab(
               null, {format: 'png'}, (dataURI) => {
                  sendResponse(dataURI);
            });
           break;
       case "save":
           let popup = window.open();
           popup.document.write('<img src="'+request.image+'">');
           sendResponse('');
       default:
           // helps debug when request directive doesn't match
           console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
       }
       return true;
   }
);