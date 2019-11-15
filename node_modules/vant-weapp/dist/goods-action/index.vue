<template>
<view>
<view :class="'custom-class ' + utils.bem('goods-action', { safe: isIPhoneX && safeAreaInsetBottom })">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs/utils.js'

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
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