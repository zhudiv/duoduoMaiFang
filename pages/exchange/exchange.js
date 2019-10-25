const app = getApp();
Page({
  data: {
    region: ['浙江省', '宁波市', '鄞州区'],
  },
  
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  }
})