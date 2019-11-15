<template>
<view class="index">

  <view class="search">
    <!-- <view class="index">
      <image src="/images/index_location.svg" background-size="cover" mode="scaleToFill"></image>
      <view class="address">宁波</view>
      <image src="/images/index_locationSelect.svg" background-size="cover" mode="scaleToFill"></image>
    </view> -->
    <view class="search-left" @tap="Gocity">
      <!-- <image class="location" src="../../images/index_location.svg" background-size="cover" mode="scaleToFill"></image> -->
      <image class="location" src="../../static/images/index_location.svg"></image>
      <view class="address">宁波</view>
      <image class="location" src="../../static/images/index_locationSelect.svg"></image>
    </view>
    <!-- <input type="text" placeholder="搜索" id="btnSearch"></input> -->
    
     <navigator url="/pages/search/search" class="input">
      <image class="icon"></image>
      <text class="txt">搜索</text>
    </navigator>
  </view>

      <!-- banner -->
      <view class="banner_a swiper-container ">
        <view class="banner">
          <swiper class="swiper swiper-box swiper-boxa" :current="current" indicator-dots="true" autoplay="false" interval="5000" duration="1000" indicator-active-color="#Fff">
            <block v-for="(mov, key) in Movies" :key="key">
              <swiper-item>
                <view>
                  <navigator :url="mov.Url" hover-class="navigator-hover">
                    <image :src="mov.Picture" class="banner" background-size="cover" mode="scaleToFill"></image>
                  </navigator>
                </view>
              </swiper-item>
            </block>
          </swiper>
        </view>
      </view>
  

  <view class="tion">
    <view class="tion_li">
      <view class="tion_lia" @tap="tapLogs">
        <image src="../../static/images/tion_market.png" class="tion_li_ioc" background-size="cover" mode="scaleToFill"></image>
         <text class="tion_li_text">业主超市</text>
      </view>
      <view class="tion_lia" @tap="tapLogs">
        <image src="../../static/images/tion_decoration.png" class="tion_li_ioc" background-size="cover" mode="scaleToFill"></image>
         <text class="tion_li_text">装修</text>
      </view>
      <view class="tion_lia" @tap="tapLogs">
        <image src="../../static/images/tion_carstall.png" class="tion_li_ioc" background-size="cover" mode="scaleToFill"></image>
         <text class="tion_li_text">邻里车位</text>
      </view>

      <view class="tion_lia" @tap="tapLogs">
        <image src="../../static/images/tion_carloan.png" class="tion_li_ioc" background-size="cover" mode="scaleToFill"></image>
         <text class="tion_li_text">车位分期</text>
      </view>
    </view>
  </view>

  <view style="width: 100%">
		<view class="news">
			<image src="../../static/images/banner_news.png" style="width: 112upx;height: 38upx;min-width:112upx" mode="scaleToFill"></image>
			<text style="white-space: nowrap;overflow: hidden;margin-left: 8upx;">  钱多多先生在万达小区购买车位获得十万大家电和八万购物券</text>
		</view>
    
  </view>

	<view class="flex padding justify-around bg-white">
	    <view class="zd-bg-grey padding-top padding-left margin-xs radius10" data-idy="1" @tap="goDetail">
	      <view>
	        <text class="text-lg">邻里车位</text>
	      </view>
	      <view>
	        <text class="text-sm" style="color:#C0C8D3">零首付/送家电/拿十万邻 里币</text>
	      </view>
	      <view style="text-align:center">
	        <image src="https://www.vvwed.com/static/images/index/home_index_car.png" style="width:260rpx;height:70rpx;"></image>
	      </view>
	    </view>
	    <view class="zd-bg-grey padding-top padding-left margin-xs radius10" data-idy="2" @tap="goDetail">
	      <view>
	        <text class="text-lg">邻里住宅</text>
	      </view>
	      <view>
	        <text class="text-sm" style="color:#C0C8D3">品牌新房/限时特惠/精品 优选</text>
	      </view>
	      <view style="text-align:center">
	        <image src="https://www.vvwed.com/static/images/index/home_index_house.png" style="width:200rpx;height:110rpx;"></image>
	      </view>
	    </view>
	  </view>
 

  <view class="limitSale">
    
    <view style="display: flex;justify-content: space-between;padding-left: 30upx;padding-right: 22upx;">
			<view >
				<view class="verticalSpetrate" style="display: inline-block;"></view>
				<text class="discount">限时优惠</text>
			</view>
     <view>
			 <text class="buying">更多优惠</text>
			 <text class="cuIcon-right" style="color: #999999;"></text>
		 </view>
    </view>
    <scroll-view class="sectionImg" scroll-x="true" style=" white-space: nowrap; display: flex">
      <view class="HDS_style" v-for="(lis, key) in Shoppings" :key="key">
        <view class="HDS_style_Coupon">{{lis.discountCoupon}}</view>
        <navigator>
          <view style="width: 200rpx; height: 200rpx;">
            <image style="width: 200rpx; height: 200rpx;margin-top:0" :src="lis.src">
            </image>
          </view>
          <view class="hdcpName">
            <text class="shop_one_text">{{lis.hdcpName}}</text>
          </view>
          <view class="hdPrice">
            <text class="shop_old_price">￥{{lis.hdPrice}}</text>
          </view>
          <view class="hdhyPrice">
            <text class="shop_member">会员价</text>
            <text class="shop_new_price"> ￥{{lis.hdhyPrice}}</text>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>

  <view class="separate"></view>

 

  <!-- <view class="CarHomeLists">
    <view class="navbar">
      <view class="navbar-item" wx:for="{{navbar}}" wx:for-index="idx" data-idx="{{idx}}" bindtap="swichNav">
        <text class="navbar-text {{currentNavbar==idx ? 'active' : ''}}">{{item}}</text>
      </view>
    </view>

    <scroll-view class="carList" wx:if="{{currentNavbar==0}}">
      <view wx:for="{{carList}}" wx:for-item="lis" wx:key="key">
        <view class="carImage">
          <image src="{{lis.src}}"></image>
        </view>
        <view class="carInfo">
          <view><text class="carInfo_name">{{lis.carInfo_name}}</text></view>
          <view class="carInfo2"><text class="carInfo_detail1">{{lis.carInfo_detail1}}</text><text class="carInfo_detail2">{{lis.carInfo_detail2}}</text></view>
          <view><text class="carInfo_price">￥{{lis.carInfo_price}}</text></view>
        </view>
      </view>
    </scroll-view>

    <scroll-view class="carList" wx:if="{{currentNavbar==1}}">
      <view wx:for="{{homeList}}" wx:for-item="lis" wx:key="key">
        <view class="carImage">
          <image src="{{lis.src}}"></image>
        </view>
        <view class="carInfo">
          <view><text class="carInfo_name">{{lis.homeInfo_name}}</text></view>
          <view><text class="carInfo_price">￥{{lis.homeInfo_price}}</text></view>
          <view class="homeInfo2">
            <text class="homeInfo_detail1" wx:if="{{lis.homeInfo_detail1==1}}">免费专车</text>
            <text class="homeInfo_detail11" wx:if="{{lis.homeInfo_detail1==2}}">品质保证</text>
            <text class="homeInfo_detail2" wx:if="{{lis.homeInfo_detail2==1}}">刚需优选</text>
            <text class="homeInfo_detail2" wx:if="{{lis.homeInfo_detail2==2}}">品排企业</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view> -->
  

  <!-- 新品推荐 -->
  <!-- <view class="newProduct">
  <image class="newProduct_image" src="../../images/newProduct.svg"></image>
  <text>新品推荐</text>
  </view> -->
  <!-- 新品推荐 -->

   <view class="separate"></view>

  <!-- <view class="hotCarport">
    <view class="hotCarport_Title">
    热门车位
    </view>
    <view class="hotCarport_Content">
      <block wx:for="{{Carports}}" wx:for-item="carport" wx:key="key">
              <swiper-item>
                <view>
                  <navigator url="{{mov.Url}}" hover-class="navigator-hover">
                    <image src="{{mov.Picture}}" class="banner" background-size="cover" mode="scaleToFill"></image>
                  </navigator>
                </view>
              </swiper-item>
      </block>
  </view>
