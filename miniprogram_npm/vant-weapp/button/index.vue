<template>
<view>
<button :id="id" :class="'custom-class ' + utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]) + ' ' + ( hairline ? 'van-hairline--surround' : '' )" hover-class="van-button--active hover-class" :lang="lang" :style="style + ' ' + customStyle" :open-type="openType" :business-id="businessId" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" :app-parameter="appParameter" :aria-label="ariaLabel" @tap="onClick" @getuserinfo="bindGetUserInfo" @contact="bindContact" @getphonenumber="bindGetPhoneNumber" @error="bindError" @launchapp="bindLaunchApp" @opensetting="bindOpenSetting">
  <block v-if="loading">
    <van-loading custom-class="loading-class" :size="loadingSize" :type="loadingType" :color="( type === 'default' ? '#c9c9c9' : '' )"></van-loading>
    <view v-if="loadingText" class="van-button__loading-text">
      {{ loadingText }}
    </view>
  </block>
  <block v-else>
    <van-icon v-if="icon" size="1.2em" :name="icon" class="van-button__icon" custom-style="line-height: inherit;"></van-icon>
    <view class="van-button__text">
      <slot></slot>
    </view>
  </block>
</button>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";
import vanLoading from "../loading/index";

export default {
  data() {
    return {
      style: '',
      props: {
        icon: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
          type: String,
          value: 'circular'
        },
        type: {
          type: String,
          value: 'default'
        },
        size: {
          type: String,
          value: 'normal'
        },
        loadingSize: {
          type: String,
          value: '20px'
        },
        color: {
          type: String,

          observer(color) {
            let style = '';

            if (color) {
              style += `color: ${this.plain ? color : 'white'};`;

              if (!this.plain) {
                // Use background instead of backgroundColor to make linear-gradient work
                style += `background: ${color};`;
              } // hide border when color is linear-gradient


              if (color.indexOf('gradient') !== -1) {
                style += 'border: 0;';
              } else {
                style += `border-color: ${color};`;
              }
            }

            if (style !== this.style) {
              this.setData({
                style
              });
            }
          }

        }
      }
    };
  },

  components: {
    vanIcon,
    vanLoading
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        this.$emit('click');
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