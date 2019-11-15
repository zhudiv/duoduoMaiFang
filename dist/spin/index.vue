<template>
<view :class="'i-class i-spin i-spin-' + size + ' ' + ( fix ? 'i-spin-fix' : '' ) + ' ' + ( custom ? 'i-spin-show-text' : '' ) + ' ' + ( fullscreen ? 'i-spin-fullscreen' : '' )">
    <div class="i-spin-main">
        <view class="i-spin-dot"></view>
        <div class="i-spin-text"><slot></slot></div>
    </div>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    // small || default || large
    size: {
      type: String,
      value: 'default'
    },
    fix: {
      type: Boolean,
      value: false
    },
    fullscreen: {
      type: Boolean,
      value: false
    },
    custom: {
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