const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')
//const WORKINGDIR = path.dirname(fs.realpathSync(__filename))

module.exports = async function() {
  console.log(chalk.green('Setup Puppeteer'))
  const options = { executablePath: '/usr/bin/chromium-browser' };
  const browser = await puppeteer.launch(options)
  /*const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
})*/
  //const browser = await puppeteer.launch({})
  global.__BROWSER__ = browser
  var screenshots = path.join(path.dirname(fs.realpathSync(__filename)), 'screenshots');

  if (!fs.existsSync(screenshots)){
    mkdirp.sync(screenshots);
  }

  var traces = path.join(path.dirname(fs.realpathSync(__filename)), 'traces');

  if (!fs.existsSync(traces)){
    mkdirp.sync(traces);
  }

  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
