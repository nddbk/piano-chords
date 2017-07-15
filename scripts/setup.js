#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;
var mkdirp = require('mkdirp').sync;

var download = (file) => {
  let {
    src, dest
  } = file;
  console.log('Downloading %s ...', src);
  exec(`wget -O ${dest} ${src}`);
  console.log('Downloaded %s', dest);
};

var setup = () => {
  let {builder} = require('../package');
  let {vendorDir, css, javascript} = builder;

  if (!fs.existsSync(vendorDir)) {
    mkdirp(vendorDir);
  }

  let cssDir = `${vendorDir}/css`;
  let jsDir = `${vendorDir}/js`;

  let cssFiles = [];

  for (let k in css) {
    if (css[k]) {
      cssFiles.push({
        src: css[k],
        dest: `${cssDir}/${k}.css`
      });
    }
  }

  let jsFiles = [];
  for (let k in javascript) {
    if (javascript[k]) {
      jsFiles.push({
        src: javascript[k],
        dest: `${jsDir}/${k}.js`
      });
    }
  }

  if (cssFiles.length > 0) {
    if (!fs.existsSync(cssDir)) {
      mkdirp(cssDir);
    }
    cssFiles.map(download);
  }

  if (jsFiles.length > 0) {
    if (!fs.existsSync(jsDir)) {
      mkdirp(jsDir);
    }
    jsFiles.map(download);
  }
};

setup();
