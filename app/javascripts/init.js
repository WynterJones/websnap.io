if (store.get(default_folder)) {
  $('#introText').hide()
  $('#folderIcon').attr('class', 'far fa-folder-open')
  $('.button, .input').removeClass('disable')
} else {
  $('#website').removeAttr('placeholder')
}

if (store.get('check_clipboard')) {
  $('#settingsOptionClipboard').attr('checked', 'checked')
} else {
  $('#settingsOptionClipboard').removeAttr('checked')
}

if (store.get('run_on_startup')) {
  $('#settingsOptionStartup').attr('checked', 'checked')
} else {
  $('#settingsOptionStartup').removeAttr('checked')
}

window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading, #settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
}