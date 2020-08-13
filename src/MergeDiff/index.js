const equal = require('fast-deep-equal');
const DiffValue = require('./DiffValue');
const TasksManager = require('./TaskManager');
const Config = require('./config');

module.exports = async function setDiff(base = {}, target = {}, options = {}) {
  const config = Config(options);
  const tasks = new TasksManager();
  let changed = false;

  async function diff(obj, key) {
    const hash = await obj;
    if (equal(base[key], target[key]) && config.onlyMissingKeys) {
      hash[key] = base[key];
    } else if (isPlainObject(base[key])) {
      tasks.queue(async () => (hash[key] = await setDiff(base[key], target[key], options)));
    } else if (target[key] && config.onlyMissingKeys) {
      hash[key] = target[key];
    } else {
      tasks.queue(async () => (hash[key] = await config.set(new DiffValue(base[key]))));
    }

    return hash;
  }

  const data = await Object.keys(base).reduce(diff, Promise.resolve({}));
  await tasks.performAll();
  return data;
};

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
