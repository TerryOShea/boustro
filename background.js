let hasBeenToggled = false;
let isActive = false;

chrome.browserAction.onClicked.addListener(tab => {
    isActive = !isActive;

    if (isActive) {
        chrome.tabs.executeScript(tab.id, {
            code: 'document.body.classList.add("boustro-active");',
        });
    } else {
        chrome.tabs.executeScript(tab.id, {
            code: 'document.body.classList.remove("boustro-active");',
        });
    }

    if (!hasBeenToggled) {
        hasBeenToggled = true;

        chrome.tabs.insertCSS(tab.id, {
            file: 'styles.css',
        });

        chrome.tabs.executeScript(tab.id, {
            file: 'boustrophedize.js',
        });
    }
});

