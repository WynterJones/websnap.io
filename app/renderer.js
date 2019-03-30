$('#website').keypress(function (e) {
  if (e.which == 13) {
    component.screenshot($(this).val(), 'desktop')
    return false
  }
})

$('#takeDesktop').click(function (e) {
  component.screenshot($('#website').val(), 'desktop')
})

$('#takeMobile').click(function (e) {
  component.screenshot($('#website').val(), 'mobile')
})

$('#takeThumbnail').click(function (e) {
  component.screenshot($('#website').val(), 'thumbnail')
})

$('#settings').click(function (e) {
  dialog.showOpenDialog({ properties: ['openDirectory'] }, function (data) {
    store.set('myFolderPath', data[0])
    ipcRenderer.send('activated')
  })
})

