#!/usr/bin/env node

var bella = require('bellajs');
var babel = require('babel-core');
var {minify} = require('uglify-js');

var cheerio = require('cheerio');
var htmlmin = require('html-minifier').minify;

var readFile = require('./readFile');
var writeFile = require('./writeFile');

var isVendorJS = (url) => {
  return url.includes('vendor/js/');
};

var transpile = (code) => {
  return babel.transform(code, {
    presets: ['es2015'],
    plugins: [
      'transform-remove-strict-mode'
    ]
  });
};

var jsminify = (source = '') => {
  return minify(source, {sourceMap: true});
};

var compile = (htmlFile, dist) => {

  let revision = bella.createId();

  let sHtml = readFile(htmlFile);
  let $ = cheerio.load(sHtml, {
    normalizeWhitespace: true
  });
  let cssFiles = [];
  $('link[rel="stylesheet"]').each((i, elem) => {
    let ofile = $(elem).attr('href');
    cssFiles.push(`${dist}/${ofile}`);
    $(elem).remove();
  });
  let css = cssFiles.map((file) => {
    return readFile(file);
  }).join('\n');
  let cssFile = `${dist}/css/main.css`;
  writeFile(cssFile, css);
  let styleTag = `<link rel="stylesheet" type="text/css" href="css/main.css?rev=${revision}" />`;
  $('head').append(styleTag);

  let vendorJS = [];
  let jsFiles = [];
  $('script[type="text/javascript"]').each((i, elem) => {
    let ofile = $(elem).attr('src');
    if (isVendorJS(ofile)) {
      vendorJS.push(`${dist}/${ofile}`);
    } else {
      jsFiles.push(`${dist}/${ofile}`);
    }
    $(elem).remove();
  });

  let es6 = jsFiles.map((file) => {
    return readFile(file);
  }).join('\n');

  let {code} = transpile(es6);

  let js = vendorJS.map((file) => {
    return readFile(file);
  }).join('\n');

  let es5 = [js, code].join('\n');

  let jsFile = `${dist}/js/main.js`;
  writeFile(jsFile, jsminify(es5).code);
  let scriptTag = `<script type="text/javascript" src="js/main.js?rev=${revision}"></script>`;
  $('body').append(scriptTag);

  let s = $.html();
  let html = htmlmin(s, {
    collapseWhitespace: true,
    quoteCharacter: '"',
    removeComments: true,
    removeEmptyAttributes: true,
    useShortDoctype: true
  });
  writeFile(htmlFile, html);
  writeFile(htmlFile.replace('blank.html', 'index.htm'), html);
};

module.exports = compile;
