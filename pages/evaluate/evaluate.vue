<template>
<!--pages/evaluate/evaluate.wxml-->
<view class="container">

  <view class="margin bg-white radius10">
    <view class="flex  align-center justify-start padding" style="width:80%;display:inline-block;">
      <view style="display:inline-block;">
        <image src="https://www.vvwed.com/static/images/evaluate/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;">
        </image>
      </view>

      <view style="margin-left:40rpx;vertical-align: middle;display:inline-block;">
        <view>
          沃隆坚果750g/盒
        </view>
        <view>
          商品数量：x1
        </view>
      </view>

    </view>

    
    
    <view class="padding flex flex-direction">
<button class="cu-btn lg" style="background-color:#294D7D;color:white;border-radius:50rpx;">确定申请</button>
</view>



  </view>



</view>
</template>

<script>

export default {
  data() {
    return {};
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
@import "./evaluate.css";
</style>