// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:'zdh',
    openid:null,
    session_key:null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  
 

    wx.login({
      success: function(res) {
        console.log(res)
        //发送请求
        wx.request({
          url: 'https://vvwed.com/login.php', //仅为示例，并非真实的接口地址
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res);
            console.log(res.data.openid)
            that.setData({
              openid:res.data.openid,
              session_key: res.data.session_key
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    }),

    //验证登录是否过期
      wx.checkSession({
        success: function (res) {
          console.log('---checkSession---');
          console.log(res);
        },
        fail: function (res) {
          console.log(res, '登入过期了');
          wx.showModal({
            title: '提示',
            content: '您的登入信息过期了,请重新登入',
          })
          //再次调用wx.login()
          //----------
          // -----------
         },
        complete: function (res) { }
      })

    that.info();
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

  //获取用户信息
  info:function(){
    console.log('获取用户信息');
    //获取用户当前的授权状态
    wx.getSetting({
      success:function(res){
        console.log('--------获取用户信息成功------')
        console.log(res);
        wx.openSetting({
          success(res) {
            console.log(res.authSetting)
             res.authSetting = {
               "scope.userInfo": true,
               "scope.userLocation": true
             }
          },
          fail:function(res){
            console.log('openSetting fail')
          }
        })
        wx.getUserInfo({
          success: function (res) {
            console.log('--------userInfo-----');
            console.log(res.userInfo);
          }
        })
      },
      fail:function(res){
        console.log('--------获取用户信息失败------')
        console.log('--------提前向用户发起授权请求------')
        wx.authorize({
          success:function(res){
            console.log('--------提前向用户发起授权请求成功------')
            console.log('--------获取用户信息------')
            wx.getUserInfo({
              success: function (res) {
                console.log('--------userInfo-----');
                console.log(res.userInfo);
              }
            })
          },
          fail:function(res){
            console.log('--------获取用户信息失败------')
          }
        })
      }
    })
    
  },

  bindGetUserInfo:function(e) {
    console.log(e.detail.userInfo)
    var that = this;
    that.setData({
      userInfo:e.detail.userInfo
    })
  },

  bindGetPhoneNumber:function(e){
    console.log(e)
  }

})