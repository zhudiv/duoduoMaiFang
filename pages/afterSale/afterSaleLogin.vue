<template>
<!--pages/afterSale/afterSaleLogin.wxml-->
<view class="container">
        <view class="margin bg-white radius10" v-for="(item,index) in list":key="index">
      	  <view style="display: flex;flex-direction: column;" class="padding">
      		<view>
      			<view style="display: flex;justify-content: space-between;">
      				<view style="display: flex;justify-content: flex-start;">
      					<view>
      						<image v-bind:src="item.src" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
      					</view>
      			         <view style="margin-left:40rpx;vertical-align: middle;margin-top: 20rpx;" >
      						 <view>{{item.name}}</view>
      						 <view class="font_vir">商品数量：x{{item.count}}</view>
      					 </view>
      				</view>
				  <navigator url="afterSale">
      				<view style="margin-top: 36rpx;color: red;">
      					<button class="cu-btn sm btn">确定申请</button>
      				</view>
					</navigator>	
      			</view>
      		</view>
      	</view>
    </view>
	
	<view class="margin bg-white radius10">
	  	  <view style="display: flex;flex-direction: column;" class="padding">
	  		<view>
				<view style="margin-left: 10rpx;">
					<text class="apply">申请中</text>
				</view>
	  			<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
	  				<view style="display: flex;justify-content: flex-start;">
	  					<view>
	  						<image src="https://www.vvwed.com/static/images/evaluate/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
	  					</view>
	  			         <view style="margin-left:40rpx;vertical-align: middle;margin-top: 20rpx;" >
	  						 <view>沃隆坚果750g/盒</view>
	  						 <view class="font_vir">商品数量：x1</view>
	  					 </view>
	  				</view>
	  				<view style="margin-top: 36rpx;color: red;">
	  					<button class="cu-btn sm not_btn">查看详情</button>
	  				</view>
	  			</view>
	  		</view>
	  	</view>
	</view>
	
	<view class="margin bg-white radius10">
	  	  <view style="display: flex;flex-direction: column;" class="padding">
	  		<view>
				<view style="margin-left: 10rpx;">
					<text class="reject">被驳回</text>
				</view>
	  			<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
	  				<view style="display: flex;justify-content: flex-start;">
	  					<view>
	  						<image src="https://www.vvwed.com/static/images/evaluate/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
	  					</view>
	  			         <view style="margin-left:40rpx;vertical-align: middle;margin-top: 20rpx;" >
	  						 <view>沃隆坚果750g/盒</view>
	  						 <view class="font_vir">商品数量：x1</view>
	  					 </view>
	  				</view>
	  				<view style="margin-top: 36rpx;color: red;">
	  					<button class="cu-btn sm not_btn">查看详情</button>
	  				</view>
	  			</view>
	  		</view>
	  	</view>
	</view>
	
	<view class="margin bg-white radius10">
	  	  <view style="display: flex;flex-direction: column;" class="padding">
	  		<view>
				<view style="margin-left: 10rpx;">
					<text class="success">已完成</text>
				</view>
	  			<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
	  				<view style="display: flex;justify-content: flex-start;">
	  					<view>
	  						<image src="https://www.vvwed.com/static/images/evaluate/1.png" style="width:120rpx;height:120rpx;vertical-align: middle;"></image>
	  					</view>
	  			         <view style="margin-left:40rpx;vertical-align: middle;margin-top: 20rpx;" >
	  						 <view>沃隆坚果750g/盒</view>
	  						 <view class="font_vir">商品数量：x1</view>
	  					 </view>
	  				</view>
	  				<view style="margin-top: 36rpx;color: red;">
	  					<button class="cu-btn sm not_btn">查看详情</button>
	  				</view>
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
      list : [{
		  name : '沃隆坚果750g/盒',
		  count : '2',
		  src : 'https://www.vvwed.com/static/images/evaluate/1.png'
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
    
  }
};
</script>
<style>
@import "./afterSaleLogin.css";
</style>