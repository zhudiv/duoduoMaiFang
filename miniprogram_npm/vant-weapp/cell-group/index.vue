<template>
<view>
<view v-if="title" class="van-cell-group__title">
  {{ title }}
</view>
<view :class="'custom-class van-cell-group ' + ( border ? 'van-hairline--top-bottom' : '' )">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      props: {
        title: String,
        border: {
          type: Boolean,
          value: true
        }
      }
    };
  },

  components: {},
  props: {},
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