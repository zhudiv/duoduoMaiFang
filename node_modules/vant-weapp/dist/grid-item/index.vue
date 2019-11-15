<template>
<view>
<view :class="utils.bem('grid-item', { square })" :style="style" @tap="onClick">
  <view :class="utils.bem('grid-item__content', { center, square, clickable, surround: border && gutter }) + ' ' + ( border ? 'van-hairline--surround' : '' )">
    <block v-if="useSlot">
      <slot></slot>
    </block>
    <block v-else>
      <view class="van-grid-item__icon">
        <van-icon v-if="icon" :name="icon"></van-icon>
        <slot v-else name="icon"></slot>
      </view>
      <view class="van-grid-item__text">
        <text v-if="text">{{ text }}</text>
        <slot v-else name="text"></slot>
      </view>
    </block>
  </view>
</view>
</view>
</template>

<script>
import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      relation: {
        name: 'grid',
        type: 'ancestor',

        linked(parent) {
          this.parent = parent;
        }

      },
      props: {
        icon: String,
        text: String,
        useSlot: Boolean
      },
      style: "",
      center: "",
      border: "",
      square: "",
      gutter: "",
      clickable: ""
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
    mounted() {
      this.updateStyle();
    },

    updateStyle() {
      if (!this.parent) {
        return;
      }

      const {
        data,
        children
      } = this.parent;
      const {
        columnNum,
        border,
        square,
        gutter,
        clickable,
        center
      } = data;
      const width = `${100 / columnNum}%`;
      const styleWrapper = [];
      styleWrapper.push(`width: ${width}`);

      if (square) {
        styleWrapper.push(`padding-top: ${width}`);
      }

      if (gutter) {
        styleWrapper.push(`padding-right: ${gutter}px`);
        const index = children.indexOf(this);

        if (index >= columnNum) {
          styleWrapper.push(`margin-top: ${gutter}px`);
        }
      }

      this.setData({
        style: styleWrapper.join('; '),
        center,
        border,
        square,
        gutter,
        clickable
      });
    },

    onClick() {
      this.$emit('click');
      this.jumpLink();
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