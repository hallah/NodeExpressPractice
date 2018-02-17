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

const userNameInput = "#username";
const username = "DAAutomationDist";
const passwordInput = "#password";
const password = "P@ssw0rd";
const stateInput = "#lstState";
const state = "Massachusetts";
const goButton = "#go";
const subSelRead = "#subject-selector-reading";
const selHref = "#educatorDashboardDiv > a";
const selRoster = 'a[href="/educator/roster"]';

describe("Open i-ready Website", () => {
  var browser, page;
  var url = "https://platyborg.i-ready.com";
  beforeEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });
  afterEach(() => {
    browser.close();
  });
  test("Username container value == Username", async () => {
    //Start Trace
    await page.tracing.start({ path: 'traces/trace.json' });
    await page.goto(url);
    await logIn();
    await page.waitForSelector(selHref);
    await page.screenshot({ path: "screenshots/example.png" });
    await page.click(selHref)
    await page.waitForSelector(selRoster);
    await page.screenshot({ path: "screenshots/example1.png" });
    await page.click(selRoster);
    await takeScreenshot("screenshots/example2.png", 30000);
    //Stop Trace
    await page.tracing.stop();
  });

  async function logIn() {
    await page.waitForSelector(userNameInput);
    await setSelectVal(userNameInput, "");
    expect(await getSelectVal(userNameInput)).toBe("");
    await page.click(userNameInput);
    await page.type(userNameInput, username);
    expect(await getSelectVal(userNameInput)).toBe(username);
    await setSelectVal(passwordInput, "");
    expect(await getSelectVal(passwordInput)).toBe("");
    await setSelectVal(passwordInput, password);
    expect(await getSelectVal(passwordInput)).toBe(password);
    await chooseDropDownVal(stateInput, state);
    page.click(goButton);
  }

  async function setSelectVal(sel, val) {
    page.evaluate(
      data => {
        return (document.querySelector(data.sel).value = data.val);
      },
      { sel, val },
    );
  }

  async function getSelectVal(sel) {
    return page.$eval(sel, e => e.value);
  }

  async function chooseDropDownVal(sel, val) {
    page.evaluate(
      data => {
        var selectObj = document.querySelector(data.sel);
        for (var i = 0; i < selectObj.options.length; i++) {
          if (selectObj.options[i].text === data.val) {
            selectObj.options[i].selected = true;
            return;
          }
        }
      },
      { sel, val },
    );
  }

  async function takeScreenshot(imagePath, delay) {
    await sleep(delay);
    await page.screenshot({ path: imagePath });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
