<template>
<view>
<view class="van-submit-bar custom-class">
  <slot name="top"></slot>

  <view class="van-submit-bar__tip">
    <van-icon v-if="tipIcon" size="12px" :name="tipIcon" custom-class="van-submit-bar__tip-icon"></van-icon>
    <view v-if="hasTip" class="van-submit-bar__tip-text">
      {{ tip }}
    </view>
    <slot name="tip"></slot>
  </view>

  <view :class="'bar-class ' + utils.bem('submit-bar__bar', { safe: safeAreaInsetBottom && isIPhoneX })">
    <slot></slot>
    <view v-if="hasPrice" class="van-submit-bar__text">
      <text>{{ label || '合计：' }}</text>
      <text class="van-submit-bar__price price-class">
        <text class="van-submit-bar__currency">{{ currency }} </text>
        <text>{{ priceStr }}</text>
      </text>
      <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
    </view>
    <van-button square size="large" :type="buttonType" :loading="loading" :disabled="disabled" class="van-submit-bar__button" custom-class="button-class" @click="onSubmit">
      {{ loading ? '' : buttonText }}
    </van-button>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs/utils.js'
import vanButton from "../button/index";
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        tip: {
          type: null,
          observer: 'updateTip'
        },
        tipIcon: String,
        type: Number,
        price: {
          type: null,
          observer: 'updatePrice'
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
          type: String,
          value: '¥'
        },
        buttonType: {
          type: String,
          value: 'danger'
        },
        decimalLength: {
          type: Number,
          value: 2,
          observer: 'updatePrice'
        },
        suffixLabel: String
      },
      hasPrice: "",
      priceStr: "",
      hasTip: ""
    };
  },

  components: {
    vanButton,
    vanIcon
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    updatePrice() {
      const {
        price,
        decimalLength
      } = this;
      this.setData({
        hasPrice: typeof price === 'number',
        priceStr: (price / 100).toFixed(decimalLength)
      });
    },

    updateTip() {
      this.setData({
        hasTip: typeof this.tip === 'string'
      });
    },

    onSubmit(event) {
      this.$emit('submit', event.detail);
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