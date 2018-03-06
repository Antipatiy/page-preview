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
    let status = await page.open(urlData);

    console.log(name + ' ' + status);

    if (status === 'success') {
      let fileName = name + '.png';
      await page.render(this.screenPath + fileName);
    }

    if (status === 'fail') {
      await page.open(this.errorScreen);
      let fileName = name + '.png';
      await page.render(this.screenPath + fileName);
    }
    await instance.exit()
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

//------------------------------------------------------------------
//
// const phantom = require('phantom');
// const urlData = require('./src/data/url.json');
// const fs = require('fs');
// const dir = './src/screens';
// const exec = require('child_process').exec;
// const path = './src/screens';
//
// // remove screens directory
// exec('rm -r ' + path, function (err) {});
//
// // create screens directory
// if (!fs.existsSync(dir)){
//   fs.mkdirSync(dir);
// }
//
// const takeScreenShot = async (urlData, name) => {
//   const instance = await phantom.create();
//   const page = await instance.createPage();
//   let status = await page.open(urlData);
//
//   console.log(name + ' ' + status);
//
//   if (status === 'success') {
//     let fileName = name + '.png';
//     await page.render('src/screens/' + fileName);
//   }
//
//   if (status === 'fail') {
//     await page.open('https://i.stack.imgur.com/WOlr3.png');
//     let fileName = name + '.png';
//     await page.render('src/screens/' + fileName);
//   }
//   await instance.exit()
// };
//
// for (let i = 0; i < urlData.length; i++) {
//   takeScreenShot(urlData[i].url, urlData[i].name);
// }
