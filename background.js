let pdfJsLog = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ alertsEnabled: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'logEndpoint') {
    pdfJsLog.push(request.endpoint);
  } else if (request.type === 'getLog') {
    sendResponse({ log: pdfJsLog });
  } else if (request.type === 'getAlertsEnabled') {
    chrome.storage.sync.get('alertsEnabled', (data) => {
      sendResponse({ alertsEnabled: data.alertsEnabled !== undefined ? data.alertsEnabled : true });
    });
    return true; // Keep the message channel open for the async response
  }
});
