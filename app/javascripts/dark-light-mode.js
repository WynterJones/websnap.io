if (process.platform == 'darwin') {
  const { systemPreferences } = remote
  const setOSTheme = () => {
    let theme = systemPreferences.isDarkMode() ? 'dark' : 'light'
    window.localStorage.os_theme = theme
    if ('__setTheme' in window) {
      window.__setTheme()
    }
  }
  systemPreferences.subscribeNotification(
    'AppleInterfaceThemeChangedNotification',
    setOSTheme,
  )
  setOSTheme()
}
window.__setTheme = () => {
  let userTheme = localStorage.user_theme
  let OSTheme = localStorage.os_theme
  let defaultTheme = 'light'
  document.documentElement.setAttribute(
    'data-theme',
    userTheme || OSTheme || defaultTheme,
  )
}
__setTheme()