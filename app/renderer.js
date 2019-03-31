if (store.get(default_folder)) {
  $('.button, .input').removeClass('disabled')
}

if (store.get('check_clipboard')) {
  $('#settingsOptionClipboard').attr('checked', 'checked')
} else {
  $('#settingsOptionClipboard').removeAttr('checked')
}

window.onfocus = function() {
  // if (store.get('check_clipboard')) {
  //   const clipz = clipboard.readText('selection')
  //   $('#website').val('')
  //   if (isURL(clipz)) {
  //     $('#website').val(clipz)
  //     $('#website').focus()
  //   } else {
  //     $('#website').focus()
  //   }
  // }

  var minecraftAutoLauncher = new AutoLaunch({
    name: 'Brave',
    path: '/Applications/Brave.app',
  });
  
  minecraftAutoLauncher.enable();

  minecraftAutoLauncher.isEnabled()
.then(function(isEnabled){
	if(isEnabled){
    console.log('Brave Enabled',isEnabled)
	    return;
	}
	minecraftAutoLauncher.enable();
})
.catch(function(err){
  console.log('Brave err', err)
    // handle error
});
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

$(document).on('change', '#settingsOptionClipboard', function (e) {
  let checkData
  if (this.checked) {
    checkData = true
  } else {
    checkData = false
  }
  store.set('check_clipboard', checkData)
})