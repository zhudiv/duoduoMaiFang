// pages/my/my.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    hasLogin: app.globalData.hasLogin //判断是否登入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
    // var that = this;
    // if (app.globalData.userInfo == null){
    //   console.log('onLoad')
    //   wx.redirectTo({
    //     url: '../login/login',
    //   })
    // }else{
    //   that.setData({
    //     userInfo:app.globalData.userInfo
    //   })
      
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取用户的登入信息
    if (app.globalData.hasLogin){
      // let userInfo = wx.getStorageSync('userInfo');
      // that.setData({
      //   userInfo:userInfo,
      //   hasLogin:true
      // })
      let userInfo = app.globalData.userInfo;
      that.setData({
        userInfo: app.globalData.userInfo,
        hasLogin: app.globalData.hasLogin
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goLogin:function(){
    var that = this;
    if (!that.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/my/login/login"
      });
    }
  }
})