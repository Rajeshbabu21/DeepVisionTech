document.getElementById('clipButton').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'clip' })
  })
})

// Display stored clips
document.getElementById('viewClips').addEventListener('click', function () {
  chrome.storage.local.get(['clippedPages'], function (result) {
    let clipList = document.getElementById('clipList')
    clipList.innerHTML = ''

    if (result.clippedPages) {
      result.clippedPages.forEach((clip, index) => {
        let li = document.createElement('li')
        li.innerHTML = `<a href="${clip.url}" target="_blank">${clip.title}</a>`
        clipList.appendChild(li)
      })
    }
  })
})
