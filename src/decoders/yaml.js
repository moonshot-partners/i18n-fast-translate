const fs = require('fs');
const yaml = require('yaml');

module.exports = function (path) {
  return yaml.parse(fs.readFileSync(path, 'utf8'));
};
