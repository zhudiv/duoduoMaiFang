var prefixCls = 'i-rate';
module.exports = {
  getCurrent: function (value, index) {
    if (index < value) {
      return prefixCls + '-current';
    }
  }
};