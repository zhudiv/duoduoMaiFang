module.exports = {
  setStyle: function (item) {
    var defaults = '#f7f7f7';
    return 'background:' + (item.background ? item.background : defaults) + ';' + 'color:' + item.color;
  },
  setPosition: function (position) {
    return 'transform:translate(' + position.pageX + 'px,0);';
  }
};