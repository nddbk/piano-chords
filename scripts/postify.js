// scripts/postify

var postcss = require('postcss');
var postcssFilter = require('postcss-filter-plugins');
var nested = require('postcss-nested');
var cssnano = require('cssnano');
var cssnext = require('postcss-cssnext');
var mqpacker = require('css-mqpacker');

const ENV = process.env.NODE_ENV || 'development'; // eslint-disable-line

const POSTCSS_PLUGINS = [
  postcssFilter({
    silent: true
  }),
  nested(),
  cssnext(),
  mqpacker({
    sort: true
  }),
  cssnano()
];

var postProcess = async (css) => {
  try {
    let result = await postcss(POSTCSS_PLUGINS).process(css);
    return result.css;
  } catch (err) {
    return err;
  }
};

module.exports = postProcess;