</view> -->
</view>
</template>

<script>

export default {
  data() {
    return {
			dataAll:[],
			
      Movies: [{
        Url: '/static/images/lunbo1.png',
        Picture: '/static/images/lunbo1.png'
      }, {
        Url: '/static/images/lunbo2.png',
        Picture: '/static/images/lunbo2.png'
      }, {
        Url: '/static/images/lunbo3.png',
        Picture: '/static/images/lunbo3.png'
      }],
      //轮播图
      CountDown: {
        day: "02",
        minutes: "04",
        seconds: "03"
      },
      Shoppings: [{
        src: '../../static/images/shopping1.jpg',
        hdcpName: '美的电饭煲',
        hdPrice: '299',
        hdhyPrice: '299',
        discountCoupon: '可用券99'
      }, {
        src: '../../static/images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      }, {
        src: '../../static/images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      }, {
        src: '../../static/images/shopping1.jpg',
        hdcpName: '美的电饭煲',
        hdPrice: '299',
        hdhyPrice: '299',
        discountCoupon: '可用券99'
      }, {
        src: '../../static/images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      }, {
        src: '../../static/images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      }, {
        src: '../../static/images/shopping1.jpg',
        hdcpName: '美的电饭煲',
        hdPrice: '299',
        hdhyPrice: '299',
        discountCoupon: '可用券99'
      }, {
        src: '../../static/images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      }, {
        src: '../../static/images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      }],
      navbar: ["车位", "住宅"],
      currentNavbar: '0',
      carList: [{
        src: '../../images/cars1.jpg',
        carInfo_name: '宁波湾·星钻',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars1.jpg',
        carInfo_name: '宁波湾·星钻',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars1.jpg',
        carInfo_name: '宁波湾·星钻',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }, {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }],
      homeList: [{
        src: '../../images/homes1.jpg',
        homeInfo_name: '万达翡翠西湖',
        homeInfo_detail1: 1,
        homeInfo_detail2: 1,
        homeInfo_price: '12500元/㎡'
      }, {
        src: '../../images/homes2.jpg',
        homeInfo_name: '绿城西府海棠',
        homeInfo_detail1: 2,
        homeInfo_detail2: 2,
        homeInfo_price: '13508元/㎡'
      }, {
        src: '../../images/homes3.jpg',
        homeInfo_name: '新希望堇麟上府',
        homeInfo_detail1: 1,
        homeInfo_detail2: 1,
        homeInfo_price: '29500元/㎡'
      }, {
        src: '../../images/homes4.jpg',
        homeInfo_name: '宁波恒大御海天下',
        homeInfo_detail1: 2,
        homeInfo_detail2: 2,
        homeInfo_price: '9500元/㎡'
      }]
    }
	
  },


	components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 //  console.log('111')
	 //  this.$api.getToken({
	 //  	flag:'C',
	 //  	code:wx.getStorageSync('code'),
	 //  	rawData:''
	 //  }).then(
		// res => {
		// 	console.log(res);
		// 	console.log(res.errCode);
		// 	if(res.token){
		// 		wx.setStorageSync('token', res.token)
		// 	}
		// }
	 //  ).catch()
	  global.isEnter()
		
		
		
		// uni.navigateTo({
		// 	url:'/pagesB/pages/productDetail/productDetail'
		// })
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

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    console.log(111);
  },
  methods: {
    /**
     * 切换 navbar
     */
    swichNav: function (e) {
      console.log('navbar');
      var that = this;
      this.setData({
        currentNavbar: e.currentTarget.dataset.idx
      });
    },
    goDetail: function (e) {
      var that = this;
      that.setData({
        currentNavbar: e.currentTarget.dataset.idy
      });
      wx.navigateTo({
        url: '../projectList/projectList?currentNavbar=' + that.currentNavbar
      });
    },
    testtest: function (e) {},
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
@import "./index.css";
</style>