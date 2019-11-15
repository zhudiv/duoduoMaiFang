<template>
<!--pages/market/market.wxml-->
<view class="container">
  <view class="cu-bar search bg-white">
    <view class="search-form round justify-center">
      <text class="cuIcon-search">搜索商品</text>
      <!-- <text class="cuIcon-search" style="display:inline-block">搜索商品</text> -->
      <!-- <input type="text" placeholder="搜索商品" confirm-type="search" style="display:inline"></input> -->
    </view>
    <view class="action">
      <!-- <button class="cu-btn bg-green shadow-blur round">搜索</button> -->
      <text class="cuIcon-cart lg text-black" style="font-size:22px !important;"></text>
    </view>
  </view>

  <view class="box">
    <view class="radius">
      <swiper :class="'screen-swiper ' + (DotStyle?'square-dot':'round-dot')" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image class="radius" :src="item.pic" mode="aspectFill" v-if="item.type=='image'"></image>
          <!-- <video :src="item.url" autoplay loop muted show-play-btn="false" controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
        </swiper-item>
      </swiper>
    </view>

 <!--   <view class="flex padding-top">
      <view class="flex-sub text-center">
        <text class="cuIcon-roundcheckfill lg text-red"></text>
        <text>假一赔十</text>
      </view>
      <view class="flex-sub text-center">
        <text class="cuIcon-roundcheckfill lg text-red"></text>
        <text>品质优选</text>
      </view>
      <view class="flex-sub text-center">
        <text class="cuIcon-roundcheckfill lg text-red"></text>
        <text>买贵必赔</text>
      </view>
      <view class="flex-sub text-center">
        <text class="cuIcon-roundcheckfill lg text-red"></text>
        <text>售后无忧</text>
      </view>
    </view> -->

    <view class="cate-section">
      <navigator class="cate-item" v-for="(item, index) in categoryList" :key="index" >
        <view style="width:80rpx;height:80rpx;border-radius:50%;background-color:white">
          <image :src="item.img" style="width:80rpx;height:80rpx;border-radius: 50%;"></image>
        </view>
        <text style="color: #333333;font-size: 24rpx;font-weight: regular;">{{item.name}}</text>
      </navigator>
    <!--  <view class="cate-item">
        <view style="width:80rpx;height:80rpx;border-radius:50%;background-color:white">
          <image src="../../static/market/2.png" style="width:80rpx;height:80rpx;"></image>
        </view>
        <text>居家生活</text>
      </view>
      <view class="cate-item">
        <view style="width:80rpx;height:80rpx;border-radius:50%;background-color:white">
          <image src="../../static/market/3.png" style="width:80rpx;height:80rpx;"></image>
        </view>
        <text>生活家电</text>
      </view>
      <view class="cate-item">
        <view style="width:80rpx;height:80rpx;border-radius:50%;background-color:white">
          <image src="../../static/market/4.png" style="width:80rpx;height:80rpx;"></image>
        </view>
        <text>母婴亲子</text>
      </view>
      <navigator class="cate-item" url="/pagesB/pages/category/category">
        <view style="width:80rpx;height:80rpx;border-radius:50%;background-color:white">
          <image src="../../static/market/5.png" style="width:80rpx;height:80rpx;"></image>
        </view>
        <text>全部分类</text>
      </navigator> -->
    </view>
		
		
		<!-- 限时特惠 新品上市 爆款商品 -->
		<view style="display: flex;margin-top: 58upx;justify-content: space-between;">
			<image src="../../static/images/market/shop_time_img@2x.png" style="width: 344upx;height: 400upx;"></image>
			<view>
				<view>
					<image src="../../static/images/market/shop_new_img@2x.png" style="width: 338upx;height: 190upx;"></image>
				</view>
				<view>
					<image src="../../static/images/market/shop_hot_img@2x.png" style="width: 338upx;height: 190upx;"></image>
				</view>
			</view>
		</view>
		
		
		<!-- 精品推荐 -->
		<view style="margin-top: 40upx;">
			<image src="../../static/images/market/shop_jp_bg@2x.png" style="width: 100%;height: 176upx;" mode="widthFix"></image>
		</view>
		
		<view style="background: linear-gradient(#F1C77B, #CB9F4E 40%,#F8F8F8 40%);width: 100%;height: 490upx;border-radius: 8upx;">
			<view style="display: flex;justify-content: space-between; padding: 34upx 18upx 22upx 36upx;">
				<view style="">
					<text style="color: #FFFFFF;font-size: 28upx;font-weight: bold;display: block;">好物不贵 品质优选</text>
					<text style="color: #FFFFFF;font-size: 20upx;font-weight: Regular;">邻里帮您提高生活品质</text>
				</view>
				<view>
					<text style="color: #FFFFFF;font-size: 24upx;font-weight: Regular;">更多精品</text>
					<text class="cuIcon-right" style="color: #FFFFFF;font-size: 24upx;font-weight: Regular;"></text>
				</view>
			</view>
			
			<view style="padding-left: 20upx;padding-right: 20upx;">
				<view>
					<scroll-view  scroll-x="true" style="height: 320upx;border-radius: 8upx;background-color: #fff;padding-top: 14upx;">
						<view style="display: flex;align-items: flex-start;">
							<view v-for="(item, index) in bestGoodsList" :key="index" style="width:210rpx;display: inline-block;position: relative;padding-left: 10upx;padding-right: 10upx;padding-bottom: 10upx;">
								<view style="width: 100%;text-align: center;">
									<image :src="item.thumb" style="width:160upx;height:160upx;padding: 14upx;margin: 0 auto;" mode="aspectFill"></image>
								</view>
								<view>
									<text style="color: #333333;font-size: 24upx;">{{item.name}}</text>
								</view>
								
								<view>
									<text style="color: #F55656;font-size: 16upx;border: 1upx solid #F55656;padding: 4upx;">可用币{{item.linlibiDeduction}}</text>
								</view>
								<view style="display: flex;align-items: center;">
									<image src="../../static/images/market/tag_vip_img@2x.png" style="width: 80upx;height: 36upx;" mode="scaleToFill"></image>
									<text style="margin-left: 10upx;color: #294D7D;font-size: 28upx;">￥{{item.shopPrice}}</text>
								</view>
								
							</view>
						</view>
							
					</scroll-view>
				</view>
				<view style="width: 100%;height: 100upx;"></view>
			
			
			</view>
		</view>
		
		<view>
			<view style="width: 100%;text-align: center; margin-top: 80upx;">
				<text style="color: #999999;font-size: 30upx;line-height: 42upx;">————  猜你喜欢 ————</text>
			</view>
			<view style="width: 100%;display: flex;flex-wrap:wrap">
				<view style="width: 50%;padding: 20upx 38upx 40upx 38upx;display: flex;flex-direction: column; " v-for="(item, index) in likeGoodsList" :key="index">
					<view>
						<image :src="item.img" style="width: 300upx;height: 300upx;"></image>
					</view>
					<view>
						<text style="color: #333333;font-size: 28upx;font-weight: bold;line-height: 40upx;">{{item.name}}</text>
					</view>
					<view style="display: flex;align-items: center;">
						<image src="../../static/images/market/tag_vip_img@2x.png" style="width: 80upx;height: 36upx;" mode="scaleToFill"></image>
						<text style="margin-left: 10upx;color: #294D7D;font-size: 28upx;">￥{{item.buyingPrice}}</text>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<text style="text-decoration: line-through;">￥{{item.promotePrice}}</text>
						<view>
							<text style="margin-left: 10upx;color: #294D7D;font-size: 28upx;">￥{{item.keywords}}</text>
						</view>
						
					</view>
						
				</view>
				
			</view>
			
		</view>

   <!-- <view class="bg-white">
      <view>
        <view style="display:inline-block;width:50%">
          <image src="https://www.vvwed.com/static/images/market/1111.png" style="width:336rpx;height:192rpx;"></image>
        </view>
        <view style="display:inline-block;width:50%">
          <image src="https://www.vvwed.com/static/images/market/2222.png" style="width:336rpx;height:192rpx;"></image>
        </view>
      </view>
      <view>
        <view style="display:inline-block;width:50%">
          <image src="https://www.vvwed.com/static/images/market/3333.png" style="width:336rpx;height:192rpx;"></image>
        </view>
        <view style="display:inline-block;width:50%">
          <image src="https://www.vvwed.com/static/images/market/4444.png" style="width:336rpx;height:192rpx;"></image>
        </view>
      </view>
    </view>


 -->
   <!-- <view class="padding-top radius10">
      <view class="cu-form-group">
        <view class="title">美食酒水</view>
        <text class="cuIcon-right lg text-gray"></text>
      </view>
      <scroll-view class="floor-list bg-white" scroll-x>
        <view class="scoll-wrapper ">
          <block v-for="(item, index) in goodsList" :key="index">
            <view :data-event-opts="[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]" class="floor-item margin" @tap="__e" style="width:160rpx;">
              <image :src="item.image" mode="aspectFill" style="width:160rpx;height:160rpx;"></image>
              <text class="title clamp" style="width:160rpx;height:-1rpx;">{{item.title}}</text>
            </view>
          </block>
        </view>
      </scroll-view>
    </view> -->


