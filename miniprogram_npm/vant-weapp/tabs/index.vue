<template>
<view>
<view :class="'custom-class ' + utils.bem('tabs', [type])">
  <view :style="'z-index: ' + zIndex + '; ' + wrapStyle" :class="utils.bem('tabs__wrap', { scrollable }) + ' ' + ( type === 'line' && border ? 'van-hairline--top-bottom' : '' )">
    <slot name="nav-left"></slot>

    <scroll-view :scroll-x="scrollable" scroll-with-animation :scroll-left="scrollLeft" :class="'van-tabs__scroll--' + type" :style="( color ? 'border-color: ' + color : '' )">
      <view :class="utils.bem('tabs__nav', [type]) + ' nav-class'">
        <view v-if="type === 'line'" class="van-tabs__line" :style="lineStyle"></view>
        <view v-for="(item, index) in tabs" :key="index" :data-index="index" :class="'van-ellipsis tab-class ' + ( index === active ? 'tab-active-class' : '' ) + ' ' + utils.bem('tab', { active: index === active, disabled: item.disabled })" :style="( color && index !== active && type === 'card' && !item.disabled ? 'color: ' + color : '' ) + ' ' + ( color && index === active && type === 'card' ? ';background-color:' + color : '' ) + ' ' + ( color ? ';border-color: ' + color : '' ) + ' ' + ( scrollable ? ';flex-basis:' + (88 / swipeThreshold) + '%' : '' )" @tap="onTap">
          <view :class="'van-ellipsis ' + utils.bem('tab__title', { dot: item.dot })" :style="item.titleStyle">
            {{ item.title }}
            <van-info v-if="item.info !== null" :info="item.info" custom-class="van-tab__title__info"></van-info>
          </view>
        </view>
      </view>
    </scroll-view>

    <slot name="nav-right"></slot>
  </view>
  <view class="van-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view class="van-tabs__track" :style="trackStyle">
      <slot></slot>
    </view>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { nextTick } from '../common/utils';
import utils from '../wxs/utils.js'
import vanInfo from "../info/index";

