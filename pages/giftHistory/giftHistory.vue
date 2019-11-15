<template>
<!--pages/llRecord/llRecord.wxml-->
<view class="container">
 


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
	  
	  <view  v-for="(item, index) in giftHistory" :key="index" style="display: flex;flex-direction:column;margin-top:20rpx;" class="bg-white solid-bottom align-left padding" >
	  	<view>
	  		 <text class="gift_name">{{item.address}}</text>
	  	</view>
		<view style="display: flex;justify-content: space-between;">
		    <view class="gift_line_height">
		    	<text class="gift_time">礼包类型：</text>
		    	<text class="gift_name">{{item.gift}}</text>
		    </view>	
			<view class="gift_line_height">
				 <text class="gift_time">{{item.time}}</text>
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
      giftHistory: [{
        address: '中环道小区地下一层8号车位',
        gift: '礼包二',
        time: '2019-01-11'
      },{
        address: '中环道小区地下一层8号车位',
        gift: '礼包二',
        time: '2019-01-11'
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
@import "./giftHistory.css";
</style>