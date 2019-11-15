<template>
	<view>
		<!-- <topbar :user="userInfo"></topbar> -->
		<!--pages/my/my.wxml-->
		
		<view class="navbar"  style="width: 100%;height: 600rpx;background-image: url(http://www.vvwed.com/static/llCimages/me_bg@2x.png);background-repeat:no-repeat; background-size:100% 100%;">
			<view :style="{height:statusBarHeight}" >
				
			</view>
			<view class='title-container'>
		
				<view class='title'>我的</view>
			</view>
		
			<view style="background-color: rgba(255, 255, 255, 0.95);width: 93%;height: 400upx;margin: 36upx auto;border-radius: 20upx;text-align: center;padding-top: 22upx;" >
				<view>
					<image src="/static/images/my/me_head_ic@2x.png" style="width: 144upx;height: 144upx;" mode=""></image>
				</view>
				<view style="margin-top: 16upx;">
					<text style="color: #333333;font-size: 30upx;line-height: 42upx;">登录</text>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;padding-left: 40upx;padding-right: 40upx;margin-top: 40upx;">
					<view style="display: flex;flex-direction: column;align-items: center;">
							<view>
								<text class="infoText">0</text>
							</view>
							<view>
								<text class="infoText">所得邻里币(元)</text>
							</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;">
							<view>
								<text class="infoText">0</text>
							</view>
							<view>
								<text class="infoText">邻里币余额(元)</text>
							</view>
					</view>
					<view style="display: flex;flex-direction: column;align-items: center;">
							<view>
								<text class="infoText">0</text>
							</view>
							<view>
								<text class="infoText">共节省金额(元)</text>
							</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<!-- <component is="toast" error-data="..._toast_ "></component> -->
		<view class="container">

			<!-- <view class="container_head margin bg-white radius10">
				<view class="profile-info ">
					<view>
						
						<open-data class="avatar" type="userAvatarUrl"></open-data>
					</view>
					
					<view v-if="hasLogin == 2" class="profile-info-text">欢迎您！<open-data type="userNickName" style="display:inline-block;"></open-data>
					</view>
					
					<button v-if="hasLogin == 0" type="primary" open-type="getUserInfo" class="wx-login-btn" @getuserinfo="bindgetuserinfo">快速登入</button>
					<button v-if="hasLogin == 1" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权手机号</button>

				</view>


				<view class="flex">
					<view class="flex-sub padding-sm">
						<view class="profile-jifen-num">
							<text>500</text>
						</view>
						<view class="profile-jifen-title">
							<text>所得邻里币(元)</text>
						</view>
					</view>
					<view class="flex-sub padding-sm">
						<view class="profile-jifen-num">
							<text>55500</text>
						</view>
						<view class="profile-jifen-title">
							<text>55500</text>
						</view>
					</view>
					<view class="flex-sub padding-sm">
						<view class="profile-jifen-num">
							<text>55500</text>
						</view>
						<view class="profile-jifen-title">
							<text>共节省金额(元)</text>
						</view>
					</view>
				</view>
			</view> -->





			<view style="width:100%；height:200rpx;" class="bg-white margin radius10">
				<view class="flex solid-bottom padding-left padding-right justify-between">
					<navigator url="../myOrder/myOrder" hover-class="navigator-hover">
					    <view class="padding-sm margin-xs radius">
					      <view>
					        <image src="../../static/images/my/ic_order_me.png" style="width:50rpx;height:50rpx;"></image>
					      </view>
					      <view>
					      <text class="myOrderText">全部订单</text>
					        
					      </view>
					    </view>
					  </navigator>
					<view class=" padding-sm margin-xs radius">
						<view>
							<image src="../../static/images/my/ic_obligation_me.png" style="width:50rpx;height:50rpx;"></image>
						</view>
						<view>
							<text class="myOrderText">待付款</text>

						</view>
					</view>
					<view class=" padding-sm margin-xs radius">
						<view>
							<image src="../../static/images/my/ic_wait_me.png" style="width:50rpx;height:50rpx;"></image>
						</view>
						<view>
							<text class="myOrderText">待收货</text>

						</view>
					</view>
				</view>
				<view class="flex solid-bottom padding-left padding-right justify-between">
					<view class=" padding-sm margin-xs radius">
						<view>
							<image src="../../static/images/my/ic_complete_me.png" style="width:50rpx;height:50rpx;"></image>
						</view>
						<view>
							<text class="myOrderText">已完成</text>

						</view>
					</view>
					<navigator url="../evaluate/evaluate" hover-class="navigator-hover">
						<view class=" padding-sm margin-xs radius">
							<view>
								<image src="../../static/images/my/ic_ service_me.png" style="width:50rpx;height:50rpx;"></image>
							</view>
							<view>
								<text class="myOrderText">待评价</text>

							</view>
						</view>
					</navigator>

					<navigator url="../afterSale/afterSaleLogin" hover-class="navigator-hover">
					<view class=" padding-sm margin-xs radius">
					  <view>
					    <image src="../../static/images/my/ic_service_me2.png" style="width:50rpx;height:50rpx;"></image>
					  </view>
					  <view>
					  <text class="myOrderText">售后</text>
					    
					  </view>
					</view>
					</navigator>
				</view>
			</view>


			<view class="zdTitle margin" style="text-align:left;">我的工具</view>
			<view class="my_list_ul margin radius10">
	<navigator url="../addrList/addrList" hover-class="navigator-hover">
	    <view class="my_list_li">
	      <view class="my_list_lia">
	        <view class="my_list_ab">
	          <image src="../../static/images/my_address.png" class="my_list_img" background-size="cover" mode="scaleToFill"></image>
	        </view>
	        <view class="my_list_ac">
	          <text>地址管理</text>
	        </view>
	        <view class="my_list_ad">
	          <image src="../../static/images/shop_xq_b.png" class="my_list_imga" background-size="cover" mode="scaleToFill"></image>
	        </view>
	      </view>
	    </view>
	  </navigator>
	  <navigator url="../llRecord/llRecord" hover-class="navigator-hover">
	    <view class="my_list_li">
	      <view class="my_list_lia">
	        <view class="my_list_ab">
	          <image src="../../static/images/my_exchange.png" class="my_list_img" background-size="cover" mode="scaleToFill"></image>
	        </view>
	        <view class="my_list_ac">
	          <text>兑换记录</text>
	        </view>
	        <view class="my_list_ad">
	          <image src="../../static/images/shop_xq_b.png" class="my_list_imga" background-size="cover" mode="scaleToFill"></image>
	        </view>
	      </view>
	    </view>
	  </navigator>
	<navigator url="../giftHistory/giftHistory" hover-class="navigator-hover">
	  <view class="my_list_li">
	    <view class="my_list_lia">
	      <view class="my_list_ab">
	        <image src="../../static/images/icon_gift_exchange.png" class="my_list_img" background-size="cover" mode="scaleToFill"></image>
	      </view>
	      <view class="my_list_ac">
	        <text>礼品兑换</text>
	      </view>
	      <view class="my_list_ad">
	        <image src="../../static/images/shop_xq_b.png" class="my_list_imga" background-size="cover" mode="scaleToFill"></image>
	      </view>
	    </view>
	  </view>
	</navigator>
			</view>



		</view>
	</view>
