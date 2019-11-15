<template>
<!--pages/giftDetail/giftDetail.wxml-->
<view>

<view v-for="(item, index) in lists2" :key="index" class="padding radius text-left shadow-blur">
				<view class="flex  p-xs margin-bottom-sm mb-sm align-center">
			<view class="flex-sub radius">
				<image class="imageView" mode="aspectFill" :src="item.thumb"></image>
			</view>
      <view class="flex-twice padding-left-lg radius">
				<view>
					<text class="zd-text-red text-bold padding-xs ">{{item.shopPrice}}</text>
				</view>
				<view>
					<text class="zd-text-black text-bold padding-xs">{{item.name}}</text>
				</view>
				<view>
					<text class="zd-text-grey text-bold padding-xs">{{item.tag}}</text>
				</view>
			</view>
    </view> 
</view>
<button style="position:fixed;bottom:0;width:100%;background-color:#294D7D;color:white;z-index:10;border-radius:0;" @tap="goExchange">申请兑换</button>
</view>
</template>

<script>

export default {
  data() {
    return {
      // lists: [
      //   {
      //     index: 0,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift1.png',
      //     name: '小米全面屏电视E55A',
      //     tag: '全面屏设计，人工智能语音',
      //     price: '￥10000'
      //   },
      //   {
      //     index: 1,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift2.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '￥20000'
      //   },
      //   {
      //     index: 2,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift3.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '30000~20000'
      //   },
      //   {
      //     index: 3,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift4.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '10000~20000'
      //   },
      //   {
      //     index: 4,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift5.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '10000~20000'
      //   },
      //   {
      //     index: 4,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift6.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '10000~20000'
      //   },
      //   {
      //     index: 4,
      //     src: 'https://www.vvwed.com/static/images/giftList/gift7.png',
      //     name: '米兔婴儿理发器 白色',
      //     tag: '适合零经验爸妈使用',
      //     price: '10000~20000'
      //   }
      // ]
      lists2: getApp().globalData.gifts
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {// var that = this;
    // console.log(options.giftInfo);
    // that.setData({
    //   lists2: options.giftInfo
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      lists2: getApp().globalData.gifts
    });
  },

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
    goExchange: function (e) {
      wx.navigateTo({
        url: '../exchange/exchange'
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
@import "./giftDetail.css";
</style>