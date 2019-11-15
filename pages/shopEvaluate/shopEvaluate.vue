<template>
<!--pages/shopEvaluate/shopEvaluate.wxml-->
<view class="container">
  <view class="bg-white margin-top margin-left margin-right">
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



  <view class="flex padding-left padding-right justify-between align-center">
      <view class="fl" style="font-size:14px;font-weight:Regular;color:#333333">商品评分</view>
      <view class="fr">
        <text class="cuIcon-favor lg text-gray" style="font-size:40rpx;"></text>
        <text class="cuIcon-favor lg text-gray" style="font-size:40rpx;"></text>
        <text class="cuIcon-favor lg text-gray" style="font-size:40rpx;"></text>
        <text class="cuIcon-favor lg text-gray" style="font-size:40rpx;"></text>
        <text class="cuIcon-favorfill lg text-red" style="font-size:40rpx;"></text>
      </view>
    </view>




<view class="cu-form-group margin radius10">
		<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="写出您的购物体验，帮助更多小伙伴~"></textarea>
	</view>



  <view class="margin-left margin-right radius10">
  <view class="cu-bar bg-white margin-top" style="border-bottom:1rpx solid #ccc">
		<view class="action">
			图片上传
		</view>
		<view class="action">
			{{imgList.length}}/4
		</view>
	</view>
  <view class="cu-form-group padding-top;">
		<view class="grid col-4 grid-square flex-sub">
			<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				<image :src="imgList[index]" mode="aspectFill"></image>
				<view class="cu-tag bg-red" @click.stop="DelImg" :data-index="index">
					<text class="cuIcon-close"></text>
				</view>
			</view>
			<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
				<text class="cuIcon-cameraadd"></text>
			</view>
		</view>
	</view>
</view>



<view class="margin-left margin">
<switch></switch>
匿名提交
</view>


<view class="padding flex flex-direction">
<button class="cu-btn lg" style="background-color:#294D7D;color:white;border-radius:50rpx;">确定申请</button>
</view>
  


</view>
</template>

<script>

export default {
  data() {
    return {
      imgList: []
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
@import "./shopEvaluate.css";
</style>