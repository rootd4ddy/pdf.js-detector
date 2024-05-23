document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('alertCheckbox');
    const logOutput = document.getElementById('logOutput');
    const showLogButton = document.getElementById('showLog');
  
    // Load the checkbox state
    chrome.storage.sync.get('alertsEnabled', (data) => {
      checkbox.checked = data.alertsEnabled !== undefined ? data.alertsEnabled : true;
    });
  
    // Save the checkbox state
    checkbox.addEventListener('change', () => {
      chrome.storage.sync.set({ alertsEnabled: checkbox.checked }, () => {
        console.log('Alerts enabled state saved as: ', checkbox.checked);
      });
    });
  
    // Show the log
    showLogButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'getLog' }, (response) => {
        logOutput.textContent = response.log.join('\n');
      });
    });
  });
  