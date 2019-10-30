const app = getApp();
const api = require('../../configs/api.js');


Page({
  data: {
    region: ['浙江省', '宁波市', '鄞州区'],
  },
  
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  goExchange:function(e){
    console.log('--------开始确认申请----------')
    api.get('llGiftsExchange/save',{

    }).then(res =>{
      console.log(res)
      }).catch(res => {
        console.log(res)
      })
  }
})