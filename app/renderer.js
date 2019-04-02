// Init - Storage for Settings
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

// Keycodes for SelectAll and Paste
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

// Hide Window
window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading, #settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
}

// Website Actions
$(document).on('click', '#closeApp', function (e) {
  ipcRenderer.send('close-me')
})


$(document).on('focus', '#keypress', function (e) {
  if (e.which == 13) {
    component.screenshot($(this).val(), 'desktop')
    return false
  }
})

$(document).on('focus', '#website', function (e) {
  if (store.get('check_clipboard')) {
    const clipz = clipboard.readText('selection')
    $('#website').val('')
    if (isURL(clipz)) {
      $('#website').val(clipz)
    }
  }
})

$(document).on('click', '#takeDesktop', function (e) {
  component.screenshot($('#website').val(), 'desktop')
})

$(document).on('click', '#takeMobile', function (e) {
  component.screenshot($('#website').val(), 'mobile')
})

$(document).on('click', '#takeThumbnail', function (e) {
  component.screenshot($('#website').val(), 'thumbnail')
})

$(document).on('click', '#changeFolder', function (e) {
  dialog.showOpenDialog({ properties: ['openDirectory'] }, function (data) {
    store.set(default_folder, data[0])
    ipcRenderer.send('activated')
    $('#introText').hide()
    $('#folderIcon').attr('class', 'far fa-folder-open')
    $('#website').attr('placeholder', 'Paste Website URL to Screenshot...')
    $('.button, .input').removeClass('disable')
  })
})

// Settings Actions
$(document).on('click', '#settings', function (e) {
  $('#webSearch').hide()
  $('#settingsPanel').show()
})

$(document).on('click', '#closeSettings, #closeHelp', function (e) {
  $('#settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
  $('#website').focus()
})

$(document).on('change', '#settingsOptionClipboard', function (e) {
  let checkData
  if (this.checked) {
    checkData = true
  } else {
    checkData = false
  }
  store.set('check_clipboard', checkData)
})

$(document).on('change', '#settingsOptionStartup', function (e) {
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

ipcRenderer.on('info', (evt, arg) => {
  const clipz = clipboard.readText('selection')
  $('#website').val(clipz)
  $('#takeDesktop').trigger('click')
})