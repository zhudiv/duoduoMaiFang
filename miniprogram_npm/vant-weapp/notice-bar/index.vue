<template>
<view>
<view v-if="show" :class="'custom-class ' + utils.bem('notice-bar', { withicon: mode, wrapable })" :style="'color: ' + color + '; background-color: ' + backgroundColor + ';'" @tap="onClick">
  <van-icon v-if="leftIcon" size="16px" :name="leftIcon" class="van-notice-bar__left-icon"></van-icon>
  <slot v-else name="left-icon"></slot>

  <view class="van-notice-bar__wrap">
    <view :class="'van-notice-bar__content ' + ( !scrollable && !wrapable ? 'van-ellipsis' : '' )" :animation="animationData">
      {{ text }}
    </view>
  </view>

  <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @tap="onClickIcon"></van-icon>
  <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
    <van-icon class="van-notice-bar__right-icon" name="arrow"></van-icon>
  </navigator>
  <slot v-else name="right-icon"></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        text: {
          type: String,
          value: ''
        },
        mode: {
          type: String,
          value: ''
        },
        url: {
          type: String,
          value: ''
        },
        openType: {
          type: String,
          value: 'navigate'
        },
        delay: {
          type: Number,
          value: 1
        },
        speed: {
          type: Number,
          value: 50
        },
        scrollable: {
          type: Boolean,
          value: true
        },
        leftIcon: {
          type: String,
          value: ''
        },
        color: {
          type: String,
          value: FONT_COLOR
        },
        backgroundColor: {
          type: String,
          value: BG_COLOR
        },
        wrapable: Boolean
      },
      show: true,
      animationData: ""
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
    created() {
      this.resetAnimation = wx.createAnimation({
        duration: 0,
        timingFunction: 'linear'
      });
    },

    destroyed() {
      this.timer && clearTimeout(this.timer);
    },

    init() {
      Promise.all([this.getRect('.van-notice-bar__content'), this.getRect('.van-notice-bar__wrap')]).then(rects => {
        const [contentRect, wrapRect] = rects;

        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
          return;
        }

        const {
          speed,
          scrollable,
          delay
        } = this;

        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = contentRect.width / speed * 1000;
          this.wrapWidth = wrapRect.width;
          this.contentWidth = contentRect.width;
          this.duration = duration;
          this.animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
            delay
          });
          this.scroll();
        }
      });
    },

    scroll() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.setData({
        animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
      });
      setTimeout(() => {
        this.setData({
          animationData: this.animation.translateX(-this.contentWidth).step().export()
        });
      }, 20);
      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },

    onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.setData({
        show: false
      });
    },

    onClick(event) {
      this.$emit('click', event);
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
    text() {
      this.setData({}, this.init);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>