// eslint-disable-next-line
class Superloader {
  constructor ({
    uploadFileEl, uploadDirectoryEl, dropAreaEl, successCallback
  }) {
    // eslint-disable-next-line
    uploadFileEl && this.initUploadFile(uploadFileEl, successCallback);
    // eslint-disable-next-line
    uploadDirectoryEl && this.initUploadDirectory(uploadDirectoryEl, successCallback);
    // eslint-disable-next-line
    dropAreaEl && this.initDragAndDrop(dropAreaEl, successCallback);
  }

  initUploadFile (el, successCallback) {
    const oRealButton = document.createElement('input')
    oRealButton.setAttribute('type', 'file')
    oRealButton.setAttribute('multiple', true)
    oRealButton.style.display = 'none'
    oRealButton.addEventListener('change', (e) => {
      const { files } = oRealButton
      for (let i = 0; i <= files.length - 1; i++) {
        const file = files[i]
        // 这里的 file.webkitRelativePath 都是 "" ,不是我们想要的.要用 file.name
        successCallback({ file, path: file.name })
      }
    })
    document.body.appendChild(oRealButton)
    el.addEventListener('click', (e) => {
      oRealButton.click()
    })
  }

  initUploadDirectory (el, successCallback) {
    const oRealButton = document.createElement('input')
    oRealButton.setAttribute('type', 'file')
    oRealButton.setAttribute('webkitdirectory', true)
    oRealButton.style.display = 'none'
    oRealButton.addEventListener('change', (e) => {
      const { files } = oRealButton
      for (let i = 0; i <= files.length - 1; i++) {
        const file = files[i]
        // 这里的 file.webkitRelativePath 就是我们想要的格式
        successCallback({ file, path: file.webkitRelativePath })
      }
    })
    document.body.appendChild(oRealButton)
    el.addEventListener('click', (e) => {
      oRealButton.click()
    })
  }

  initDragAndDrop (el, successCallback) {
    el.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    el.addEventListener('drop', (e) => {
      const { items } = e.dataTransfer
      for (let i = 0; i <= items.length - 1; i++) {
        const item = items[i]
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry()
          this.getFileFromEntryRecursively(entry, successCallback)
        }
      }
      e.preventDefault()
    })
  }

  getFileFromEntryRecursively (entry, successCallback) {
    if (entry.isFile) {
      entry.file((file) => {
        // 这里的 file.webkitRelativePath 都是 "" ,不是我们想要的.
        // entry.fullPath 是前面带斜杠的,要把斜杠去掉的
        const path = entry.fullPath.substring(1)
        successCallback({ file, path })
      }, (e) => { console.log(e) })
    } else {
      const reader = entry.createReader()
      reader.readEntries((entries) => {
        entries.forEach((entry) => this.getFileFromEntryRecursively(entry, successCallback))
      }, (e) => { console.log(e) })
    }
  }
}
