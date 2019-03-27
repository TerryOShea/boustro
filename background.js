chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ active: true }, () => {
        console.log("This is active");
    });
});
