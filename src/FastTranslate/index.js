const MergeDiff = require('../MergeDiff');

const VALID_FORMATS = ['json', 'yaml'];

module.exports = async function ({ base, target, provider = 'google', format, to }) {
  if (!VALID_FORMATS.includes(format)) {
    throw `FastTranslate doesn't allow this format (${format.toLowerCase()})`;
  }

  const decoder = require(`../decoders/${format.toLowerCase()}`);
  const encoder = require(`../encoders/${format.toLowerCase()}`);
  const translate = require(`../providers/${provider}`);

  const baseFile = decoder(base);
  const targetFile = decoder(target);

  const result = await MergeDiff(baseFile, targetFile, {
    set: async (diff) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`moonshot.partners | Fast Translate: ${diff.value}, to: ${to}`);
      return await translate({ text: diff.value, to: to });
    }
  });

  const ok = await encoder(result, target);
  return result;
};
