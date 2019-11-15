<template>
<view class="container">
	<view class="login-head">
		<image style="width: 156upx;height: 156upx;" src="../../static/images/sign_logo.png"></image>
	</view>
	
		<form @submit="formSubmit">
  <view class="login-box">
		<input placeholder="请输入手机号" name='mobile'/>
	</view>
	<view class="code-box" style="display: flex;">
		<input placeholder="请输入验证码" name='code'/>
		<text>|</text>
		<text style="margin-left: 28upx;color: #294D7D;">获取验证码</text>
	</view>
	<view class="login-btn">
		<!-- <input type="button" value="登录" readonly ="readonly"></input> -->
		<button type="primary" formType="submit" class="sbBtn">登录</button>
	</view>
	</form>

</view>
</template>

<script>

export default {
  data() {
    return {
      mobile:'',
			code:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    formSubmit: function(e) {
			console.log('2222')
    	this.user = e.detail.value
    },
  }
};
</script>
<style>
@import "./mobileLogin.css";
</style>