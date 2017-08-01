/**
 * Sample E2E test script with TestCafe
 * For more info, please visit:
 * --> https://devexpress.github.io/testcafe/documentation/getting-started/
 *
**/

/* global fixture test */

var assert = require('assert');
var selector = require('testcafe').Selector;

fixture('Go to homepage').page('http://127.0.0.1:8081');

const getTitle = selector(() => document.getElementsByTagName('title'));

const SITE_TITLE = 'Piano Chords';

test(`It must have title "${SITE_TITLE}"`, async () => {
  let title = await getTitle();
  assert.ok(title.textContent === SITE_TITLE);
});

test(`It must have header`, async () => {
  let header = selector('header');
  assert.ok(header);
});

test(`It must have "header" element`, async () => {
  let header = selector('header');
  assert.ok(header);
});

test(`It must have "main" element`, async () => {
  let main = selector('main');
  assert.ok(main);
});

test(`It must have "keyboard" element`, async () => {
  let keyboard = selector('.keyboard');
  assert.ok(keyboard);
});