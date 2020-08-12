const icuTranslate = require('../utils/icuTranslate');
const htmlExtract = require('../utils/htmlExtract');
const got = require('got');

module.exports = async function ({ text, from = 'US', to }) {
  const apiKey = process.env.GOOGLE_TRANSLATE_V2_API_KEY;
  return await icuTranslate(text).translate(async (textPart) => {
    const htmlTranslate = htmlExtract(textPart);

    if (['', null, undefined].includes(htmlTranslate.value)) {
      return htmlTranslate.value;
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = await got.post(url, {
      json: {
        target: to,
        q: htmlTranslate.value
      }
    });

    const result = JSON.parse(data.body);
    return htmlTranslate.apply(result.data.translations[0].translatedText);
  });
};
