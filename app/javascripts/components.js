'use strict'

const components = {

  screenshot: (website_url) => {
    (async () => {
      console.log('Taking Screenshot of...', website_url)
      $('#progress-list').append(`<div class="item">Taking Screenshot of... <code>${website_url}</code></div>`)
      const website_name = website_url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/\-$/, '')
      const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})
      const page = await browser.newPage()
      const override = Object.assign(page.viewport(), {width: 1366})
      await page.setViewport(override)
      await page.goto(website_url)
      await page.screenshot({path: `${FOLDER_PATH}/fullsize/${website_name}.png`, fullPage: true})
      await browser.close()
      console.log('Saved as...', website_name + '.png')
      $('#progress-list').append(`<div class="item">Saved as... <code>${website_url}</code></div>`)

      let image = await nativeImage.createFromPath(`${FOLDER_PATH}/fullsize/${website_name}.png`)
      await fs.writeFile(`${FOLDER_PATH}/thumbnails/${website_name}.png`, image.resize({width: 300}).toPNG(), function (err) {
          if (err)
              throw err;
          console.log('Thumbnail saved.')
          $('#progress-list').append(`<div class="item">Thumbnail saved and all is completed.</div>`)
          $('#progress-list').append(`<img class="ui image" style="padding: 5px;border: 1px solid #eee;border-bottom: 3px solid #eee;margin: 5px" src="${FOLDER_PATH}/thumbnails/${website_name}.png">`)
      });
    })()
  }

}

module.exports = components
