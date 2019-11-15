<script>
//app.js
import { ToastPannel } from './component/appToast/appToast';
const api = require("./configs/api.js");

global.isEnter = function(){
	console.log('111')
	var token = uni.getStorageSync('token')
	if (!token) {
		uni.showModal({
			title: '提醒',
			content: '请登录',
			// showCancel: false,
			success: function(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				
				} else if (res.cancel) {
					uni.navigateTo({
						url: '/pages/index/index'
					});
				}
				
			return true;
			}
		});
		return false;
	} 
	
}

export default {
  globalData: {
    ToastPannel,
    userInfo: {
      avatarUrl: '/images/dengru.png',
      nickName: '请登入'
    },
    gifts: '',
    projectInfo: '',
    hasLogin: 0,
		giftID:'',

    // lazy loading openid
    getUserOpenId(callback) {
      const self = this;

      if (self.globalData.openid) {
        callback(null, self.globalData.openid);
      } else {
        wx.login({
          success(data) {
            wx.request({
              url: 'https://127.0.0.1/openid',
              data: {
                code: data.code
              },

              success(res) {
                console.log('拉取openid成功', res);
                self.globalData.openid = res.data.openid;
                callback(null, self.globalData.openid);
              },

              fail(res) {
                console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res);
                callback(res);
              }

            });
          },

          fail(err) {
            console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err);
            callback(err);
          }

        });
      }
    }

  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    wx.checkSession({
      success: res => {},
      fail: res => {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.setStorageSync('code', res.code);
			
          }
        });
      }
    }), // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      },
      fail: res => {//console.log('getting fail');
      },
      complete: res => {//console.log('getsetting complete');
      }
    });
  },
  methods: {}
};
</script>
<style>
@import "./app.css";
</style>