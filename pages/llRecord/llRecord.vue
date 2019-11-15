<template>
<!--pages/llRecord/llRecord.wxml-->
<view class="container">
  <view class="bg-white">
    <view class="text-center">
      <text style="font-size:16px;font-weight:Bold;">8888</text>
    </view>
    <view class="text-center" style="padding-bottom:20rpx;">
      <text style="font-size:14px;font-weight:Regular;">购物券总额(元)</text>
    </view>
  </view>


  <!-- <view class="flex solid-bottom padding justify-between bg-white">
      <view class="bg-grey padding-sm margin-xs radius">
        <view>
          <view>
            <text>100年传世珐琅锅</text>
          </view>
          <view>
            <text>2019-01-11 11:01:22</text>
          </view>
        </view>
        
      </view>
      <view class="bg-grey padding-sm margin-xs radius" style=" vertical-align: middle;">
        <view >
        <text>-88￥</text>
        </view>
      </view>
    </view>-->


    <view v-for="(item, index) in Records" :key="index" class="flex solid-bottom padding align-center justify-between bg-white" style="margin-top:20rpx;">
      <view>
         <view>
          <view>
            <text style="font-size:14px;font-weight:Regular;">{{item.name}}</text>
          </view>
          <view>
            <text style="font-size:12px;font-weight:Regular;color:#999999">{{item.time}}</text>
          </view>
        </view>
      </view>
      <view>
        <view>
        <text style="font-size:18px;font-weight:Regular;color:#333333">{{item.price}}</text>
        </view>
      </view>
    </view>



</view>
</template>

<script>

export default {
  data() {
    return {
      Records: [{
        name: '100年传世珐琅锅',
        time: '2019-01-11 11:01:22',
        price: '-88￥'
      }, {
        name: '平台发放',
        time: '2029-01-11 11:01:22',
        price: '-99￥'
      }]
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
@import "./llRecord.css";
</style>