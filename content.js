chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'clip') {
    let pageContent = {
      title: document.title,
      url: window.location.href,
      content: document.body.innerText,
    }

    // Store the clipped content
    chrome.storage.local.get({ clippedPages: [] }, function (result) {
      let updatedClips = result.clippedPages
      updatedClips.push(pageContent)

      chrome.storage.local.set({ clippedPages: updatedClips }, function () {
        alert('Page clipped successfully!')
      })
    })
  }
})
