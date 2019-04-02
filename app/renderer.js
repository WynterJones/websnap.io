'use strict'

ipcRenderer.on('detectKeyboardShortcut', () => { events.pasteClipboardIntoInput() })
$(window).blur(function() { events.windowBlur() })
$(document).keydown(function(e){ events.documentKeycodes(e) })
$(document).on('click', '#closeApp', function () { app.quit() })
$(document).on('click', '#takeDesktop', function () { component.screenshot($('#website').val(), 'desktop') })
$(document).on('click', '#takeMobile', function () { component.screenshot($('#website').val(), 'mobile') })
$(document).on('click', '#takeThumbnail', function () { component.screenshot($('#website').val(), 'thumbnail') })
$(document).on('click', '#changeFolder', function () { events.changeFolder() })
$(document).on('click', '#settings', function () { events.openSettings() })
$(document).on('click', '#closeSettings, #closeHelp', function () { events.close() })
$(document).on('change', '#settingsOptionClipboard', function () { events.toggleClipboardShortcut(this) })
$(document).on('change', '#settingsOptionStartup', function () { events.toggleOnStartup(this) })