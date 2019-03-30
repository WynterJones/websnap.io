$('#website').keypress(function (e) {
  if (e.which == 13) {
    component.screenshot($(this).val())
    $('#webSearch').fadeIn()
    return false;
  }
});

$('#takeDesktop').click(function (e) {
  component.screenshot($('#website').val(), 'desktop')
})

$('#takeMobile').click(function (e) {
  component.screenshot($('#website').val(), 'mobile')
})

$('#takeThumbnail').click(function (e) {
  component.screenshot($('#website').val(), 'thumbnail')
})

