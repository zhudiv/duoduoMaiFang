<template>
<view class="container">
	<view class="login-head">
		<image style="width: 156upx;height: 156upx;" src="../../static/images/sign_logo.png"></image>
	</view>
  <view class="login-box">
    <button type="primary" open-type="getUserInfo" class="login-btn" @getuserinfo="bindgetuserinfo">
			<image style="width: 36upx;height: 36upx;margin-right: 6upx;" src="../../static/images/login/sign_weixin_ic.png"></image>
			微信快捷登录</button>
			
			<button type="primary" class="account-login-btn" style="margin-top: 60upx;" @tap="accountLogin">
				<image style="width: 36upx;height: 36upx;margin-right: 6upx;" src="../../static/images/login/sign_phone_ic.png"></image>账号登录</button>
	</view>

</view>
</template>

<script>
export default {
  data() {
    return {
			hasLogin:''
		};
  },

  components: {},
  props: {},
  onLoad: function (options) {// 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
  },
  onReady: function () {},
  onShow: function () {// 页面显示
  },
  onHide: function () {// 页面隐藏
  },
  onUnload: function () {// 页面关闭
  },
  methods: {
		
		bindgetuserinfo: function (e) {
		  var that = this;
			
			this.$api.getDetail({
				flag: 'C',
				rawData: e.detail.rawData,
				code: wx.getStorageSync('code')
			}).then(res => {
				if (res.mobileFlag === '1') {
				  //绑定
				    this.hasLogin = 1
				  wx.setStorageSync('hasLogin', 1);
				  wx.setStorageSync('openid', res.openid);
					uni.reLaunch({
						url:'/pages/index/index'
					})
				} else if (res.mobileFlag === '2') {
				  //未绑定
				  this.hasLogin = 1
				  wx.setStorageSync('hasLogin', 1);
					wx.setStorageSync('openid', res.openid);
				  // wx.login({
				  //   success: res => {
				  //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
				  //     console.log(res);
				  //     wx.setStorageSync('code', res.code);
				  //   }
				  // });
					
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}
				uni.setStorageSync('token', res.token)
			});
			
		//   this.$api.post('getDetail', {
		//     flag: 'C',
		//     rawData: e.detail.rawData,
		//     code: wx.getStorageSync('code')
		//   }).then(res => {
		//     console.log(res);
		
		//     if (res.mobileFlag === '1') {
		//       //绑定
		//       that.setData({
		//         hasLogin: 1
		//       });
		//       wx.setStorageSync('hasLogin', 1);
		//       wx.setStorageSync('openid', res.openid);
		//     } else if (res.mobileFlag === '2') {
		//       //未绑定
		//       that.setData({
		//         hasLogin: 1
		//       });
		//       wx.setStorageSync('hasLogin', 1);
		//       wx.login({
		//         success: res => {
		//           // 发送 res.code 到后台换取 openId, sessionKey, unionId
		//           console.log(res);
		//           wx.setStorageSync('code', res.code);
		//         }
		//       });
		//     }
		//   }).catch(e => {
		//     console.log(e);
		//     that.zdshowToast(e, 2500);
		//   });
		},
		
		
    // bindgetuserinfo: function (e) {
    //   console.log(e);

    //   if (e.detail.userInfo) {
    //     getApp().globalData.hasLogin = true;
    //     getApp().globalData.userInfo = e.detail.userInfo;
				
				// this.$api.loginByOpenId({
				// 	flag:'C',
				// 	rawData: e.detail.rawData,
				// 	code: wx.getStorageSync('code')
				// }).then().catch()
				
    //   }
    // },
    wxLogin: function (e) {
      console.log(e.detail.userInfo);

      if (e.detail.userInfo == undefined) {
        getApp().globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
        return;
      }

      user.checkLogin().catch(() => {
        console.log('------------checkLogin-----------');
        console.log('e.detail.userInfo:');
        console.dir(e.detail.userInfo);
        user.loginByWeixin(e.detail.userInfo).then(res => {
          getApp().globalData.hasLogin = true;
          console.log(wx.getStorageSync('userInfo')); // wx.navigateBack({
          //   delta: 1
          // })

          wx.navigateTo({
            url: "/pages/my/my"
          });
        }).catch(err => {
          getApp().globalData.hasLogin = false;
          util.showErrorToast('微信登录失败');
        });
      });
    },
    
		
		accountLogin: function () {
			console.log('2222')
			// wx.navigateTo()
			uni.navigateTo({
				url:'/pages/login/mobileLogin'
			})
    },
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
@import "./login.css";
</style>