/**
 * Import specs
 */

var files = [
  'generation'
];

files.forEach((fname) => {
  require(`../test/specs/${fname}.js`);
});

