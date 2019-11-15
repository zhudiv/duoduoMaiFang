<template>
<view>
<view :class="utils.bem('tabbar-item', { active }) + ' custom-class'" :style="'color: ' + ( active ? activeColor : inactiveColor )" @tap="onClick">
  <view :class="utils.bem('tabbar-item__icon', { dot })">
    <van-icon v-if="icon" :name="icon" customStyle="display: block"></van-icon>
    <block v-else>
      <slot v-if="active" name="icon-active"></slot>
      <slot v-else name="icon"></slot>
    </block>
    <van-info v-if="info !== null" :info="info" custom-style="margin-top: 2px"></van-info>
  </view>
  <view class="van-tabbar-item__text">
    <slot></slot>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";
import vanInfo from "../info/index";

export default {
  data() {
    return {
      props: {
        info: null,
        name: null,
        icon: String,
        dot: Boolean
      },
      relation: {
        name: 'tabbar',
        type: 'ancestor'
      },
      active: false
    };
  },

  components: {
    vanIcon,
    vanInfo
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    onClick() {
      if (this.parent) {
        this.parent.onChange(this);
      }

      this.$emit('click');
    },

    updateFromParent() {
      const {
        parent
      } = this;

      if (!parent) {
        return;
      }

      const index = parent.children.indexOf(this);
      const parentData = parent.data;
      const {
        data
      } = this;
      const active = (data.name || index) === parentData.active;
      const patch = {};

      if (active !== data.active) {
        patch.active = active;
      }

      if (parentData.activeColor !== data.activeColor) {
        patch.activeColor = parentData.activeColor;
      }

      if (parentData.inactiveColor !== data.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }

      return Object.keys(patch).length > 0 ? this.set(patch) : Promise.resolve();
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