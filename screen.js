class Screen {
  constructor() {
    this.phantom = require('phantom');
    this.urlData = require('./src/data/url.json');
    this.fs = require('fs');
    this.dir = './src/screens';
    this.exec = require('child_process').exec;
    this.path = './src/screens';
    this.errorScreen = 'https://i.stack.imgur.com/WOlr3.png';
    this.screenPath = 'src/screens/';
  }

  removeScreensDirectory () {
    this.exec('rm -r ' + this.path, function (err) {});
  }

  createScreensDirectory () {
    if (!this.fs.existsSync(this.dir)){
      this.fs.mkdirSync(this.dir);
    }
  }

  async takeScreenshot (urlData, name) {
    const instance = await this.phantom.create();
    const page = await instance.createPage();
    const status = await page.open(urlData);
    const fileName = name + '.png';

    if (status === 'success') {
      await page.render(this.screenPath + fileName);
    }

    else {
      await page.open(this.errorScreen);
      await page.render(this.screenPath + fileName);
    }
    console.log(name + ' ' + status);

    await instance.exit();
  }

  renderAllScreens () {
    for (let i = 0; i < this.urlData.length; i++) {
      this.takeScreenshot(this.urlData[i].url, this.urlData[i].name);
    }
  }

  init () {
    this.removeScreensDirectory();
    this.createScreensDirectory();
    this.renderAllScreens()
  }
}

new Screen().init();
