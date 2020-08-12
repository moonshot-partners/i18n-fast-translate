const { Translate } = require('@google-cloud/translate').v2;
const icuTranslate = require('../utils/icuTranslate');
const htmlExtract = require('../utils/htmlExtract');

module.exports = async function ({ text, from = 'US', to }) {
  const translate = new Translate();

  return await icuTranslate(text).translate(async (textPart) => {
    const htmlTranslate = htmlExtract(textPart);

    if (['', null, undefined].includes(htmlTranslate.value)) {
      return htmlTranslate.value;
    }

    const [translation] = await translate.translate(htmlTranslate.value, to);
    return htmlTranslate.apply(translation);
  });
};
