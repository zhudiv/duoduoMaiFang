<template>
<view>
<van-cell :size="size" :icon="leftIcon" :title="label" :center="center" :border="border" :is-link="isLink" :required="required" :clickable="clickable" :title-width="titleWidth" :custom-style="customStyle" :arrow-direction="arrowDirection" custom-class="van-field">
  <slot name="left-icon" slot="icon"></slot>
  <slot name="label" slot="title"></slot>
  <view :class="utils.bem('field__body', [type, system])">
    <textarea v-if="type === 'textarea'" :class="'input-class ' + utils.bem('field__input', [inputAlign, type, { disabled, error }])" :fixed="fixed" :focus="focus" :value="value" :disabled="disabled || readonly" :maxlength="maxlength" :placeholder="placeholder" :placeholder-style="placeholderStyle" :placeholder-class="utils.bem('field__placeholder', { error })" :auto-height="autosize" :cursor-spacing="cursorSpacing" :adjust-position="adjustPosition" :show-confirm-bar="showConfirmBar" :selection-end="selectionEnd" :selection-start="selectionStart" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm">
    </textarea>
    <input v-else :class="'input-class ' + utils.bem('field__input', [inputAlign, { disabled, error }])" :type="type" :focus="focus" :value="value" :disabled="disabled || readonly" :maxlength="maxlength" :placeholder="placeholder" :placeholder-style="placeholderStyle" :placeholder-class="utils.bem('field__placeholder', { error })" :confirm-type="confirmType" :confirm-hold="confirmHold" :cursor-spacing="cursorSpacing" :adjust-position="adjustPosition" :selection-end="selectionEnd" :selection-start="selectionStart" :password="password || type === 'password'" @input="onInput" @blur="onBlur" @focus="onFocus" @confirm="onConfirm"></input>
    <van-icon v-if="clearable && focused && value && !readonly" size="16px" name="clear" class="van-field__clear-root van-field__icon-root" @touchstart="onClear"></van-icon>
    <view class="van-field__icon-container" @tap="onClickIcon">
      <van-icon v-if="rightIcon || icon" size="16px" :name="rightIcon || icon" :class="'van-field__icon-root ' + iconClass" custom-class="right-icon-class"></van-icon>
      <slot name="right-icon"></slot>
      <slot name="icon"></slot>
    </view>
    <view class="van-field__button">
      <slot name="button"></slot>
    </view>
  </view>
  <view v-if="errorMessage" :class="'van-field__error-message ' + utils.bem('field__error', [errorMessageAlign, { disabled, error }])">
    {{ errorMessage }}
  </view>
</van-cell>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { getSystemInfoSync } from '../common/utils';
import utils from '../wxs/utils.js'
import vanCell from "../cell/index";
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        clickable: Boolean,
        inputAlign: String,
        placeholder: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        arrowDirection: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        selectionEnd: {
          type: Number,
          value: -1
        },
        selectionStart: {
          type: Number,
          value: -1
        },
        showConfirmBar: {
          type: Boolean,
          value: true
        },
        adjustPosition: {
          type: Boolean,
          value: true
        },
        cursorSpacing: {
          type: Number,
          value: 50
        },
        maxlength: {
          type: Number,
          value: -1
        },
        type: {
          type: String,
          value: 'text'
        },
        border: {
          type: Boolean,
          value: true
        },
        titleWidth: {
          type: String,
          value: '90px'
        }
      },
      focused: false,
      system: getSystemInfoSync().system.split(' ').shift().toLowerCase(),
      value: ""
    };
  },

  components: {
    vanCell,
    vanIcon
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    onInput(event) {
      const {
        value = ''
      } = event.detail || {};
      this.setData({
        value
      }, () => {
        this.emitChange(value);
      });
    },

    onFocus(event) {
      this.setData({
        focused: true
      });
      this.$emit('focus', event.detail);
    },

    onBlur(event) {
      this.setData({
        focused: false
      });
      this.$emit('blur', event.detail);
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    onClear() {
      this.setData({
        value: ''
      }, () => {
        this.emitChange('');
        this.$emit('clear', '');
      });
    },

    onConfirm() {
      this.$emit('confirm', this.value);
    },

    emitChange(value) {
      this.$emit('input', value);
      this.$emit('change', value);
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