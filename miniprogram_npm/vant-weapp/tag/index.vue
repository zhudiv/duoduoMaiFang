<template>
<view>
<view :class="'custom-class ' + utils.bem('tag', [type, size, { mark, plain, round }]) + ' ' + ( plain ? 'van-hairline--surround' : '' )" :style="( color && !plain ? 'background-color: ' + color + ';' : '' ) + '' + ( textColor || (color && plain) ? 'color: ' + (textColor || color) : '' )">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'

export default {
  data() {
    return {
      props: {
        size: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String,
        type: {
          type: String,
          value: 'default'
        }
      }
    };
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