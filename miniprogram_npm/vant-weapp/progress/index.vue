<template>
<view>
<view class="van-progress custom-class" :style="'height: ' + strokeWidthUnit + ';'">
  <view class="van-progress__portion" :style="'width: ' + percentage + '%; background: ' + ( inactive ? '#cacaca' : color )">
    <view v-if="showPivot && getters.text(pivotText, percentage)" :style="'color: ' + textColor + '; background: ' + ( pivotColor ? pivotColor : inactive ? '#cacaca' : color )" class="van-progress__pivot">
      {{ getters.text(pivotText, percentage) }}
    </view>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
import { addUnit } from '../common/utils';
import getters from './index.js'

export default {
  data() {
    return {
      props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
          type: Boolean,
          value: true
        },
        color: {
          type: String,
          value: BLUE
        },
        textColor: {
          type: String,
          value: '#fff'
        },
        strokeWidth: {
          type: null,
          observer: 'setStrokeWidthUnit'
        }
      },
      strokeWidthUnit: '4px'
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.getters = getters;
  },

  methods: {
    setStrokeWidthUnit(val) {
      this.setData({
        strokeWidthUnit: addUnit(val)
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