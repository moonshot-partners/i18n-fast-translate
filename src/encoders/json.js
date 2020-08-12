const fs = require('fs');

module.exports = async function (content, path) {
  fs.writeFileSync(path, JSON.stringify(content));
};
