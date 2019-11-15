<template>
<view class="van-loading custom-class" :style="'width: ' + sizeWithUnit + '; height: ' + sizeWithUnit">
  <view :class="'van-loading__spinner van-loading__spinner--' + type" :style="'color: ' + color + ';'">
    <view v-if="type === 'spinner'" v-for="(item, index) in 12" :key="index" class="van-loading__dot"></view>
  </view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';

export default {
  data() {
    return {
      props: {
        size: {
          type: String,
          observer: 'setSizeWithUnit'
        },
        type: {
          type: String,
          value: 'circular'
        },
        color: {
          type: String,
          value: '#c9c9c9'
        }
      },
      sizeWithUnit: '30px'
    };
  },

  components: {},
  props: {},
  methods: {
    setSizeWithUnit(size) {
      this.setData({
        sizeWithUnit: addUnit(size)
      });
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