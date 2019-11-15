<template>
<!--pages/projectDetail/projectDetail.wxml-->
<!-- 
 -->
<view class="container">
  <view class="headShow">
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view class="cu-item flex-sub " v-for="(item, index) in imageLists" :key="index" @tap="tabSelect" :data-id="index">
          <view :class="'cu-item flex-sub ' + (index==TabCur?'text-zdy-darkblue cur':'')">
            <text v-if="item.position == 1" class="text-black">地下一层</text>
						<text v-if="item.position == '2'" class="text-black">地下二层</text>
						<text v-if="item.position === '3'" class="text-black">储物间</text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view>
      <image :src="imageLists[TabCur].pic" style="width:100%"></image>
    </view>


    <view style="background-color: #FFFFFF; border-radius:20upx  20upx 0 0; padding:32upx 30upx 0 30upx;">
      <view><text class="text-title1">{{imageLists[TabCur].title}}</text></view>
      <view style="padding-top:5px;"><text class="text-info1">{{imageLists[TabCur].titleBack}}</text></view>
      <view style="padding-top:5px;"><text class="text-info2">{{imageLists[TabCur].tagIds}}</text></view>
      <view style="padding-top:13px;padding-bottom:17px;"><text class="text-info3">车位价：</text><text class="text-info4">￥{{imageLists[TabCur].price}}</text></view>
    </view>


  </view>
  <view class="bodyShow">
    
 
  <view class="sperate" style="padding-left:0"></view>
  <view class="giftType" style="padding-bottom:200rpx;padding-top:18rpx;">
    <view style="font-size:14px;font-weight:Regular;">礼包类型</view>
    <view class="flex solid-bottom padding justify-start">
      <view :class="'giftTypeCell zd-bg-gray margin-right-sm radius ' + (index==giftTabCur?'zd-text':'')" v-for="(item, index) in llGiftsList" :key="index" @tap="giftTabSelect" :data-id="index" :data-imgid="item.id">{{item.name}}</view>
    </view>

		<view style="width: 100%;">
			<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex">
			    <view v-for="(item, index) in giftsLists3" :key="index" style="width: 100rpx; height: 100rpx; display: inline-block;margin-right: 30upx;">
			      <image style="width: 100rpx; height: 100rpx; mode:scaleToFill;" :src="item.thumb"></image>
			    </view>
			</scroll-view>
		</view>
    
  </view>

   </view>

  <view style="clear:both"></view>
  <button style="position:fixed;bottom:0;width:100%;background-color:#294D7D;color:white;z-index:10" @tap="goGiftDetail">下一步</button>
</view>
</template>

<script>
// pages/projectDetail/projectDetail.js
const api = require("../../configs/api.js");

export default {
  data() {
    return {
      TabCur: 0,
      scrollLeft: 0,
      giftTabCur: 0,
      allInfo: '',
      imageDetailList: [],
      tabs: ['地下一层', '地下二层', '储物间'],
      imageLists: [] // imageLists: [
      // {
      //   name:'地下一层',
      //   src:'https://www.vvwed.com/static/images/detailList/lunbo1.png'
      // },
      // {
      //   name: '地下二层',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo2.jpg'
      // },
      // {
      //   name: '储物间',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
      // }],
      // giftsList:[
      //   {
      //     id: '',
      //     name:'',
      //     llgoodsList:[
      // {
      //   name: '地下一层',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo1.png'
      // },{
      //   name: '地下一层',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo1.png'
      // }
      //     ]
      //   },
      //   {
      //     name: '',
      //     images: [
      //     ]
      //   },
      //   {
      //     name: '',
      //     images: [
      //     ]
      //   }
      // ]
      ,
      llGiftsList: "",
      giftsLists3: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1111111111111111');
    console.log(options);
    var that = this;
    that.setData({// imageDetailList: that.data.giftLists[0].images
    });
		
		
		this.$api.getllBuildingProjectForm({
			flag: 'C',
			id: options.id
			}).then( res => {
				console.log(res)
        this.allInfo = res.rows,
        this.imageLists = res.rows.carList,
        this.llGiftsList = res.rows.giftsList,
        this.giftsLists3 = res.rows.giftsList[0].llGoodsList
				getApp().globalData.projectInfo = this.allInfo;
				getApp().globalData.giftID = this.allInfo.giftsList[0].id;
			}).catch()
		
			 
    // api.get('llBuildingProject/form', {
    //   flag: 'C',
    //   id: options.id
    // }).then(res => {
    //   that.setData({
    //     allInfo: res,
    //     imageLists: res.carList,
    //     llGiftsList: res.giftsList,
    //     giftsLists3: res.giftsList[0].llGoodsList
    //   });
    //   getApp().globalData.projectInfo = that.allInfo; 
    // }).catch();
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
    tabSelect: function (e) {
      var that = this;
      // that.setData({
        that.TabCur = e.currentTarget.dataset.id,
        that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      // });
    },
    giftTabSelect: function (e) {
      var that = this;
      console.log(e);
      
        that.giftTabCur = e.currentTarget.dataset.id,
        that.scrollLeft = (e.currentTarget.dataset.id - 1) * 60,
        // imageDetailList: that.data.llGiftsList[e.currentTarget.dataset.id].id
        that.giftsLists3 = that.llGiftsList[e.currentTarget.dataset.id].llGoodsList
				getApp().globalData.giftID = e.currentTarget.dataset.imgid
      //}); // api.get('llGifts/get', {
      //   flag: 'C',
      //   id:e.currentTarget.dataset.imgid
      // }).then(res => {
      //   console.log(res.llGoodsList);
      //   that.setData({
      //     giftsLists3: res.llGoodsList
      //   })
      //   app.globalData.gifts = that.data.giftsLists3;
      // }).catch();
    },
    goGiftDetail: function (e) {
      var that = this;
      getApp().globalData.gifts = that.llGiftsList[that.giftTabCur].llGoodsList;
      wx.navigateTo({
        url: '../giftDetail/giftDetail'
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
@import "./projectDetail.css";
</style>