</template>

<script>
	// pages/my/my.js
	import topbar from '@/components/topbar.vue';

	export default {
		data() {
			return {
				statusBarHeight:wx.getSystemInfoSync().statusBarHeight + 'px',
				userInfo: getApp().globalData.userInfo,
				hasLogin: wx.getStorageSync('hasLogin') //判断是否登入
			};
		},

		components: {
			topbar
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log(); // var that = this;
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

			new(getApp().globalData.ToastPannel)();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this; //获取用户的登入信息
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
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			goLogin: function() {
				var that = this;

				if (!that.hasLogin) {
					wx.navigateTo({
						url: "/pages/my/login/login"
					});
				}
			},
			goLlRecord: function(e) {
				wx.navigateTo({
					url: "/pages/llRecord/llRecord"
				});
			},
			bindgetuserinfo: function(e) {
				// var that = this;
				// api.post('getDetail', {
				//   flag: 'C',
				//   rawData: e.detail.rawData,
				//   code: wx.getStorageSync('code')
				// }).then(res => {
				//   console.log(res);

				//   if (res.mobileFlag === '1') {
				//     //绑定
				//     that.setData({
				//       hasLogin: 1
				//     });
				//     wx.setStorageSync('hasLogin', 1);
				//     wx.setStorageSync('openid', res.openid);
				//   } else if (res.mobileFlag === '2') {
				//     //未绑定
				//     that.setData({
				//       hasLogin: 1
				//     });
				//     wx.setStorageSync('hasLogin', 1);
				//     wx.login({
				//       success: res => {
				//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
				//         console.log(res);
				//         wx.setStorageSync('code', res.code);
				//       }
				//     });
				//   }
				// }).catch(e => {
				//   console.log(e);
				//   that.zdshowToast(e, 2500);
				// });
			},
			getPhoneNumber: function(e) {
				var that = this;
				api.post('getPhoneNumber', {
					flag: 'C',
					code: wx.getStorageSync('code'),
					encrypted: e.detail.encryptedData,
					iv: e.detail.iv
				}).then(res => {
					wx.setStorageSync('hasLogin', 2);
				}).catch(e => {
					that.zdshowToast(e, 2500);
					setTimeout(function() {
						wx.redirectTo({
							url: '../index/index'
						});
					}, 2500);
				});
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
			showAlter: function(e) {
				var that = this;
				that.show(e);
			},
			setData: function(obj) {
				let that = this;
				let keys = [];
				let val, data;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
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
	@import "./my.css";
</style>
