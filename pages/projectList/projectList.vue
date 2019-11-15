<template>
<view>
<!--pages/projectList/projectList.wxml-->


<view class="container">
	<view class="search">
			
			<view class="search-left" @tap="Gocity" style="display: flex;align-items: center;">
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


	<view class="listBox">
		<!-- <i-tabs current="{{ current }}" color="#294D7D" bindchange="handleChange">
			<i-tab key="tab1" title="车位"></i-tab>
			<i-tab key="tab2" title="住宅"></i-tab>
		</i-tabs> -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub " v-for="(item, index) in tabs" :key="index" @tap="tabSelect" :data-id="index" :data-num="item.index">
      		<view style="width:50%;margin:0 auto;" :class="'cu-item flex-sub ' + (item.index==TabCur?'text-zdy-darkblue cur':'')">
					 {{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
    <view v-if="TabCur==1">
      <view v-for="(mov, index) in lists" :key="index" class="bg-white text-left shadow-blur" style="padding: 40upx 44upx 0 52upx;" :data-id="mov.id" @tap="goGiftDetail">
				<listView :item="mov"></listView>
			</view>
    </view>
		<view v-if="TabCur==2">
      <view v-for="(mov, index) in lists" :key="index" class="bg-white text-left shadow-blur" style="padding: 40upx 44upx 0 52upx;" :data-id="mov.id" @tap="goGiftDetail">
				<listView :item="mov"></listView>
			</view>
    </view>
  
	</view>

</view>
</view>
</template>

<script>
// pages/projectList/projectList.js
const api = require("../../configs/api.js");
import iTabs from "../../dist/tabs/index";
import iTab from "../../dist/tab/index";
import listView from '@/components/listview/listView.vue'

export default {
  data() {
    return {
      current: 'tab1',
      current_scroll: 'tab1',
      TabCur: 1,
      scrollLeft: 0,
      tabs: [{
        index: '1',
        name: '车位'
      }, {
        index: '2',
        name: '住宅'
      }],
      lists: [],
      // lists: [
      // 	{
      // 		index: 0,
      // 		src:'https://www.vvwed.com/static/images/b-goodList/111.png',
      // 		name: '宁波湾·星钻',
      // 		tag1:'零首付',
      // 		tag2: '送邻里币',
      // 		tag3: '家电礼大包',
      // 		price:'10000~20000'
      // 	},
      // 	{
      // 		index: 1,
      // 		src: 'https://www.vvwed.com/static/images/b-goodList/222.png',
      // 		name: '美的·鼓楼前',
      // 		tag2: '送邻里币',
      // 		tag3: '家电礼大包',
      // 		price: '10000~40000'
      // 	},
      // 	{
      // 		index: 2,
      // 		src: 'https://www.vvwed.com/static/images/b-goodList/333.png',
      // 		name: '宝丰名苑',
      // 		tag1: '零首付',
      // 		tag2: '',
      // 		tag3: '家电礼大包',
      // 		price: '30000~20000'
      // 	},
      // 	{
      // 		index: 3,
      // 		src: 'https://www.vvwed.com/static/images/b-goodList/444.png',
      // 		name: '蓝光·雍舜府',
      // 		tag1: '零首付',
      // 		tag2: '送邻里币',
      // 		tag3: '家电礼大包',
      // 		price: '10000~20000'
      // 	},
      // 	{
      // 		index: 4,
      // 		src: 'https://www.vvwed.com/static/images/b-goodList/555.png',
      // 		name: '碧桂园都荟名邸',
      // 		tag1: '零首付',
      // 		tag2: '送邻里币',
      // 		tag3: '家电礼大包',
      // 		price: '10000~20000'
      // 	}
      // ],
      houseLists: [{
        index: 0,
        src: 'https://www.vvwed.com/static/images/b-goodList/111.png',
        name: 'aaaaa',
        tag1: '零首付',
        tag2: '送邻里币',
        tag3: '家电礼大包',
        price: '1000~20000'
      }, {
        index: 1,
        src: 'https://www.vvwed.com/static/images/b-goodList/222.png',
        name: 'bbbbb',
        tag2: '送邻里币',
        tag3: '家电礼大包',
        price: '10000~40000'
      }, {
        index: 2,
        src: 'https://www.vvwed.com/static/images/b-goodList/333.png',
        name: 'cccc',
        tag1: '零首付',
        tag2: '',
        tag3: '家电礼大包',
        price: '30000~20000'
      }, {
        index: 3,
        src: 'https://www.vvwed.com/static/images/b-goodList/444.png',
        name: '蓝光·雍舜府',
        tag1: '零首付',
        tag2: '送邻里币',
        tag3: '家电礼大包',
        price: '10000~20000'
      }, {
        index: 4,
        src: 'https://www.vvwed.com/static/images/b-goodList/555.png',
        name: '碧桂园都荟名邸',
        tag1: '零首付',
        tag2: '送邻里币',
        tag3: '家电礼大包',
        price: '10000~20000'
      }]
    };
  },

  components: {
    iTabs,
    iTab,
		listView
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      TabCur: options.currentNavbar,
      scrollLeft: (options.currentNavbar - 1) * 60
    });
		that.$api.getllBuildingProject({
			flag: 'C',
			type: that.TabCur
		}).then( res => {
			this.lists = res.rows;
		}).catch()
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
    handleChange({
      detail
    }) {
      this.setData({
        current: detail.key
      });
    },

    handleChangeScroll({
      detail
    }) {
      this.setData({
        current_scroll: detail.key
      });
    },

    tabSelect(e) {
      var that = this;
      that.setData({
        TabCur: e.currentTarget.dataset.num,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      });
			
			that.$api.getllBuildingProject({
				flag: 'C',
				type: that.TabCur
			}).then( res => {
				this.lists = res.rows;
			}).catch()
			
			
      // api.get('llBuildingProject/data', {
      //   flag: 'C',
      //   type: that.TabCur
      // }).then(xxx => {
      //   that.setData({
      //     lists: xxx
      //   });
      // }).catch();
    },

    goGiftDetail: function (e) {
      wx.navigateTo({
        url: '../projectDetail/projectDetail?id=' + e.currentTarget.dataset.id
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
@import "./projectList.css";
</style>