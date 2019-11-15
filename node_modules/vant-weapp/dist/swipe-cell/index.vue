<template>
<view class="van-swipe-cell" data-key="cell" @click.stop="onClick" @touchstart="startDrag" :catchtouchmove="( catchMove ? 'noop' : '' )" capture-bind:touchmove="onDrag" catchtouchend="endDrag" catchtouchcancel="endDrag">
  <view :style="wrapperStyle">
    <view v-if="leftWidth" class="van-swipe-cell__left" data-key="left" @tap.native.stop="onClick">
      <slot name="left"></slot>
    </view>
    <slot></slot>
    <view v-if="rightWidth" class="van-swipe-cell__right" data-key="right" @tap.native.stop="onClick">
      <slot name="right"></slot>
    </view>
  </view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
const THRESHOLD = 0.3;

export default {
  data() {
    return {
      props: {
        disabled: Boolean,
        leftWidth: {
          type: Number,
          value: 0
        },
        rightWidth: {
          type: Number,
          value: 0
        },
        asyncClose: Boolean,
        name: {
          type: [Number, String],
          value: ''
        }
      },
      catchMove: false,
      wrapperStyle: ""
    };
  },

  components: {},
  props: {},
  methods: {
    created() {
      this.offset = 0;
    },

    open(position) {
      const {
        leftWidth,
        rightWidth
      } = this;
      const offset = position === 'left' ? leftWidth : -rightWidth;
      this.swipeMove(offset);
    },

    close() {
      this.swipeMove(0);
    },

    swipeMove(offset = 0) {
      this.offset = offset;
      const transform = `translate3d(${offset}px, 0, 0)`;
      const transition = this.draging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
      this.setData({
        wrapperStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
      });
    },

    swipeLeaveTransition() {
      const {
        leftWidth,
        rightWidth
      } = this;
      const {
        offset
      } = this;

      if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
        this.open('right');
      } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
        this.open('left');
      } else {
        this.swipeMove(0);
      }

      this.setData({
        catchMove: false
      });
    },

    startDrag(event) {
      if (this.disabled) {
        return;
      }

      this.draging = true;
      this.startOffset = this.offset;
      this.firstDirection = '';
      this.touchStart(event);
    },

    noop() {},

    onDrag(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (!this.firstDirection) {
        this.firstDirection = this.direction;
        this.setData({
          catchMove: this.firstDirection === 'horizontal'
        });
      }

      if (this.firstDirection === 'vertical') {
        return;
      }

      const {
        leftWidth,
        rightWidth
      } = this;
      const offset = this.startOffset + this.deltaX;

      if (rightWidth > 0 && -offset > rightWidth || leftWidth > 0 && offset > leftWidth) {
        return;
      }

      this.swipeMove(offset);
    },

    endDrag() {
      if (this.disabled) {
        return;
      }

      this.draging = false;
      this.swipeLeaveTransition();
    },

    onClick(event) {
      const {
        key: position = 'outside'
      } = event.currentTarget.dataset;
      this.$emit('click', position);

      if (!this.offset) {
        return;
      }

      if (this.asyncClose) {
        this.$emit('close', {
          position,
          instance: this,
          name: this.name
        });
      } else {
        this.swipeMove(0);
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