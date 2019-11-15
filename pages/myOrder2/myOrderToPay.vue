<template>
<!--pages/myOrder/myOrder.wxml-->
<view class="container">
  
   <view class="margin bg-white radius10">
     	  <view style="display: flex;flex-direction: column;" class="padding">
     		<view>
     			<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
     				<view style="display: flex;justify-content: flex-start;">
     					<view>
     						<image src="../../static/images/list_dizhi_ic@2x.png" style="width:72rpx;height:72rpx;vertical-align: middle;"></image>
     					</view>
     			         <view>
     						 <view>{{projectName}}   {{projectPhone}}</view>
     						 <view class="font_vir">{{projectAddress}}</view>
     					 </view>
     				</view>
     				<view style="margin-top: 16rpx;">
     					<text class="cuIcon-right lg text-gray"></text>
     				</view>
     			</view>
     		</view>
     	</view>
   </view>
   
   
   
   <view class="bg-white margin radius10 padding-left padding-right padding-top" style="display: flex;flex-direction: column;">
	   <view class=" cf padding-sm" v-for="(item,index) in list" :key="index">
	     <view class="radius fl padding-sm">
	       <view style="display:inline-block;">
	         <image v-bind:src="item.goodImg" style="width:120rpx;height:120rpx;vertical-align: middle;">
	         </image>
	       </view>
	   
	       <view style="margin-left:40rpx;vertical-align: middle;display:inline-block;">
	         <view style="font-size:14px;font-weight:Regular">
	           {{item.goodName}}
	         </view>
	         <view style="font-size:13px;font-weight:Regular;color:#999999">
	           商品数量：x{{item.goodNum}}
	         </view>
	       </view>
	     </view>
	     <view class=" fr " style="display: flex;flex-direction: column;padding-top:40rpx; color:red;font-size:14px;font-weight:Regular;">
	   				 <view style="display: flex;flex-direction: row;">
						 <view style="border-radius: 4rpx;display: inline-block;background: rgb(51, 51, 51);width: 88rpx;height: 44rpx;line-height: 44rpx;text-align: center;">
							 <text style="color: rgb(241, 199, 123);font-size: 22rpx;">会员价</text>
						 </view>
						<view>
							￥{{item.adminPrice}}
						</view>
						
					 </view>
	   				 <view class="break_rule" style="margin-left: 96rpx;">￥{{item.price}}</view>
	   			 </view>
	   </view>

	   
	   
	   <view class="padding-sm" style="display: flex;justify-content: space-between;padding-top: 0;">
		   <view class="padding-sm">
			   <text style="font-size: 24rpx;">使用邻里币</text>
		   </view>
		   <view class style>
		   		<image v-bind:class="{edit_btn:is_edit_btn}" @click="btnChange()"  style="vertical-align: middle;width: 28rpx;height: 28rpx;" src="../../static/images/icon_hook.png"></image>
		     <text  v-bind:class="{edit_btn_s:is_edit_btn_s}" class="cuIcon-roundcheck lg text-gray" style="font-size:28rpx;vertical-align: middle;" @click="btnChange()"></text>
		   </view>
	   </view>
	   
	   <view class="padding-sm" style="display: flex;justify-content: space-between;padding-top: 0;">
		   <view class="padding-sm">
			   <text style="font-size: 24rpx;">配送费</text>
		   </view>
		   <view>
			   <text style="font-size: 24rpx;">￥{{shippingFee}}</text>
		   </view>
	   </view>
	   
	   <view style="border-top:1px solid rgba(204,204,204,1)"></view>
	   <view style="display: flex;justify-content:flex-end;margin-bottom: 20rpx;">
		   <view>
			 <text style="font-size: 24rpx;color:rgba(153,153,153,1);">共使用邻里币</text>   
			 <text style="font-size: 24rpx;color:rgba(245,86,86,1);">￥{{usePrice}}</text>
		   </view>
			<view style="margin-left: 60rpx;">
				<text style="font-size: 28rpx;">实付：￥{{payPrice}}</text>
			</view>
	   </view>
   </view>

   <view class="bg-white padding-left padding-right" style="justify-content: space-between; display: flex;position: fixed;bottom: 0;height: 98rpx;line-height: 96rpx;width: 100%;">
	   <view >
		   <text style="font-size: 24rpx;color:rgba(153,153,153,1);padding: 10rpx;">总计:</text>
		   <text style="color:rgba(41,77,125,1);font-size: 30rpx;">￥{{totalPrice}}</text>
	   </view>
	   <view>
		   <button class="cu-btn sm btn" style="margin-left: 20rpx;">去支付</button>
	   </view>
   </view>
</view>
</template>

<script>

export default {
  data() {
    return {
     is_edit_btn_s:false,
     is_edit_btn:true,
	 projectName: '钱多不多',
	 projectPhone: '154646546',
	 projectAddress: '浙江省宁波市鄞州区天通北路会和大厦1108',
	 shippingFee: '10',
	 usePrice:'140',
	 payPrice:'180',
	 totalPrice:'180',
	 list:[
		 {'goodName':' 小米电饭煲1','goodImg':'https://www.vvwed.com/static/images/evaluate/1.png','goodNum':'1','adminPrice':'110','price':'150'},
		 {'goodName':' 小米电饭煲2','goodImg':'https://www.vvwed.com/static/images/evaluate/1.png','goodNum':'1','adminPrice':'110','price':'150'}
		 ]
	 }
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
@import "./myOrderToPay.css";
</style>