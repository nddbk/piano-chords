#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;

var compile = require('./compile');

var release = () => {
  let dest = 'docs';

  if (fs.existsSync(dest)) {
    exec(`rm -rf ${dest}`);
  }
  exec(`cp -R src ${dest}`);

  compile(`${dest}/index.html`, dest);
};

release();
