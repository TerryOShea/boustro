chrome.storage.sync.get('active', data => {
    if (data.active) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const tabID = tabs[0].id;

            chrome.tabs.insertCSS(tabID, {
                file: 'styles.css',
            });

            chrome.tabs.executeScript(tabID, {
                file: 'boustrophedize.js',
            });
        });
    }
});
