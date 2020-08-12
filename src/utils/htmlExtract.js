module.exports = function (text) {
  let text2 = text;
  const map = {};
  const match = (text || '').match(/\'<\s*[^>]*>\'/g) || [];

  match.forEach((match, index) => {
    const key = ` RR${index} `;
    text2 = text2.replace(match, key);
    map[key] = match;
  });

  return {
    value: text2,
    apply: (text) => {
      newText = text || text2;
      Object.keys(map).forEach((key) => {
        newText = newText.replace(key, map[key]).replace(key.trim(), map[key]);
      });

      return newText;
    }
  };
};
