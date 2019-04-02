'use strict'

const events = {

  windowBlur: () => {
    ipcRenderer.send('de-activated')
    $('#loading, #settingsPanel, #helpPanel').hide()
    $('#webSearch').show()
  },

  documentKeycodes: (event) => {
    let toReturn = true
    if(event.ctrlKey || event.metaKey){ 
      if (event.which == 86) {
        document.activeElement.value += clipboard.readText()
        document.activeElement.dispatchEvent(new Event('input'))
        toReturn = false
      } else if (event.which == 65) {
        $('#website').select()
      }
    }
    return toReturn
  },

  changeFolder: () => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }, function (data) {
      store.set(default_folder, data[0])
      ipcRenderer.send('activated')
      $('#introText').hide()
      $('#folderIcon').attr('class', 'far fa-folder-open')
      $('#website').attr('placeholder', 'Paste Website URL to Screenshot...')
      $('.button, .input').removeClass('disable')
    })
  },

  openSettings: () => {
    $('#webSearch').hide()
    $('#settingsPanel').show()
  },

  close: () => {
    $('#settingsPanel, #helpPanel').hide()
    $('#webSearch').show()
    $('#website').focus()
  },

  toggleClipboardShortcut: () => {
    let checkData
    if (this.checked) {
      checkData = true
    } else {
      checkData = false
    }
    store.set('check_clipboard', checkData)
  },

  toggleOnStartup: () => {
    let checkData
    if (this.checked) {
      checkData = true
      startupAutoLauncher.enable();
    } else {
      checkData = false
      startupAutoLauncher.disable();
    }
    store.set('run_on_startup', checkData)
  },

  pasteClipboardIntoInput: () => {
    $('#website').val(clipboard.readText('selection'))
  }


}

module.exports = events
