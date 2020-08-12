module.exports = function (options) {
  return {
    onlyMissingKeys: true,
    set: async (diff) => diff.value,
    ...options
  };
};
