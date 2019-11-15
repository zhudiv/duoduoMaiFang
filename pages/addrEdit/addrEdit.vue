<template>
<!--pages/addrEdit/addrEdit.wxml-->
<view class="container">
  <form>
	<view class="cu-form-group margin-top">
		<view class="title">姓名</view>
		<input placeholder="收货人姓名"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">电话</view>
		<input placeholder="电话号码"></input>
	</view>
  
  <view class="cu-form-group">
		<view class="title">地址选择</view>
		<picker mode="region" @change="RegionChange" :value="region" :custom-item="customItem">
			<view class="picker" style="text-align:left;color:#999999;">
				{{region[0]}}，{{region[1]}}，{{region[2]}}
			</view>
		</picker>
  </view>

  <view class="cu-form-group">
		<view class="title">详细地址</view>
		<input placeholder="详细地址"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">邮政编码</view>
		<input placeholder="邮政编码"></input>
	</view>
	<view class="cu-form-group">
		<view class="title">设置默认收获地址</view>
		<switch class="purple sm"></switch>
	</view>

<view class="padding-left padding-right padding-top-xxl" @tap="goMy">
  <button class="radius10" style="background-color:#294D7D;color:white;">保存</button>
</view>


  </form>
</view>
</template>

<script>

export default {
  data() {
    return {
      region: ['浙江省', '宁波市', '鄞州区']
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
    goMy: function () {
      console.log('aaaaaaaaaaaa');
      wx.navigateTo({
        url: '../my/my'
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
@import "./addrEdit.css";
</style>