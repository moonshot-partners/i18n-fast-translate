const fs = require('fs');
const yaml = require('yaml');
module.exports = async function (content, path) {
  fs.writeFileSync(path, yaml.stringify(content));
};
