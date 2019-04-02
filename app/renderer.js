'use strict'

window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading, #settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
}

document.onkeydown = function(event){
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
}
window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading, #settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
}

ipcRenderer.on('info', (evt, arg) => {
  const clipz = clipboard.readText('selection')
  $('#website').val(clipz)
  $('#takeDesktop').trigger('click')
})

$(document).on('click', '#closeApp', function () { app.quit() })
$(document).on('focus', '#website', function () {
  if (store.get('check_clipboard')) {
    const clipz = clipboard.readText('selection')
    $('#website').val('')
    if (isURL(clipz)) {
      $('#website').val(clipz)
    }
  }
})
$(document).on('click', '#takeDesktop', function () { component.screenshot($('#website').val(), 'desktop') })
$(document).on('click', '#takeMobile', function () { component.screenshot($('#website').val(), 'mobile') })
$(document).on('click', '#takeThumbnail', function () { component.screenshot($('#website').val(), 'thumbnail') })
$(document).on('click', '#changeFolder', function () {
  dialog.showOpenDialog({ properties: ['openDirectory'] }, function (data) {
    store.set(default_folder, data[0])
    ipcRenderer.send('activated')
    $('#introText').hide()
    $('#folderIcon').attr('class', 'far fa-folder-open')
    $('#website').attr('placeholder', 'Paste Website URL to Screenshot...')
    $('.button, .input').removeClass('disable')
  })
})
$(document).on('click', '#settings', function () {
  $('#webSearch').hide()
  $('#settingsPanel').show()
})
$(document).on('click', '#closeSettings, #closeHelp', function () {
  $('#settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
  $('#website').focus()
})
$(document).on('change', '#settingsOptionClipboard', function () {
  let checkData
  if (this.checked) {
    checkData = true
  } else {
    checkData = false
  }
  store.set('check_clipboard', checkData)
})
$(document).on('change', '#settingsOptionStartup', function () {
  let checkData
  if (this.checked) {
    checkData = true
    startupAutoLauncher.enable();
  } else {
    checkData = false
    startupAutoLauncher.disable();
  }
  store.set('run_on_startup', checkData)
})