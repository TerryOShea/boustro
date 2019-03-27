chrome.storage.sync.get('active', data => {
    alert(`Is active: ${data.active}`)
});
