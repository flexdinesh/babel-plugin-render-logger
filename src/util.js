const getSafeRegexFromConfig = (opts = {}) => {
  const compNameStr = opts.name || '^';
  const compNameRegex = new RegExp(compNameStr, 'g');
  return compNameRegex;
};

module.exports = {
  getSafeRegexFromConfig
};
