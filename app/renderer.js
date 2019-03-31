// Storage for Settings
if (store.get(default_folder)) {
  $('.button, .input').removeClass('disabled')
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

// Hide Window
window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading, #settingsPanel, #helpPanel').hide()
  $('#webSearch').show()
}

// Website Actions
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
    $('.button, .input').removeClass('disabled')
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