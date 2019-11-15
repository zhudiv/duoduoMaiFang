<template>
<view>
<view :class="'custom-class ' + utils.bem('switch', { on: value === activeValue, disabled })" :style="'font-size: ' + size + '; ' + ( (checked ? activeColor : inactiveColor) ? 'background-color: ' + (checked ? activeColor : inactiveColor ) : '' )" @tap="onClick">
  <view class="van-switch__node node-class">
    <van-loading v-if="loading" :color="loadingColor" size="50%" custom-class="van-switch__loading"></van-loading>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { BLUE, GRAY_DARK } from '../common/color';
import utils from '../wxs/utils.js'
import vanLoading from "../loading/index";

export default {
  data() {
    return {
      props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
          type: String,
          value: '30px'
        },
        activeValue: {
          type: null,
          value: true
        },
        inactiveValue: {
          type: null,
          value: false
        }
      },
      value: "",
      loadingColor: ""
    };
  },

  components: {
    vanLoading
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    created() {
      const {
        checked: value
      } = this;
      const loadingColor = this.getLoadingColor(value);
      this.setData({
        value,
        loadingColor
      });
    },

    getLoadingColor(checked) {
      const {
        activeColor,
        inactiveColor
      } = this;
      return checked ? activeColor || BLUE : inactiveColor || GRAY_DARK;
    },

    onClick() {
      const {
        activeValue,
        inactiveValue
      } = this;

      if (!this.disabled && !this.loading) {
        const checked = this.checked === activeValue;
        const value = checked ? inactiveValue : activeValue;
        this.$emit('input', value);
        this.$emit('change', value);
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
  },
  watch: {
    checked(value) {
      const loadingColor = this.getLoadingColor(value);
      this.setData({
        value,
        loadingColor
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>