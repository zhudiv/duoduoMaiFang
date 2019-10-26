// var api = require('../../../config/api.js');
 var util = require('../../../utils/util.js');
 var user = require('../../../utils/user.js');

var app = getApp();
Page({
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  bindgetuserinfo:function(e){
    console.log(e);
    if(e.detail.userInfo){
      app.globalData.hasLogin = true;
      app.globalData.userInfo = e.detail.userInfo;

      wx.request({
        url: 'http://127.0.0.1:8080/a/api/user/loginByOpenId',
        data: {
          flag: 'C',
          rawData: e.detail.rawData,
          code: wx.getStorageSync('code')
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // POST请求
        },
        success(res) {
          console.log(res);
          if (res.data.errCode === '0') {
            wx.setStorageSync('openid', that.data.openid);
            wx.redirectTo({
              url: '/pages/index/index'
            })
          } else {
            wx.showToast({
              title: res.data.errMsg,
              image: '/images/icon_error.png'
            })

          }
        },
        fail() {
          util.showErrorToast('服务器异常');

          // wx.showToast({
          //   title: "服务器异常,稍后再登入",
          //   image: '/images/icon_error.png'
          // })
        }
      })

      // wx.navigateBack({
      //   delta: 1
      // });
    }
  },

  wxLogin: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }

    user.checkLogin().catch(() => {
      console.log('------------checkLogin-----------');
      console.log('e.detail.userInfo:');
      console.dir(e.detail.userInfo);
      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;

        console.log(wx.getStorageSync('userInfo'))
        // wx.navigateBack({
        //   delta: 1
        // })
        wx.navigateTo({
          url: "/pages/my/my"
        });
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });

    });
  },
  accountLogin: function () {
    wx.navigateTo({
      url: "/pages/my/my"
    });
  }
})