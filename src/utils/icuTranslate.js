const parse = require('messageformat-parser').parse;
const ICU_REGEXP = /\{(.*\})\}|\{(.* \}) \}|{([^{}]*)\}/g;
const isString = (value) => typeof value === 'string';

function translate(text) {
  let value;
  let icuAst;

  try {
    icuAst = parse(text);
  } catch {
    console.log(`WARNING: Icu parser can't parse this text (${text})`);
  }

  const hasIcu = icuAst && !icuAst.every(isString);

  return {
    translate: async (transform = async (v) => v) => {
      if (hasIcu) {
        const textIcu = text.match(ICU_REGEXP);
        icuCounter = 0;
        const words = await Promise.all(
          icuAst.map((h) => {
            return isString(h) ? transform(h) : handleIcu(h, textIcu[icuCounter++], transform);
          })
        );
        return words.join(' ');
      } else {
        return await transform(text);
      }
    },
    value
  };
}

async function handleIcu(icuAST, icu, transform) {
  const supportedTypes = ['plural', 'select'];

  if (supportedTypes.includes(icuAST.type)) {
    let icuText = icu;
    for (let a of icuAST.cases) {
      for (let token of a.tokens) {
        if (isString(token)) {
          const replace = await transform(token);
          icuText = icuText.replace(token, replace);
        }
      }
    }

    return icuText;
  }

  return icu;
}

module.exports = translate;
