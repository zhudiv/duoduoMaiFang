var bem = require('./bem.wxs').bem;

var memoize = require('./memoize.wxs').memoize;

module.exports = {
  bem: memoize(bem),
  memoize: memoize
};