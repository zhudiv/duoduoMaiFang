<template>
<view>
<view :class="'custom-class ' + utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])" hover-class="van-cell--hover hover-class" hover-stay-time="70" :style="customStyle" @tap="onClick">
  <van-icon v-if="icon" :name="icon" class="van-cell__left-icon-wrap" custom-class="van-cell__left-icon"></van-icon>
  <slot v-else name="icon"></slot>

  <view :style="( titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : '' )" class="van-cell__title title-class">
    <block v-if="title">{{ title }}</block>
    <slot v-else name="title"></slot>

    <view v-if="label || useLabelSlot" class="van-cell__label label-class">
      <slot v-if="useLabelSlot" name="label"></slot>
      <block v-else-if="label">{{ label }}</block>
    </view>
  </view>

  <view class="van-cell__value value-class">
    <block v-if="value || value === 0">{{ value }}</block>
    <slot v-else></slot>
  </view>

  <van-icon v-if="isLink" :name="( arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow' )" class="van-cell__right-icon-wrap right-icon-class" custom-class="van-cell__right-icon"></van-icon>
  <slot v-else name="right-icon"></slot>

  <slot name="extra"></slot>
</view>
</view>
</template>

<script>
import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
          type: Boolean,
          value: true
        }
      }
    };
  },

  components: {
    vanIcon
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
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