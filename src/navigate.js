const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  page.setJavaScriptEnabled(true)
  const response = await page.goto('http://192.168.0.12:2015', {waitUntil: 'networkidle2'});
  // await page.screenshot({path: '/var/example.png'});

  await browser.close();
  console.log('QUIT!');
})();
