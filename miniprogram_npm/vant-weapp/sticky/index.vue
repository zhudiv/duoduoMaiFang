<template>
<view class="custom-class van-sticky" :style="'z-index: ' + zIndex + '; ' + containerStyle">
  <view class="van-sticky-wrap" :style="wrapStyle">
    <slot></slot>
  </view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { nextTick } from '../common/utils';

export default {
  data() {
    return {
      props: {
        zIndex: {
          type: Number,
          value: 99
        },
        offsetTop: {
          type: Number,
          value: 0
        }
      },
      position: '',
      height: 0,
      wrapStyle: '',
      containerStyle: ''
    };
  },

  components: {},
  props: {},
  methods: {
    setWrapStyle() {
      const {
        offsetTop,
        position
      } = this;
      let wrapStyle;
      let containerStyle;

      switch (position) {
        case 'top':
          wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
          containerStyle = `height: ${this.itemHeight}px;`;
          break;

        case 'bottom':
          wrapStyle = `
            top: auto;
            bottom: 0;
          `;
          containerStyle = '';
          break;

        default:
          wrapStyle = '';
          containerStyle = '';
      }

      const data = {};

      if (wrapStyle !== this.wrapStyle) {
        data.wrapStyle = wrapStyle;
      }

      if (containerStyle !== this.containerStyle) {
        data.containerStyle = containerStyle;
      }

      if (JSON.stringify(data) !== '{}') {
        this.setData(data);
      }
    },

    setPosition(position) {
      if (position !== this.position) {
        this.setData({
          position
        });
        nextTick(() => {
          this.setWrapStyle();
        });
      }
    },

    observerContentScroll() {
      const {
        offsetTop = 0
      } = this;
      const {
        windowHeight
      } = wx.getSystemInfoSync();
      this.createIntersectionObserver({}).disconnect(); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        top: -(this.itemHeight + offsetTop)
      }).observe('.van-sticky', res => {
        const {
          top
        } = res.boundingClientRect;

        if (top > offsetTop) {
          return;
        }

        const position = 'top';
        this.$emit('scroll', {
          scrollTop: top + offsetTop,
          isFixed: true
        });
        this.setPosition(position);
      }); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        bottom: -(windowHeight - 1 - offsetTop)
      }).observe('.van-sticky', res => {
        const {
          top,
          bottom
        } = res.boundingClientRect;

        if (bottom <= this.itemHeight - 1) {
          return;
        }

        const position = res.intersectionRatio > 0 ? 'top' : '';
        this.$emit('scroll', {
          scrollTop: top + offsetTop,
          isFixed: position === 'top'
        });
        this.setPosition(position);
      });
    },

    mounted() {
      this.getRect('.van-sticky').then(rect => {
        this.itemHeight = rect.height;
        this.itemTop = rect.top;
        this.observerContentScroll();
      });
    },

    destroyed() {
      this.createIntersectionObserver({}).disconnect();
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