<template>
<view>
<view :class="'custom-class ' + utils.bem('col', [span]) + ' ' + ( offset ? 'van-col--offset-' + offset : '' )" :style="style">
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
      relation: {
        name: 'row',
        type: 'ancestor'
      },
      props: {
        span: Number,
        offset: Number
      },
      style: ''
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    setGutter(gutter) {
      const padding = `${gutter / 2}px`;
      const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';

      if (style !== this.style) {
        this.setData({
          style
        });
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
@import "./index.css";
</style>