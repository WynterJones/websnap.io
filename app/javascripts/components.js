'use strict'

const components = {

  screenshot: (website_url, shotType) => {
    (async () => {
      const website_name = website_url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/\-$/, '')
      const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})
      const page = await browser.newPage()
      const override = Object.assign(page.viewport(), {width: 1366})
      await page.setViewport(override)
      await page.goto(website_url)

      if (shotType === 'desktop') {
        await page.screenshot({path: `${FOLDER_PATH}/fullsize/${website_name}.png`, fullPage: true})
      } else if (shotType === 'mobile') {
        await page.emulate(iPhone)
        await page.screenshot({path: `${FOLDER_PATH}/fullsize/${website_name}.png`, fullPage: true})
      } else if (shotType === 'thumbnail') {
        await page.screenshot({path: `${FOLDER_PATH}/fullsize/${website_name}.png`})
      }
      
      await browser.close()
      await shell.openItem(`${FOLDER_PATH}/fullsize/${website_name}.png`)
    })()
  }

}

module.exports = components
