// builder/delFile

var fs = require('fs');

var delFile = (f) => {
  return fs.existsSync(f) ? fs.unlinkSync(f) : true;
};

module.exports = delFile;
