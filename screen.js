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
      try {
        await page.open(errorScreen);
        await page.render(screenPath + fileName);
        throw new Error(status);
      }
      catch (error) {
        console.log(name + ' was not render -> ', error);
      }
    }

    await instance.exit();
  }

  renderAllScreens () {
    try {
      for (let i = 0; i < urlData.length; i++) {
        this.takeScreenshot(urlData[i].url, urlData[i].name);

        if (!urlData[i].url || !urlData[i].name) {
          throw new Error('No data in file "url.json" in ' + i + ' element' );
        }
      }
    }
    catch (error) {
      console.log(error)
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