<!--    <view class="padding-top radius10">
      <view class="cu-form-group">
        <view class="title">居家生活</view>
        <text class="cuIcon-right lg text-gray"></text>
      </view>
      <scroll-view class="floor-list bg-white" scroll-x>
        <view class="scoll-wrapper ">
          <block v-for="(item, index) in goodsList" :key="index">
            <view :data-event-opts="[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]" class="floor-item margin" @tap="__e" style="width:160rpx;">
              <image :src="item.image" mode="aspectFill" style="width:160rpx;height:160rpx;"></image>
              <text class="title clamp" style="width:160rpx;height:-1rpx;">{{item.title}}</text>
            </view>
          </block>
        </view>
      </scroll-view>
    </view> -->


<!--    <view class="padding-top radius10">
      <view class="cu-form-group">
        <view class="title">生活家电</view>
        <text class="cuIcon-right lg text-gray"></text>
      </view>
      <scroll-view class="floor-list bg-white" scroll-x>
        <view class="scoll-wrapper ">
          <block v-for="(item, index) in goodsList" :key="index">
            <view :data-event-opts="[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]" class="floor-item margin" @tap="__e" style="width:160rpx;">
              <image :src="item.image" mode="aspectFill" style="width:160rpx;height:160rpx;"></image>
              <text class="title clamp" style="width:160rpx;height:-1rpx;">{{item.title}}</text>
            </view>
          </block>
        </view>
      </scroll-view>
    </view> -->


