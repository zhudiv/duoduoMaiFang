<template>
<view>
<view class="van-radio custom-class">
  <view v-if="labelPosition === 'left'" :class="'label-class ' + utils.bem('radio__label', [labelPosition, { disabled }])" @tap="onClickLabel">
    <slot></slot>
  </view>
  <view class="van-radio__icon-wrap" :style="'font-size: ' + iconSizeWithUnit + ';'" @tap="onChange">
    <slot v-if="useIconSlot" name="icon"></slot>
    <van-icon v-else name="success" :class="utils.bem('radio__icon', [shape, { disabled, checked: value === name }])" :style="( checkedColor && !disabled && value === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor + ';' : '' )" custom-class="icon-class" :custom-style="'line-height: ' + iconSizeWithUnit + ';font-size: .8em;display: block;'"></van-icon>
  </view>
  <view v-if="labelPosition === 'right'" :class="'label-class ' + utils.bem('radio__label', [labelPosition, { disabled }])" @tap="onClickLabel">
    <slot></slot>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      relation: {
        name: 'radio-group',
        type: 'ancestor',

        linked(target) {
          this.parent = target;
        },

        unlinked() {
          this.parent = null;
        }

      },
      props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
          type: String,
          value: 'right'
        },
        labelDisabled: Boolean,
        shape: {
          type: String,
          value: 'round'
        },
        iconSize: {
          type: null,
          observer: 'setIconSizeUnit'
        }
      },
      iconSizeWithUnit: '20px'
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
    setIconSizeUnit(val) {
      this.setData({
        iconSizeWithUnit: addUnit(val)
      });
    },

    emitChange(value) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
    },

    onChange(event) {
      console.log(event);
      this.emitChange(this.name);
    },

    onClickLabel() {
      const {
        disabled,
        labelDisabled,
        name
      } = this;

      if (!disabled && !labelDisabled) {
        this.emitChange(name);
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