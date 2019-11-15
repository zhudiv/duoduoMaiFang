<template>
<view class="VerticalBox">
  <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="VerticalNavTop" style="height:calc(100vh - 375rpx)">
    <view :class="'cu-item ' + (index==TabCur?'text-green cur':'')" v-for="(item, index) in flist" :key="index" @tap="tabSelect" :data-id="index">
      {{item.name}}
    </view>
  </scroll-view>

  <scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-into-view="'main-' + MainCur" @scroll="VerticalMain">
    <view class="padding-top padding-lr" v-for="(item, index) in vlist" :key="index" :id="'main-' + index">
      <view class="cu-bar solid-bottom bg-white">
        <view class="action">
          <text class="cuIcon-title text-green"></text>{{item.name}} </view>
      </view>
      <view class="t-list">
        <block v-for="(ttitem, id) in item.tlist" :key="id">
          <!-- <block wx:if="{{ttitem.pid===item.id}}"> -->
              <view :data-event-opts="[['tap',[['navToList',['$0','$1'],[[['slist','id',item.id,'id']],[['tlist','id',titem.id,'id']]]]]]]" class="t-item" @tap="__e">
              
                <!-- <image src="{{ttitem.source}}"></image> -->
                <view :style="'background-image:url(' + ttitem.source + ');width:140rpx;height:140rpx;background-size:cover;'"></view>
                <text>{{ttitem.name}}</text>
              </view>
            <!-- </block> -->
        </block>
      </view>

    </view>
  </scroll-view>
</view>
</template>

<script>

export default {
  data() {
    return {
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom,
      TabCur: 0,
      MainCur: 0,
      VerticalNavTop: 0,
      list: [],
      load: true,
      flist: [{
        name: '美食酒水'
      }, {
        name: '居家生活'
      }, {
        name: '生活家电'
      }, {
        name: '母婴亲子'
      }, {
        name: '家具家装'
      }],
      vlist: [{
        name: '美食酒水',
        tlist: [{
          source: 'https:/www.vvwed.com/static/images/category/11.png',
          name: '休闲零食'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/12.png',
          name: '方面速食'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/13.png',
          name: '糖果'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/14.png',
          name: '酒'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/15.png',
          name: '水'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/16.png',
          name: '牛奶饮品'
        }]
      }, {
        name: '居家生活',
        tlist: [{
          source: 'https:/www.vvwed.com/static/images/category/21.png',
          name: '厨房用品'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/22.png',
          name: '清洁用品'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/33.png',
          name: '纸品湿巾'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/24.png',
          name: '水杯'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/25.png',
          name: '家纺用品'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/26.png',
          name: '收纳家具'
        }]
      }, {
        name: '生活家电',
        tlist: [{
          source: 'https:/www.vvwed.com/static/images/category/31.png',
          name: '电视机'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/32.png',
          name: '冰箱'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/33.png',
          name: '空调'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/34.png',
          name: '洗衣机'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/35.png',
          name: '厨房家电'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/36.png',
          name: '其他家电'
        }]
      }, {
        name: '母婴亲子',
        tlist: [{
          source: 'https:/www.vvwed.com/static/images/category/41.png',
          name: '童车童床'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/42.png',
          name: '尿裤湿巾'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/43.png',
          name: '洗护用品'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/44.png',
          name: '奶粉辅食喂养'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/45.png',
          name: '孕妈用品'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/46.png',
          name: '其他'
        }]
      }, {
        name: '家具家装',
        tlist: [{
          source: 'https:/www.vvwed.com/static/images/category/51.png',
          name: '床垫'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/52.png',
          name: '灯饰照明'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/53.png',
          name: '厨房卫浴'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/54.png',
          name: '客厅家具'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/55.png',
          name: '卧室家具'
        }, {
          source: 'https:/www.vvwed.com/static/images/category/56.png',
          name: '其他'
        }]
      }],
      listCur: ""
    };
  },

  components: {},
  props: {},

  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];

    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }

    this.setData({
      list: list,
      listCur: list[0]
    });
  },

  onReady() {
    wx.hideLoading();
  },

  methods: {
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        MainCur: e.currentTarget.dataset.id,
        VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      });
    },

    VerticalMain(e) {
      let that = this;
      let list = this.list;
      let tabHeight = 0;

      if (this.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }

        that.setData({
          load: false,
          list: list
        });
      }

      let scrollTop = e.detail.scrollTop + 20;

      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            VerticalNavTop: (list[i].id - 1) * 50,
            TabCur: list[i].id
          });
          return false;
        }
      }
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
@import "./category.css";
</style>