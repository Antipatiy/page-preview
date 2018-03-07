"use strict";

const phantom = require('phantom');
const urlData = require('./src/data/url.json');
const fs = require('fs');
const exec = require('child_process').exec;
const path = './src/screens';
const errorScreen = 'https://i.stack.imgur.com/WOlr3.png';
const screenPath = 'src/screens/';

class Screen {

  removeScreensDirectory () {
    exec('rm -r ' + path, function (err) {});
  }

  createScreensDirectory () {
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
  }

  async takeScreenshot (urlData, name) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open(urlData);
    const fileName = name + '.png';

    if (status === 'success') {
      await page.render(screenPath + fileName);
    }

    else {
      await page.open(errorScreen);
      await page.render(screenPath + fileName);
    }
    console.log(name + ' ' + status);

    await instance.exit();
  }

  renderAllScreens () {
    for (let i = 0; i < urlData.length; i++) {
      this.takeScreenshot(urlData[i].url, urlData[i].name);
    }
  }

  startProcess () {
    this.removeScreensDirectory();
    this.createScreensDirectory();
    this.renderAllScreens()
  }
}

const screen = new Screen();
screen.startProcess();
