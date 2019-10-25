// pages/giftDetail/giftDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        index: 0,
        src: 'https://www.vvwed.com/static/images/giftList/gift1.png',
        name: '小米全面屏电视E55A',
        tag: '全面屏设计，人工智能语音',
        price: '￥10000'
      },
      {
        index: 1,
        src: 'https://www.vvwed.com/static/images/giftList/gift2.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '￥20000'
      },
      {
        index: 2,
        src: 'https://www.vvwed.com/static/images/giftList/gift3.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '30000~20000'
      },
      {
        index: 3,
        src: 'https://www.vvwed.com/static/images/giftList/gift4.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '10000~20000'
      },
      {
        index: 4,
        src: 'https://www.vvwed.com/static/images/giftList/gift5.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '10000~20000'
      },
      {
        index: 4,
        src: 'https://www.vvwed.com/static/images/giftList/gift6.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '10000~20000'
      },
      {
        index: 4,
        src: 'https://www.vvwed.com/static/images/giftList/gift7.png',
        name: '米兔婴儿理发器 白色',
        tag: '适合零经验爸妈使用',
        price: '10000~20000'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  goExchange: function (e) {
    wx.navigateTo({
      url: '../exchange/exchange',
    })
  }
})