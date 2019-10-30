const app = getApp();
const api = require('../../configs/api.js');


Page({
  data: {
    region: ['浙江省', '宁波市', '鄞州区'],
    projectName:''
  },
  

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    this.setData({
      projectName: app.globalData.projectInfo.name
    })
    console.log(app.globalData.projectInfo.name)
    new app.ToastPannel();
  },


  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  getInfoBegin:function(e){
    console.log('--------开始确认申请----------')
    var that = this;
    api.get('llGiftsExchange/save',{
      code: '1111',
      project:{
        id: app.globalData.projectInfo.id
      },
      gifts:{
        id: app.globalData.gifts[0].id
      },
      address:{
        id: that.data.region[0] + that.data.region[1] + that.data.region[2]
      },
      addressDetail: e.detail.value.address,
      num: e.detail.value.num,
      name: e.detail.value.khname,
      idCard: e.detail.value.idCard,
      phone: e.detail.value.phone,
      state:'1',

    }).then(res =>{
      that.zdshowToast('申请成功，礼品即将发放给您', 2000);
      }).catch(res => {
        that.zdshowToast('申请失败，请联系客服110', 2000);
      })
  },


  // getInfo:function(e){
  //   var that = this;
  //   console.log('111111')
  //   console.log(e.detail.value.address)
  //   console.log(that.data.region[0] + that.data.region[1] + that.data.region[2])
  // },

  getInfo:function(e){
    var that = this;
    console.log('11111111111111111')
    console.log(e.detail.value.address)
    if (!e.detail.value.address){
      console.log('222222')
      that.zdshowToast('测试用，就看看有没输入详细地址', 2000);
      return;
    }

    that.getInfoBegin(e);
  }
})