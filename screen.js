const phantom = require('phantom');
const urlData = require('./src/data/url.json');
const fs = require('fs');
const dir = './src/screens';
const exec = require('child_process').exec;
const path = './src/screens';

// remove screens directory
exec('rm -r ' + path, function (err) {});

// create screens directory
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const takeScreenShot = async (urlData, name) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  let status = await page.open(urlData);
  console.log(name + ' ' + status);
  if (status === 'success') {
    let fileName = name + '.png';
    await page.render('src/screens/' + fileName);
  }
  if (status === 'fail') {
    await page.open('https://i.stack.imgur.com/WOlr3.png');
    let fileName = name + '.png';
    await page.render('src/screens/' + fileName);
  }
  await instance.exit()
};

for (let i = 0; i < urlData.length; i++) {
  takeScreenShot(urlData[i].url, urlData[i].name);
}
