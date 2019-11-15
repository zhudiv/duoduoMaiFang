<template>
<view :class="'i-class i-progress i-progress-' + status + ' ' + ( !hideInfo ? 'i-progress-show-info' : '' )">
    <view class="i-progress-outer">
        <view class="i-progress-inner">
            <view class="i-progress-bg" :style="'width: ' + percent + '%;height: ' + strokeWidth + 'px'"></view>
        </view>
    </view>
    <view class="i-progress-text" v-if="!hideInfo">
        <view class="i-progress-text-inner">{{ percent }}%</view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    percent: {
      type: Number,
      value: 0
    },
    // normal || active || wrong || success
    status: {
      type: String,
      value: 'normal'
    },
    strokeWidth: {
      type: Number,
      value: 10
    },
    hideInfo: {
      type: Boolean,
      value: false
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