<!--  <view class="padding-top radius10">
      <view class="cu-form-group">
        <view class="title">母婴亲子</view>
        <text class="cuIcon-right lg text-gray"></text>
      </view>
      <scroll-view class="floor-list bg-white" scroll-x>
        <view class="scoll-wrapper ">
          <block v-for="(item, index) in goodsList" :key="index">
            <view :data-event-opts="[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]" class="floor-item margin" @tap="__e" style="width:160rpx;">
              <image :src="item.image" mode="aspectFill" style="width:160rpx;height:160rpx;"></image>
              <text class="title clamp" style="width:160rpx;height:-1rpx;">{{item.title}}</text>
            </view>
          </block>
        </view>
      </scroll-view>
    </view> -->











  </view>


<!--  <view class="flex solid-bottom padding justify-center">
      <view class="padding-sm" style="color:#999999">———————</view>
      <view class="padding-sm" style="color:#999999">猜您喜欢</view>
      <view class="padding-sm" style="color:#999999">———————</view>
    </view>

  <view class="guess-section">
    <block v-for="(item, index) in goodsList" :key="index">
      <view :data-event-opts="[['tap',[['navToDetailPage',['$0'],[[['goodsList','',index]]]]]]]" class="guess-item" @tap="__e">
        <view class="image-wrapper">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
        <text class="title clamp">{{item.title}}</text>
        <text class="price">{{"￥"+item.price}}</text>
      </view>
    </block>
  </view> -->


</view>
</template>

<script>

export default {
  data() {
    return {
			dataInfo:[],
			swiperList:[],
			categoryList:[],
			bestGoodsList:[],
			likeGoodsList:[],
      // swiperList: [{
      //   id: 0,
      //   type: 'image',
      //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
      // }, {
      //   id: 1,
      //   type: 'image',
      //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg'
      // }, {
      //   id: 2,
      //   type: 'image',
      //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      // }, {
      //   id: 3,
      //   type: 'image',
      //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
      // }],
      goodsList: [{
        image: 'https://www.vvwed.com/static/images/market/1111.png',
        title: '卡伯纳干红葡萄酒'
      }, {
        image: 'https://www.vvwed.com/static/images/market/2222.png',
        title: '图利斯葡萄酒'
      }, {
        image: 'https://www.vvwed.com/static/images/market/3333.png',
        title: '卡伯纳干红葡萄酒'
      }, {
        image: 'https://www.vvwed.com/static/images/market/4444.png',
        title: '沃隆坚果'
      }]
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var that = this;
		that.loadData();
		
	},

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
		loadData:function(){
			var that = this;
			that.$api.getMarketData({}).then( res => {
				that.dataInfo = res.data;
				that.swiperList = that.dataInfo.llAdvMain.llAdvDetailList;
				that.categoryList = that.dataInfo.categoryList;
				that.bestGoodsList = that.dataInfo.bestGoodsList;
				that.likeGoodsList = that.dataInfo.likeGoodsList;
			}).catch()
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
@import "./market.css";
</style>