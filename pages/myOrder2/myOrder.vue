<template>
<!--pages/myOrder/myOrder.wxml-->
<view class="container">
  <scroll-view scroll-x class="bg-white nav">
    <view class="flex text-center">
      <view :class="'cu-item flex-sub  ' + (index==TabCur?'text-zdy-darkblue cur':'textStyle') + ' '" v-for="(item, index) in TabCurTitle" :key="index" @tap="tabSelect" :data-id="index">
        {{item}}
      </view>
    </view>
  </scroll-view>


  <view>
    <view class="bg-white margin radius10 padding-left padding-right">

      <view class="padding-xs" style="text-align:right;">已完成</view>



      <view style="vertical-align: middle;positon:relative;">
        <image src="https://www.vvwed.com/static/images/orders/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
        <view style="display:inline-block;vertical-align: middle;">
          <text style="display:block">沃隆坚果750g/盒</text>
          <text style="display:block">商品数量：x1</text>
        </view>
        <view style="display:inline-block;float:right;bottom:0;">
          <text style="display:block">￥149</text>
          <text style="display:block">￥119</text>
        </view>
      </view>


      <view style="vertical-align: middle;positon:relative;">
        <view style="float:left">
          <image src="https://www.vvwed.com/static/images/orders/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
        <view style="display:inline-block;vertical-align: middle;">
          <text style="display:block">沃隆坚果750g/盒</text>
          <text style="display:block">商品数量：x1</text>
        </view>
        </view>
        <view style="float:right;vertical-align: bottom;">
          <view style="vertical-align: bottom;">
            <text style="display:block">￥149</text>
            <text style="display:block">￥119</text>
          </view>
        </view>
        <view style="clear:both"></view>
      </view>


      <view style="display:flex;vertical-align: middle;positon:relative;">
      
      <image src="https://www.vvwed.com/static/images/orders/1.png" style="display:inline-block;width:120rpx;height:120rpx;vertical-align: middle;"></image>
      
        
        <view style="vertical-align: middle;">
          <text style="display:block">沃隆坚果750g/盒</text>
          <text style="display:block">商品数量：x1</text>
        </view>
        <view style="vertical-align: bottom; margin-left: auto;">
          <text style="display:block">￥149</text>
          <text style="display:block">￥119</text>
        </view>
      </view>

      <view class="flex solid-bottom padding-left padding-right padding-bottom padding-top justify-between ">
        <view>
          <text style="vertical-align: middle;">2019-01-08 09:05</text>
        </view>

        <view class="flex justify-around ">
          <view>
            <button class="cu-btn round line-red">评价</button>
          </view>
          <view style="width:30rpx;"></view>
          <navigator url="../addrEdit/addrEdit" hover-class="navigator-hover">
            <view>
              <button class="cu-btn round" style="color:white;background-color:#294D7D;border:1px solid #294D7D">再次购买</button>
            </view>
          </navigator>
        </view>


      </view>
    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      TabCur: 0,
      scrollLeft: 0,
      TabCurTitle: ['全部', '待付款', '待收货', '已完成']
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
    tabSelect: function () {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
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
@import "./myOrder.css";
</style>