'use strict'

const components = {

  screenshot: (websiteURL, shotType) => {
    if (websiteURL && isURL(websiteURL)) {
      $('#webSearch').hide()
      $('#loading').show()
      component.saveScreenshot(websiteURL, shotType)
    } else {
      $('#settingsPanel, #webSearch').hide()
      $('#helpPanel').show()
    }
  },

  saveScreenshot: (website_url, shotType) => {
    (async () => {
      const website_name = `${shotType}-${components.slugify(website_url)}`
      const browser = await puppeteer.launch({executablePath: chromePath})
      const folder_path = store.get(default_folder)
      const page = await browser.newPage()
      const override = Object.assign(page.viewport(), {width: 1366})
      await page.setViewport(override)
      await page.goto(website_url)
      if (shotType == 'desktop') {
        await page.screenshot({path: `${folder_path}/${website_name}.png`, fullPage: true})
      } else if (shotType == 'mobile') {
        await page.emulate(iPhone)
        await page.screenshot({path: `${folder_path}/${website_name}.png`, fullPage: true})
      } else if (shotType == 'thumbnail') {
        await page.screenshot({path: `${folder_path}/${website_name}.png`})
      }
      await browser.close()
      await shell.openItem(`${folder_path}/${website_name}.png`)
    })()
  },

  slugify: (string) => {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace('https-www', '')
      .replace('https', '')
      .replace('http', '')
  }

}

module.exports = components
