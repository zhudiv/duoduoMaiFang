<template>
<view>
<view class="van-checkbox custom-class">
  <view class="van-checkbox__icon-wrap" @tap="toggle">
    <slot v-if="useIconSlot" name="icon"></slot>
    <van-icon v-else name="success" size="0.8em" :class="utils.bem('checkbox__icon', [shape, { disabled, checked: value }])" :style="'font-size: ' + sizeWithUnit + ';' + ( checkedColor && value && !disabled ? 'border-color:' + checkedColor + '; background-color:' + checkedColor : '' )" custom-class="icon-class" custom-style="line-height: 1.25em;"></van-icon>
  </view>
  <view :class="'label-class ' + utils.bem('checkbox__label', [labelPosition, { disabled }])" @tap="onClickLabel">
    <slot></slot>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
function emit(target, value) {
  target.$emit('input', value);
  target.$emit('change', value);
}
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      relation: {
        name: 'checkbox-group',
        type: 'ancestor',

        linked(target) {
          this.parent = target;
        },

        unlinked() {
          this.parent = null;
        }

      },
      props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
          type: String,
          value: 'round'
        },
        iconSize: {
          type: null,
          observer: 'setSizeWithUnit'
        }
      },
      sizeWithUnit: '20px'
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
    emitChange(value) {
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        emit(this, value);
      }
    },

    toggle() {
      const {
        disabled,
        value
      } = this;

      if (!disabled) {
        this.emitChange(!value);
      }
    },

    onClickLabel() {
      const {
        labelDisabled,
        disabled,
        value
      } = this;

      if (!disabled && !labelDisabled) {
        this.emitChange(!value);
      }
    },

    setParentValue(parent, value) {
      const parentValue = parent.data.value.slice();
      const {
        name
      } = this;
      const {
        max
      } = parent.data;

      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);

        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    },

    setSizeWithUnit(size) {
      this.set({
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