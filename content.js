chrome.runtime.sendMessage({ type: 'getAlertsEnabled' }, (response) => {
  if (response.alertsEnabled && document.querySelector('script[src*="pdf.js"]')) {
    alert("pdf.js detected!");
    chrome.runtime.sendMessage({ type: 'logEndpoint', endpoint: window.location.href });
  }
});
