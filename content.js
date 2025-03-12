chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.action === 'clip') {
    let pageContent = {
      title: document.title,
      url: window.location.href,
      content: document.body.innerText,
    }

    chrome.storage.local.get({ clippedPages: [] }, function (result) {
      let updatedClips = result.clippedPages
      updatedClips.push(pageContent)

      chrome.storage.local.set({ clippedPages: updatedClips }, function () {
        alert('Page clipped successfully!')
      })
    })
  }

  if (message.action === 'copy_image') {
    let imgElement = document.querySelector('img') // Get the first image
    if (imgElement) {
      copyImageToClipboard(imgElement.src)
    } else {
      alert('No image found to copy!')
    }
  }
})

async function copyImageToClipboard(imageUrl) {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const data = [new ClipboardItem({ [blob.type]: blob })]

    await navigator.clipboard.write(data)
    alert('Image copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy image:', error)
  }
}
