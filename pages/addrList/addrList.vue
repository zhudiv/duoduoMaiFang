<template>
<!--pages/addrList/addrList.wxml-->
<view>
  <view class="bg-white margin radius10">
    <view class="padding" style="line-height: 50rpx;">
      <text style="display:block;">钱多多 154646546</text>
      <text style="display:block;font-size: 24rpx;">浙江省宁波市鄞州区天通北路会和大厦1108</text>
      <text style="display:block;font-size: 24rpx;">邮编：100000</text>
    </view>

    <view class="flex solid-bottom padding-left padding-right padding-bottom padding-top justify-between " style="width:100%;align-items:center;border-top:1px solid #CCCCCC">
		<view style="display: flex;justify-content:space-between;">
			 <view class style>
			 		<image v-bind:class="{edit_btn:is_edit_btn}" @click="btnChange()"  style="vertical-align: middle;width: 40rpx;height: 40rpx;" src="../../static/images/icon_hook.png"></image>
			   <text  v-bind:class="{edit_btn_s:is_edit_btn_s}" class="cuIcon-roundcheck lg text-gray" style="font-size:40rpx;vertical-align: middle;" @click="btnChange()"></text>
			 </view>
		</view>
      <text style="vertical-align: middle;margin-left: -140rpx;">设为默认地址</text>

      <view class="flex justify-around ">
        <view>
          <button class="cu-btn round line-gray">删除</button>
        </view>
        <view style="width:30rpx;"></view>
        <navigator url="../addrEdit/addrEdit" hover-class="navigator-hover">
          <view>
            <button class="cu-btn round" style="color:white;background-color:#294D7D;border:1px solid #294D7D">编辑</button>
          </view>
        </navigator>
      </view>


    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
		is_edit_btn_s:false,
		is_edit_btn:true
	};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
	btnChange(){
	    this.is_edit_btn=!this.is_edit_btn;
	    this.is_edit_btn_s=!this.is_edit_btn_s;
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
<style lang="scss">
	.edit_btn{
		display: none;
	}
	.edit_btn_s{
		display: none;
	}
</style>
<style>
@import "./addrList.css";
</style>