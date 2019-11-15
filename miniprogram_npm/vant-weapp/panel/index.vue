<template>
<view class="van-panel van-hairline--top-bottom custom-class">
  <van-cell v-if="title || desc || status" :title="title" :label="desc" :value="status" custom-class="header-class" value-class="van-panel__header-value"></van-cell>
  <slot v-else name="header"></slot>

  <view class="van-panel__content">
    <slot></slot>
  </view>

  <view v-if="useFooterSlot" class="van-panel__footer van-hairline--top footer-class">
    <slot name="footer"></slot>
  </view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import vanCell from "../cell/index";

export default {
  data() {
    return {
      props: {
        desc: String,
        title: String,
        status: String,
        useFooterSlot: Boolean
      }
    };
  },

  components: {
    vanCell
  },
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