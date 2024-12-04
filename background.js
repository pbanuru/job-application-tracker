chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractJobInfo") {
        chrome.scripting.executeScript(
            {
                target: { tabId: message.tabId },
                function: extractJobInfo
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ error: chrome.runtime.lastError.message });
                } else {
                    sendResponse(results[0].result);
                }
            }
        );
        return true; // Will respond asynchronously.
    }
});

function extractJobInfo() {
    // Extract job information from the page content.
    const pageContent = document.body.innerText;
    const currentUrl = window.location.href;
    return { pageContent, currentUrl };
}