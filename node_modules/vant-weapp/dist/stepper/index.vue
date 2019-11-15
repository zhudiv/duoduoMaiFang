<template>
<view>
<view class="van-stepper custom-class">
  <view v-if="showMinus" data-type="minus" :style="buttonStyle" :class="'minus-class ' + utils.bem('stepper__minus', { disabled: disabled || value <= min })" hover-class="van-stepper__minus--hover" hover-stay-time="70" @tap="onTap" @touchstart="onTouchStart" @touchend="onTouchEnd"></view>
  <input :type="( integer ? 'number' : 'digit' )" :class="'input-class ' + utils.bem('stepper__input', { disabled: disabled || disableInput })" :style="inputStyle" :value="value" :focus="focus" :disabled="disabled || disableInput" @input="onInput" @focus="onFocus" @blur="onBlur"></input>
  <view v-if="showPlus" data-type="plus" :style="buttonStyle" :class="'plus-class ' + utils.bem('stepper__plus', { disabled: disabled || value >= max })" hover-class="van-stepper__plus--hover" hover-stay-time="70" @tap="onTap" @touchstart="onTouchStart" @touchend="onTouchEnd"></view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;
import utils from '../wxs/utils.js'

export default {
  data() {
    return {
      props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: null,
        buttonSize: null,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
          type: null,
          value: 1
        },
        max: {
          type: null,
          value: Number.MAX_SAFE_INTEGER
        },
        step: {
          type: null,
          value: 1
        },
        showPlus: {
          type: Boolean,
          value: true
        },
        showMinus: {
          type: Boolean,
          value: true
        }
      },
      focus: false,
      inputStyle: '',
      buttonStyle: '',
      value: ""
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    created() {
      this.setData({
        value: this.range(this.value)
      });
    },

    isDisabled(type) {
      if (type === 'plus') {
        return this.disabled || this.value >= this.max;
      }

      return this.disabled || this.value <= this.min;
    },

    onFocus(event) {
      this.$emit('focus', event.detail);
    },

    onBlur(event) {
      const value = this.range(this.value);
      this.triggerInput(value);
      this.$emit('blur', event.detail);
    },

    // limit value range
    range(value) {
      value = String(value).replace(/[^0-9.-]/g, '');
      return Math.max(Math.min(this.max, value), this.min);
    },

    onInput(event) {
      const {
        value = ''
      } = event.detail || {};
      this.triggerInput(value);
    },

    onChange() {
      const {
        type
      } = this;

      if (this.isDisabled(type)) {
        this.$emit('overlimit', type);
        return;
      }

      const diff = type === 'minus' ? -this.step : +this.step;
      const value = Math.round((+this.value + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.$emit(type);
    },

    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },

    onTap(event) {
      const {
        type
      } = event.currentTarget.dataset;
      this.type = type;
      this.onChange();
    },

    onTouchStart(event) {
      clearTimeout(this.longPressTimer);
      const {
        type
      } = event.currentTarget.dataset;
      this.type = type;
      this.isLongPress = false;
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },

    onTouchEnd() {
      clearTimeout(this.longPressTimer);
    },

    triggerInput(value) {
      this.setData({
        value: this.asyncChange ? this.value : value
      });
      this.$emit('change', value);
    },

    computeInputStyle() {
      let style = '';

      if (this.inputWidth) {
        style = `width: ${addUnit(this.inputWidth)};`;
      }

      if (this.buttonSize) {
        style += `height: ${addUnit(this.buttonSize)};`;
      }

      return style;
    },

    computeButtonStyle() {
      let style = '';
      const size = addUnit(this.buttonSize);

      if (this.buttonSize) {
        style = `width: ${size};height: ${size};`;
      }

      return style;
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
    value(value) {
      if (value === '') {
        return;
      }

      const newValue = this.range(value);

      if (typeof newValue === 'number' && +this.value !== newValue) {
        this.setData({
          value: newValue
        });
      }
    },

    inputWidth() {
      this.set({
        inputStyle: this.computeInputStyle()
      });
    },

    buttonSize() {
      this.set({
        inputStyle: this.computeInputStyle(),
        buttonStyle: this.computeButtonStyle()
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>