<template>
<view>
<view :class="'van-collapse-item custom-class ' + ( index !== 0 ? 'van-hairline--top' : '' )">
  <van-cell :title="title" title-class="title-class" :icon="icon" :value="value" :label="label" :is-link="isLink" :clickable="clickable" :border="border && expanded" :class="utils.bem('collapse-item__title', { disabled, expanded })" right-icon-class="van-cell__right-icon" custom-class="van-cell" hover-class="van-cell--hover" @click="onClick">
    <slot name="title" slot="title"></slot>
    <slot name="icon" slot="icon"></slot>
    <slot name="value"></slot>
    <slot name="right-icon" slot="right-icon"></slot>
  </van-cell>
  <view :class="utils.bem('collapse-item__wrapper', { transition })" :style="'height: ' + contentHeight + ';'" @transitionend="onTransitionEnd">
    <view class="van-collapse-item__content content-class">
      <slot></slot>
    </view>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
const nextTick = () => new Promise(resolve => setTimeout(resolve, 20));
import utils from '../wxs/utils.js'
import vanCell from "../cell/index";

export default {
  data() {
    return {
      relation: {
        name: 'collapse',
        type: 'ancestor',

        linked(parent) {
          this.parent = parent;
        }

      },
      props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
          type: Boolean,
          value: true
        },
        isLink: {
          type: Boolean,
          value: true
        }
      },
      contentHeight: 0,
      expanded: false,
      transition: false
    };
  },

  components: {
    vanCell
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    mounted() {
      this.updateExpanded().then(nextTick).then(() => {
        const data = {
          transition: true
        };

        if (this.expanded) {
          data.contentHeight = 'auto';
        }

        this.setData(data);
      });
    },

    updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }

      const {
        value,
        accordion
      } = this.parent.data;
      const {
        children = []
      } = this.parent;
      const {
        name
      } = this;
      const index = children.indexOf(this);
      const currentName = name == null ? index : name;
      const expanded = accordion ? value === currentName : (value || []).some(name => name === currentName);
      const stack = [];

      if (expanded !== this.expanded) {
        stack.push(this.updateStyle(expanded));
      }

      stack.push(this.set({
        index,
        expanded
      }));
      return Promise.all(stack);
    },

    updateStyle(expanded) {
      return this.getRect('.van-collapse-item__content').then(rect => rect.height).then(height => {
        if (expanded) {
          return this.set({
            contentHeight: height ? `${height}px` : 'auto'
          });
        }

        return this.set({
          contentHeight: `${height}px`
        }).then(nextTick).then(() => this.set({
          contentHeight: 0
        }));
      });
    },

    onClick() {
      if (this.disabled) {
        return;
      }

      const {
        name,
        expanded
      } = this;
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;
      this.parent.switch(currentName, !expanded);
    },

    onTransitionEnd() {
      if (this.expanded) {
        this.setData({
          contentHeight: 'auto'
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
  }
};
</script>
<style>
@import "./index.css";
</style>