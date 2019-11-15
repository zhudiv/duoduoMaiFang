<template>
<view :class="'i-class i-card ' + ( full ? 'i-card-full' : '' )">
    <view class="i-class i-card-header">
        <view class="i-card-header-content">
            <image class="i-card-header-thumb" :src="thumb" mode="aspectFit" v-if="thumb"></image>
            {{ title }}
        </view>
        <view class="i-card-header-extra" v-if="extra">{{ extra }}</view>
    </view>
    <view class="i-class i-card-body"><slot name="content"></slot></view>
    <view class="i-class i-card-footer"><slot name="footer"></slot></view>
</view>
</template>

<script>

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      }
    };
  },

  components: {},
  props: {
    full: {
      type: Boolean,
      value: false
    },
    thumb: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    }
  },
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
@import "./index.css";
</style>