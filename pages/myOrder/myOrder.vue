<template>
<!--pages/myOrder/myOrder.wxml-->
<view class="container">


<scroll-view scroll-x class="bg-white nav">
	 <view class="flex text-center">
		   <view v-for="(item,index) in tabList" :key="index" 
		   class="cu-item flex-sub textStyle" :class="{current : tableIndex == index}" 
		   @click="tabClick(index)">
		     {{item.text}}
		   </view>
		 </view>
	</scroll-view>


 <view v-if="list==''" style="display: flex;align-items: center;justify-content: center;height: 800rpx;">
			 <view>
				 <view style="display: flex;flex-direction: column;align-content: center;text-align: center;">
					 <view>
						 <image style="width: 330rpx;height: 232rpx;" src="../../static/images/order_isNull.png"></image>  
					 </view>
					 <view style="margin-top: 40rpx;">
						  <text style="color:rgba(153,153,153,1);font-size: 28rpx;">暂无数据</text>  
					 </view>
				 </view>
				 
			 </view>
			 
		</view>

  <view>
	  <view v-for="(item,index) in list" :key="index" class="bg-white margin radius10 padding-left padding-right" style="display: flex;flex-direction: column;">
		   <view style="display: flex;justify-content: space-between;padding-top: 20rpx;">
			    <view class="vir">{{item.timeMsg}}</view>
				<view class="order_obl" v-if="item.type=='1'">待付款</view>
				<view class="order_gain" v-else-if="item.type=='2'">待收货</view>
				<view v-else-if="item.type=='0'">已完成</view>
		   </view>
		  <view>
		   <view class=" cf padding-sm" v-for="(itemgd,indexgd) in item.goods" :key="indexgd">
		     <view class="radius fl padding-sm">
		       <view style="display:inline-block;">
		         <image v-bind:src="itemgd.img" style="width:120rpx;height:120rpx;vertical-align: middle;">
		         </image>
		       </view>
		   
		       <view style="margin-left:40rpx;vertical-align: middle;display:inline-block;">
		         <view style="font-size:14px;font-weight:Regular">
		           {{itemgd.name}}
		         </view>
		         <view style="font-size:13px;font-weight:Regular;color:#999999">
		           商品数量：x{{itemgd.num}}
		         </view>
		       </view>
		     </view>
		     <view class=" fr " style="display: flex;flex-direction: column;padding-top:40rpx; color:red;font-size:14px;font-weight:Regular;">
				 <view class="break_rule">￥{{itemgd.originalPrice}}</view>
				 <view style="color: red;">￥{{itemgd.price}}</view>
			 </view>
		   </view>
		   <view style="display: flex;justify-content: space-between;margin-bottom: 40rpx;margin-top: 20rpx;">
			     <view class="vir">{{item.time}}</view>
				 <view v-if="item.type=='1'">
					 <button class="cu-btn sm not_btn">取消</button>
					 
					    <button class="cu-btn sm btn" style="margin-left: 20rpx;" @click="goToPay()">去支付</button>	 
					 
				 </view>
				 <view v-if="item.type=='2'">
					 <button class="cu-btn sm not_btn">查看物流</button>
					 <button class="cu-btn sm btn" style="margin-left: 20rpx;">确认物流</button>
				 </view>
				 <view v-if="item.type=='0'">
					 <button class="cu-btn sm red_not_btn">评价</button>
					 <button class="cu-btn sm btn" style="margin-left: 20rpx;">再次购买</button>
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
      scrollLeft: 0,
	  tableIndex:0,
	  tabList:[{'text':'全部'},{'text':'待付款'},{'text':'待收货'},{'text':'已完成'}],
	  list:[
		   {'timeMsg':'一小时后关闭订单','time':'2019-01-08 09:05','type':'2',
		  'goods':[
			  {'name':'沃隆坚果750g/盒1','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'},
			  {'name':'沃隆坚果750g/盒2','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'}
			  ]  
			   },
			   {'timeMsg':'','time':'2019-01-08 09:05','type':'0',
			   'goods':[
			   			  {'name':'沃隆坚果750g/盒1','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'},
			   			  {'name':'沃隆坚果750g/盒2','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'}
			   			  ]  
			   	},{'timeMsg':'一小时后关闭订单','time':'2019-01-08 09:05','type':'1',
			   'goods':[
			   			  {'name':'沃隆坚果750g/盒1','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'},
			   			  {'name':'沃隆坚果750g/盒2','num':'1','originalPrice':'110','price':'100','img':'https://www.vvwed.com/static/images/evaluate/1.png'}
			   			  ]  
			   	}
			 ]
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
	  tabClick:function(index){
		  console.log(index);
		this.tableIndex =index;  
	  },
	  //跳转页面
	  goToPay:function(){
		uni.navigateTo({
			url: "myOrderToPay"
		})  
	  },
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