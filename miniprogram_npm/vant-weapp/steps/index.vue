<template>
<view>
<view :class="'custom-class ' + utils.bem('steps', [direction])">
  <view class="van-step__wrapper">
    <view v-for="(item, index) in steps" :key="index" :class="utils.bem('step', [direction, status(index, active)]) + ' van-hairline'">
      <view class="van-step__title" :style="( index === active ? 'color: ' + activeColor : '' )">
        <view>{{ item.text }}</view>
        <view>{{ item.desc }}</view>
      </view>
      <view class="van-step__circle-container">
        <block v-if="index !== active">
          <van-icon v-if="inactiveIcon" :name="inactiveIcon" color="#969799" size="12px"></van-icon>
          <view v-else class="van-step__circle" :style="( index < active ? 'background-color: ' + activeColor : '' )"></view>
        </block>

        <van-icon v-else :name="activeIcon" :color="activeColor" custom-class="van-step__active"></van-icon>
      </view>
      <view v-if="index !== steps.length - 1" class="van-step__line" :style="( index < active ? 'background-color: ' + activeColor : '' )"></view>
    </view>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';
import utils from '../wxs/utils.js'
import status from './status.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
          type: String,
          value: 'horizontal'
        },
        activeColor: {
          type: String,
          value: GREEN
        },
        activeIcon: {
          type: String,
          value: 'checked'
        },
        inactiveIcon: String
      }
    };
  },

  components: {
    vanIcon
  },
  props: {},

  onLoad() {
    this.status = status;
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