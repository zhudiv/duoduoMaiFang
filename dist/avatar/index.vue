<template>
<view :class="'i-class i-avatar i-avatar-' + shape + ' i-avatar-' + size + ' ' + ( src ? 'i-avatar-image' : '' )">
    <image :src="src" v-if="src !== ''"></image>
    <view class="i-avatar-string" v-else><slot></slot></view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    // circle || square
    shape: {
      type: String,
      value: 'circle'
    },
    // small || large || default
    size: {
      type: String,
      value: 'default'
    },
    src: {
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