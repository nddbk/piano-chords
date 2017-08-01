// specs/oveview

var fs = require('fs');
var test = require('tape');

var hasFile = (f) => {
  return fs.existsSync(f);
};

test('File generation', (assert) => {
  let files = [
    './docs/index.html',
    './docs/favicon.ico',
    './docs/css/main.css',
    './docs/js/main.js'
  ];

  files.forEach((f) => {
    assert.ok(hasFile(f), `The file "${f}" must be generated`);
  });
  assert.end();
});

