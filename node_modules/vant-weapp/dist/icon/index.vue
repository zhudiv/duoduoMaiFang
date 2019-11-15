<template>
<view :class="'custom-class ' + classPrefix + ' ' + ( isImageName ? 'van-icon--image' : classPrefix + '-' + name )" :style="( color ? 'color: ' + color + ';' : '' ) + '' + ( size ? 'font-size: ' + sizeWithUnit + ';' : '' ) + '' + customStyle" @tap="onClick">
  <van-info v-if="info !== null || dot" :dot="dot" :info="info" custom-class="van-icon__info"></van-info>
  <image v-if="isImageName" :src="name" mode="aspectFit" class="van-icon__image"></image>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
import vanInfo from "../info/index";

export default {
  data() {
    return {
      props: {
        dot: Boolean,
        info: null,
        size: {
          type: null,
          observer: 'setSizeWithUnit'
        },
        color: String,
        customStyle: String,
        classPrefix: {
          type: String,
          value: 'van-icon'
        },
        name: {
          type: String,

          observer(val) {
            this.setData({
              isImageName: val.indexOf('/') !== -1
            });
          }

        }
      },
      sizeWithUnit: null,
      isImageName: ""
    };
  },

  components: {
    vanInfo
  },
  props: {},
  methods: {
    onClick() {
      this.$emit('click');
    },

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