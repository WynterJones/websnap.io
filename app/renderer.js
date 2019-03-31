if (store.get(default_folder)) {
  $('.button, .input').removeClass('disabled')
}

window.onfocus = function() {
  const clipz = clipboard.readText('selection')
  $('#website').val('')
  if (isUrl(clipz)) {
    $('#website').val(clipz)
  } else {
    $('#website').focus()
  }
}

window.onblur = function() {
  ipcRenderer.send('de-activated')
  $('#loading').hide()
  $('#settingsPanel').hide()
  $('#webSearch').show()
}

$('#website').keypress(function (e) {
  if (e.which == 13) {
    component.screenshot($(this).val(), 'desktop')
    return false
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

$(document).on('click', '#settings', function (e) {
  $('#webSearch').hide()
  $('#settingsPanel').show()
})

$(document).on('click', '#closeSettings', function (e) {
  $('#settingsPanel').hide()
  $('#webSearch').show()
  $('#website').focus()
})