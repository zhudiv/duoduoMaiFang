<template>
<view>
<van-overlay v-if="mask || forbidClick" :show="show" :z-index="zIndex" :custom-style="( mask ? '' : 'background-color: transparent;' )"></van-overlay>
<van-transition :show="show" :custom-style="'z-index: ' + zIndex" custom-class="van-toast__container">
  <view :class="'van-toast van-toast--' + ( type === 'text' ? 'text' : 'icon' ) + ' van-toast--' + position" catch:touchmove="noop">
    <!-- text only -->
    <text v-if="type === 'text'">{{ message }}</text>

    <!-- with icon -->
    <block v-else>
      <van-loading v-if="type === 'loading'" color="white" :type="loadingType" custom-class="van-toast__loading"></van-loading>
      <van-icon v-else class="van-toast__icon" :name="type"></van-icon>
      <text v-if="message" class="van-toast__text">{{ message }}</text>
    </block>

    <slot></slot>
  </view>
</van-transition>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import vanIcon from "../icon/index";
import vanLoading from "../loading/index";
import vanOverlay from "../overlay/index";
import vanTransition from "../transition/index";

export default {
  data() {
    return {
      props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
          type: Number,
          value: 1000
        },
        type: {
          type: String,
          value: 'text'
        },
        loadingType: {
          type: String,
          value: 'circular'
        },
        position: {
          type: String,
          value: 'middle'
        }
      }
    };
  },

  components: {
    vanIcon,
    vanLoading,
    vanOverlay,
    vanTransition
  },
  props: {},
  methods: {
    // for prevent touchmove
    noop() {},

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