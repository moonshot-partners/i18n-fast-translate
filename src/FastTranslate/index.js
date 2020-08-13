const MergeDiff = require('../MergeDiff');
const readline = require('readline');
const VALID_FORMATS = ['json', 'yaml'];

module.exports = async function ({ base, target, provider = 'google', format, to }) {
  if (!VALID_FORMATS.includes(format)) {
    throw `FastTranslate doesn't allow this format (${format.toLowerCase()})`;
  }

  let changed = false;

  const decoder = require(`../decoders/${format.toLowerCase()}`);
  const encoder = require(`../encoders/${format.toLowerCase()}`);
  const translate = require(`../providers/${provider}`);

  const baseFile = decoder(base);
  const targetFile = decoder(target);

  const result = await MergeDiff(baseFile, targetFile, {
    set: async (diff) => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0, null);
      process.stdout.write(`moonshot.partners | Fast Translate: ${diff.value}, to: ${to}`);
      changed = true;
      return await translate({ text: diff.value, to: to });
    }
  });

  if (changed) {
    await encoder(result, target);
  }

  return result;
};
