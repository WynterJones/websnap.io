$('#website').keypress(function (e) {
  if (e.which == 13) {
    component.screenshot($(this).val())
    // $('#webSearch').hide()
    return false;
  }
});

