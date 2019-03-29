'use strict'

const components = {

  screenshot: (website_url) => {
    (async () => {
      const website_name = website_url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/\-$/, '')
      const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})
      const page = await browser.newPage()
      const override = Object.assign(page.viewport(), {width: 1366})
      await page.setViewport(override)
      await page.goto(website_url)
      await page.screenshot({path: `${FOLDER_PATH}/fullsize/${website_name}.png`, fullPage: true})
      await browser.close()
      let image = await nativeImage.createFromPath(`${FOLDER_PATH}/fullsize/${website_name}.png`)
      await fs.writeFile(`${FOLDER_PATH}/thumbnails/${website_name}.png`, image.resize({width: 300}).toPNG(), function (err) {
        if (err) { 
          throw err
        } else {
          shell.openItem(`${FOLDER_PATH}/fullsize/${website_name}.png`)
        }
      })
    })()
  }

}

module.exports = components
