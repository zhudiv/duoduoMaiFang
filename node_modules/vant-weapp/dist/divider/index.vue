<template>
<view>
<view :class="'custom-class ' + utils.bem('divider', [{dashed, hairline}, contentPosition])" :style="( borderColor  ? 'border-color: ' + borderColor + ';' : '' ) + '' + ( textColor ? 'color: ' + textColor : '' ) + ' ' + ( fontSize ? 'font-size: ' + fontSize + 'px' : '' ) + ' ' + customStyle">
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
        dashed: {
          type: Boolean,
          value: false
        },
        hairline: {
          type: Boolean,
          value: false
        },
        contentPosition: {
          type: String,
          value: ''
        },
        fontSize: {
          type: Number,
          value: ''
        },
        borderColor: {
          type: String,
          value: ''
        },
        textColor: {
          type: String,
          value: ''
        },
        customStyle: {
          type: String,
          value: ''
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