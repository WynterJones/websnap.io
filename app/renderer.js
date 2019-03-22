// Screenshot One Website
$('#screenshot-website').click(function() {
  // (async () => {
  //   const WEBSITE_URL = $('#website').val()
  //   const WEBSITE_NAME = WEBSITE_URL.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/\-$/, '')
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()
  //   const override = Object.assign(page.viewport(), {width: 1366})
  //   await page.setViewport(override)
  //   await page.goto(WEBSITE_URL)
  //   await page.screenshot({path: `demo-images/${WEBSITE_NAME}.png`, fullPage: true})
  //   await browser.close()
  // })()
  component.screenshot($('#website').val())
})




// fs.readdir('demo-images/thumbnails', (err, dir) => {
//   for (var i = 0, path; path = dir[i]; i++) {
//     if (path.includes('.png')) {
//       $('.grid').append(`<div class="grid-item"><div class="inner-img"><img src="../demo-images/thumbnails/${path}" /></div></div>\n`)
//     }
//   }
// })

$('.masonry-grid').masonry({
  itemSelector: '.grid-item'
});


// query_params = {
//   q: "jv sales page",
//   location: "Austin, TX",
//   num: 20
// }
//
// callback = function(data) {
//  var results = data.organic_results
//   Object.keys(results).forEach(function (item) {
//     (async () => {
//       const WEBSITE_URL = results[item].link
//       const WEBSITE_NAME = WEBSITE_URL.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\//g, '-').replace(/\./g, '-').replace(/\-$/, '')
//       const browser = await puppeteer.launch()
//       const page = await browser.newPage()
//       const override = Object.assign(page.viewport(), {width: 1366})
//       await page.setViewport(override)
//       await page.goto(WEBSITE_URL)
//       await page.screenshot({path: `demo-images/fullsize/${WEBSITE_NAME}.png`, fullPage: true})
//       await browser.close()
//       console.log(WEBSITE_NAME, 'Saved')
//
//       let image = await nativeImage.createFromPath(`demo-images/fullsize/${WEBSITE_NAME}.png`)
//       await fs.writeFile(`demo-images/thumbnails/${WEBSITE_NAME}.png`, image.resize({width: 300}).toPNG(), function (err) {
//           if (err)
//               throw err;
//           console.log('It\'s saved!');
//       });
//     })()
//   });
// }
//
// // Show result as JSON
// serp.json(query_params, callback)
