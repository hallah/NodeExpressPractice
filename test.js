/**
 * https://www.npmjs.com/package/puppeteer
 https://github.com/GoogleChrome/puppeteer/blob/master/README.md
 https://github.com/GoogleChrome/puppeteer/tree/master/examples
 https://github.com/GoogleChrome/puppeteer/blob/HEAD/docs/api.md
 https://www.w3schools.com/jquery/jquery_ref_selectors.asp
 https://www.w3schools.com/jquery/jquery_selectors.asp
 https://www.sitepen.com/blog/2017/10/04/browser-automation-with-puppeteer/
 https://hackernoon.com/how-to-use-puppeteer-as-a-acceptance-test-f301982f2457
 https://www.valentinog.com/blog/ui-testing-jest-puppetteer/
 https://ourcodeworld.com/articles/read/548/puppeteer-a-node-js-library-to-control-headless-chrome
 https://testinproduction.wordpress.com/2017/09/25/puppeteer/
 https://alligator.io/tooling/puppeteer/
 https://ropig.com/blog/end-end-tests-dont-suck-puppeteer/
 puppeteer with mocks: https://github.com/umaar/puppeteer-sitepen-contact-example
 https://developers.google.com/web/updates/2017/04/headless-chrome
 https://try-puppeteer.appspot.com/
 https://chromedevtools.github.io/timeline-viewer/
 */
const puppeteer = require("puppeteer");

describe("Open i-ready Website", () => {
  var browser, page;
  var url = "https://example.com";
  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });
  afterEach(() => {
    browser.close();
  });

  test("Username container value == Username", async () => {
    //Start Trace
    await page.tracing.start({ path: 'traces/trace.json' });
    await page.goto(url);
    await page.screenshot({ path: "screenshots/example.png" });
    await page.screenshot({ path: "screenshots/example1.png" });
    await takeScreenshot("screenshots/example2.png", 30000);
    //Stop Trace
    await page.tracing.stop();
  });


  async function takeScreenshot(imagePath, delay) {
    await sleep(delay);
    await page.screenshot({ path: imagePath });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
