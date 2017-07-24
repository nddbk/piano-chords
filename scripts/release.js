#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;
var mkdirp = require('mkdirp').sync;

var compile = require('./compile');

var updateVersion = (file, version) => {
  let manifest = fs.readFileSync(file, 'utf8');
  let json = JSON.parse(manifest);
  json.version = version;
  return fs.writeFileSync(file, JSON.stringify(json), 'utf8');
};

var release = () => {
  let releaseDir = 'releases';

  if (!fs.existsSync(releaseDir)) {
    mkdirp(releaseDir);
  }

  let {version} = require('../package');
  let dest = `${releaseDir}/v${version}`;
  if (fs.existsSync(dest)) {
    exec(`rm -rf ${dest}`);
  }
  exec(`cp -R src ${dest}`);

  updateVersion(`${dest}/manifest.json`, version);

  compile(`${dest}/blank.html`, dest);
};

release();
