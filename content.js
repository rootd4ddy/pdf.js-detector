chrome.runtime.sendMessage({ type: 'getAlertsEnabled' }, (response) => {
  if (response.alertsEnabled && document.querySelector('script[src*="pdf.js"]')) {
    alert("pdf.js is being used on this webpage!");
    chrome.runtime.sendMessage({ type: 'logEndpoint', endpoint: window.location.href });
  }
});
