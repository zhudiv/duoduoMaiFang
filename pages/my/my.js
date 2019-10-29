// pages/my/my.js
const api = require('../../configs/api.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    hasLogin: wx.getStorageSync('hasLogin') //判断是否登入
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

    new app.ToastPannel();
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
    // if (app.globalData.hasLogin) {
    //   let userInfo = app.globalData.userInfo;
    //   that.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasLogin: app.globalData.hasLogin
    //   })
    // }
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

  goLogin: function () {
    var that = this;
    if (!that.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/my/login/login"
      });
    }
  },

  goLlRecord: function (e) {
    wx.navigateTo({
      url: "/pages/llRecord/llRecord"
    });
  },

  bindgetuserinfo: function (e) {
    var that = this;
    api.post('getDetail', {
      flag: 'C',
      rawData: e.detail.rawData,
      code: wx.getStorageSync('code')
    }).then(res => {
      console.log(res)
      if (res.mobileFlag === '1') { //绑定
      that.setData({
        hasLogin:1
      })
        wx.setStorageSync('hasLogin', 1);
        wx.setStorageSync('openid', res.openid);
      } else if (res.mobileFlag === '2') { //未绑定
        that.setData({
          hasLogin: 1
        })
        wx.setStorageSync('hasLogin', 1);
        wx.login({

          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res);
            wx.setStorageSync('code', res.code);
          }
        })
      }
    }).catch(e => {
      console.log(e);
      that.zdshowToast(e, 2500);
    })
  },

  getPhoneNumber: function (e) {
    var that = this;
 

    api.post('getPhoneNumber',
      {
        flag: 'C',
        code: wx.getStorageSync('code'),
        encrypted: e.detail.encryptedData,
        iv: e.detail.iv
      }).then(res => {
        wx.setStorageSync('hasLogin', 2)
      }).catch(e => {
        that.zdshowToast(e, 2500);
        setTimeout(function () { wx.redirectTo({ url: '../index/index', }) }, 2500)
      })
  },
    
  
  //   wx.request({
  //     // url: 'http://www.vvwed.com/test.php',
  //     url: api.getPhoneNumber,
  //     data: {
  //       flag: 'C',
  //       code: wx.getStorageSync('code'),
  //       // openId: wx.getStorageSync('openid'),
  //       encrypted: e.detail.encryptedData,
  //       iv: e.detail.iv
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // POST请求
  //     },
  //     success(res) {
  //       if (res.data.errCode === '0') {
  //         that.setData({
  //           hasLogin: 2
  //         })
  //       } else {
  //         console.log('222');
  //         console.log(res);
  //         // wx.showToast({
  //         //   title: res.data.errMsg,
  //         //   image: '/images/icon_error.png'
  //         // })

  //       }
  //     },
  //     fail() {
  //       // util.showErrorToast('服务器异常');
  //       // wx.redirectTo({
  //       //   url: '/pages/index/index',
  //       // })
  //       wx.showToast({
  //         title: "服务器异常",
  //         image: '/images/icon_error.png',
  //         duration: 2000,
  //       })
  //       setTimeout(function () { wx.redirectTo({ url: '../index/index', }) }, 2000)
  //     }
  //   })

  // },
  // bindgetuserinfo: function (e) {
  //   var that = this;
  //   console.log(e);
  //   if (e.detail.userInfo) {
  //     app.globalData.hasLogin = true;
  //     app.globalData.userInfo = e.detail.userInfo;
  //     wx.request({
  //       url: api.getDetail,
  //       data: {
  //         flag: 'C',
  //         rawData: e.detail.rawData,
  //         code: wx.getStorageSync('code')
  //       },
  //       method: 'POST',
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded' // POST请求
  //       },
  //       success(res) {
  //         console.log(res);
  //         if (res.data.errCode === '0') {
  //           wx.setStorageSync('openid', res.data.openid);
  //           // wx.redirectTo({
  //           //   url: '/pages/index/index'
  //           // })
  //           if (res.data.mobileFlag === '1') { //绑定
  //             that.setData({
  //               hasLogin: 2
  //             })

  //           } else if (res.data.mobileFlag === '2') { //未绑定
  //             that.setData({
  //               hasLogin: 1
  //             })
  //           }

  //           //登录
  //           wx.login({
  //             success: res => {
  //               // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //               wx.setStorageSync('code', res.code);
  //             }
  //           })
  //         } else {
  //           console.log('222');

  //           wx.showToast({
  //             title: res.data.errMsg,
  //             image: '/images/icon_error.png'
  //           })

  //         }
  //       },
  //       fail() {
  //         console.log('222');
  //         util.showErrorToast('服务器异常');

  //         // wx.showToast({
  //         //   title: "服务器异常,稍后再登入",
  //         //   image: '/images/icon_error.png'
  //         // })
  //       }
  //     })


  //   }
  // },

  // getPhoneNumber: function (e) {
  //   var that = this;
  //   console.log(e.detail.errMsg);
  //   console.log(e.detail.iv);
  //   console.log(e.detail.encryptedData);

  //   wx.request({
  //     // url: 'http://www.vvwed.com/test.php',
  //     url: api.getPhoneNumber,
  //     data: {
  //       flag: 'C',
  //       code: wx.getStorageSync('code'),
  //       // openId: wx.getStorageSync('openid'),
  //       encrypted: e.detail.encryptedData,
  //       iv: e.detail.iv
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // POST请求
  //     },
  //     success(res) {
  //       if (res.data.errCode === '0') {
  //         that.setData({
  //           hasLogin: 2
  //         })
  //       } else {
  //         console.log('222');
  //         console.log(res);
  //         // wx.showToast({
  //         //   title: res.data.errMsg,
  //         //   image: '/images/icon_error.png'
  //         // })

  //       }
  //     },
  //     fail() {
  //       // util.showErrorToast('服务器异常');
  //       // wx.redirectTo({
  //       //   url: '/pages/index/index',
  //       // })
  //       wx.showToast({
  //         title: "服务器异常",
  //         image: '/images/icon_error.png',
  //         duration: 2000,
  //       })
  //       setTimeout(function () { wx.redirectTo({ url: '../index/index', }) }, 2000)
  //     }
  //   })

  // },

  //提示框
  showAlter: function (e) {
    var that = this;
    that.show(e);
  }
})