<template>
<view class="cu-custom" :style="'height:' + CustomBar + 'px'">
  <view :class="'cu-bar fixed ' + (bgImage!=''?'none-bg text-white bg-img':'') + ' ' + bgColor" :style="'height:' + CustomBar + 'px;padding-top:' + StatusBar + 'px;' + (bgImage?'background-image:url(' + bgImage+')':'')">
    <view class="action" @tap="BackPage" v-if="isBack">
      <text class="cuIcon-back"></text>
      <slot name="backText"></slot>
    </view>
    <view class="action border-custom" v-if="isCustom" :style="'width:' + Custom.width + 'px;height:' + Custom.height + 'px;margin-left:calc(750rpx - ' + Custom.right + 'px)'">
      <text class="cuIcon-back" @tap="BackPage"></text>
      <text class="cuIcon-homefill" @tap="toHome"></text>
    </view>
    <view class="content" :style="'top:' + StatusBar + 'px'">
      <slot name="content"></slot>
    </view>
    <slot name="right"></slot>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      /**
       * 组件的一些选项
       */
      options: {
        addGlobalClass: true,
        multipleSlots: true
      },
      StatusBar: getApp().globalData.StatusBar,
      CustomBar: getApp().globalData.CustomBar,
      Custom: getApp().globalData.Custom
    };
  },

  components: {},
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },

    toHome() {
      wx.reLaunch({
        url: '/pages/index/index'
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
@import "./cu-custom.css";
</style>