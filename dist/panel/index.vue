<template>
<view class="i-class i-panel">
    <view v-if="title" :class="'i-panel-title ' + ( hideTop ? 'i-panel-title-hide-top' : '' )">{{ title }}</view>
    <view :class="'i-panel-content ' + ( hideBorder ? 'i-panel-without-border' : '' )"><slot></slot></view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    title: {
      type: String,
      value: ''
    },
    // 标题顶部距离
    hideTop: {
      type: Boolean,
      value: false
    },
    hideBorder: {
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