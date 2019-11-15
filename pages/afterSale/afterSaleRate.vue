<template>
<!--pages/afterSale/afterSale.wxml-->
<view class="container">
   <view class="bg-white padding" style="display: flex;flex-direction: column;">
	   <view>售后申请中</view>
	   <view style="margin-top: 20rpx;">2019-9-18 12:00:00</view>
   </view>	

<view class="margin-top">
 <view class="cu-form-group">
		<view class="title">普通选择</view>
		<picker @change="PickerChange" :value="index1" :range="picker1">
			<view class="picker">
				{{index1?picker1[index1]:'退款/换货'}}
			</view>
		</picker>
	</view>
  <view class="cu-form-group">
		<view class="title">申请原因</view>
		<picker @change="PickerChange" :value="index2" :range="picker2">
			<view class="picker" style="color:rgba(153,153,153,1) !important;">
				{{index1?picker2[index2]:'退款/换货'}}
			</view>
		</picker>
	</view>
</view>

 <view class="cu-form-group margin-top">
 		<view class="title">退款金额</view>
		<view style="color: red;">￥ 100</view>
 </view>
 
 <view class="bg-white margin-top ">
   <view class=" cf padding-sm">
     <view class="radius fl padding-sm">
       <view style="display:inline-block;">
         <image src="https://www.vvwed.com/static/images/evaluate/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;">
         </image>
       </view>
 
       <view style="margin-left:40rpx;vertical-align: middle;display:inline-block;">
         <view style="font-size:14px;font-weight:Regular">
           沃隆坚果750g/盒
         </view>
         <view style="font-size:13px;font-weight:Regular;color:#999999">
           商品数量：x1
         </view>
       </view>
     </view>
     <view class=" fr " style="display:inline-block;padding-top:80rpx; color:red;font-size:14px;font-weight:Regular;">￥110</view>
   </view>
 </view>

</view>
</template>

<script>

export default {
  data() {
    return {
      index1: null,
      picker1: ['退款', '退货'],
      index2: null,
      picker2: ['退款', '退货'],
      imgList: [],
      index: ""
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
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      });
    },

    ViewImage(e) {
      wx.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
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
@import "./afterSale.css";
</style>