export default {
  data() {
    return {
      relation: {
        name: 'tab',
        type: 'descendant',

        linked(child) {
          this.child.push(child);
          this.updateTabs(this.tabs.concat(child.data));
        },

        unlinked(child) {
          const index = this.child.indexOf(child);
          const {
            tabs
          } = this;
          tabs.splice(index, 1);
          this.child.splice(index, 1);
          this.updateTabs(tabs);
        }

      },
      props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
          type: Number,
          value: -1
        },
        lineHeight: {
          type: Number,
          value: -1
        },
        active: {
          type: Number,
          value: 0
        },
        type: {
          type: String,
          value: 'line'
        },
        border: {
          type: Boolean,
          value: true
        },
        duration: {
          type: Number,
          value: 0.3
        },
        zIndex: {
          type: Number,
          value: 1
        },
        swipeThreshold: {
          type: Number,
          value: 4
        },
        offsetTop: {
          type: Number,
          value: 0
        }
      },
      tabs: [],
      lineStyle: '',
      scrollLeft: 0,
      scrollable: false,
      trackStyle: '',
      wrapStyle: '',
      position: '',
      active: ""
    };
  },

  components: {
    vanInfo
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    beforeCreate() {
      this.child = [];
    },

    mounted() {
      this.setLine(true);
      this.setTrack();
      this.scrollIntoView();
      this.getRect('.van-tabs__wrap').then(rect => {
        this.navHeight = rect.height;
        this.observerContentScroll();
      });
    },

    destroyed() {
      // @ts-ignore
      this.createIntersectionObserver().disconnect();
    },

    updateTabs(tabs) {
      tabs = tabs || this.tabs;
      this.setData({
        tabs,
        scrollable: tabs.length > this.swipeThreshold
      });
      this.setActiveTab();
    },

    trigger(eventName, index) {
      this.$emit(eventName, {
        index,
        title: this.tabs[index].title
      });
    },

    onTap(event) {
      const {
        index
      } = event.currentTarget.dataset;

      if (this.tabs[index].disabled) {
        this.trigger('disabled', index);
      } else {
        this.trigger('click', index);
        this.setActive(index);
      }
    },

    setActive(active) {
      if (active !== this.active) {
        this.trigger('change', active);
        this.setData({
          active
        });
        this.setActiveTab();
      }
    },

    setLine(skipTransition) {
      if (this.type !== 'line') {
        return;
      }

      const {
        color,
        active,
        duration,
        lineWidth,
        lineHeight
      } = this;
      this.getRect('.van-tab', true).then(rects => {
        const rect = rects[active];
        const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        const height = lineHeight !== -1 ? `height: ${lineHeight}px;` : '';
        let left = rects.slice(0, active).reduce((prev, curr) => prev + curr.width, 0);
        left += (rect.width - width) / 2;
        const transition = skipTransition ? '' : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;
        this.setData({
          lineStyle: `
            ${height}
            width: ${width}px;
            background-color: ${color};
            -webkit-transform: translateX(${left}px);
            transform: translateX(${left}px);
            ${transition}
          `
        });
      });
    },

    setTrack() {
      const {
        animated,
        active,
        duration
      } = this;
      if (!animated) return '';
      this.getRect('.van-tabs__content').then(rect => {
        const {
          width
        } = rect;
        this.setData({
          trackStyle: `
              width: ${width * this.child.length}px;
              left: ${-1 * active * width}px;
              transition: left ${duration}s;
              display: -webkit-box;
              display: flex;
            `
        });
        const data = {
          width,
          animated
        };
        this.child.forEach(item => {
          item.setData(data);
        });
      });
    },

    setActiveTab() {
      this.child.forEach((item, index) => {
        const data = {
          active: index === this.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.setData(data);
        }
      });
      nextTick(() => {
        this.setLine();
        this.setTrack();
        this.scrollIntoView();
      });
    },

    // scroll active tab into view
    scrollIntoView() {
      const {
        active,
        scrollable
      } = this;

      if (!scrollable) {
        return;
      }

      Promise.all([this.getRect('.van-tab', true), this.getRect('.van-tabs__nav')]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[active];
        const offsetLeft = tabRects.slice(0, active).reduce((prev, curr) => prev + curr.width, 0);
        this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
        });
      });
    },

    onTouchStart(event) {
      if (!this.swipeable) return;
      this.touchStart(event);
    },

    onTouchMove(event) {
      if (!this.swipeable) return;
      this.touchMove(event);
    },

    // watch swipe touch end
    onTouchEnd() {
      if (!this.swipeable) return;
      const {
        active,
        tabs
      } = this;
      const {
        direction,
        deltaX,
        offsetX
      } = this;
      const minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && active !== 0) {
          this.setActive(active - 1);
        } else if (deltaX < 0 && active !== tabs.length - 1) {
          this.setActive(active + 1);
        }
      }
    },

    setWrapStyle() {
      const {
        offsetTop,
        position
      } = this;
      let wrapStyle;

      switch (position) {
        case 'top':
          wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
          break;

        case 'bottom':
          wrapStyle = `
            top: auto;
            bottom: 0;
          `;
          break;

        default:
          wrapStyle = '';
      }

      if (wrapStyle !== this.wrapStyle) {
        this.setData({
          wrapStyle
        });
      }
    },

    observerContentScroll() {
      if (!this.sticky) {
        return;
      }

      const {
        offsetTop
      } = this;
      const {
        windowHeight
      } = wx.getSystemInfoSync(); // @ts-ignore

      this.createIntersectionObserver().disconnect(); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        top: -(this.navHeight + offsetTop)
      }).observe('.van-tabs', res => {
        const {
          top
        } = res.boundingClientRect;

        if (top > offsetTop) {
          return;
        }

        const position = res.intersectionRatio > 0 ? 'top' : 'bottom';
        this.$emit('scroll', {
          scrollTop: top + offsetTop,
          isFixed: position === 'top'
        });
        this.setPosition(position);
      }); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        bottom: -(windowHeight - 1 - offsetTop)
      }).observe('.van-tabs', res => {
        const {
          top,
          bottom
        } = res.boundingClientRect;

        if (bottom < this.navHeight) {
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

    setPosition(position) {
      if (position !== this.position) {
        this.set({
          position
        }).then(() => {
          this.setWrapStyle();
        });
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
    swipeThreshold() {
      this.setData({
        scrollable: this.child.length > this.swipeThreshold
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>