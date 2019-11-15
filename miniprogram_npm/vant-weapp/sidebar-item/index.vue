<template>
<view>
<view :class="utils.bem('sidebar-item', { active }) + ' van-hairline custom-class'" hover-class="van-sidebar-item--hover" hover-stay-time="70" @tap="onClick">
  <view class="van-sidebar-item__text">
    <van-info v-if="info !== null || dot" :dot="dot" :info="info" custom-style="right: 4px"></van-info>
    {{ title }}
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'
import vanInfo from "../info/index";

export default {
  data() {
    return {
      relation: {
        type: 'ancestor',
        name: 'sidebar',

        linked(target) {
          this.parent = target;
        }

      },
      props: {
        dot: Boolean,
        info: null,
        title: String
      },
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
    onClick() {
      const {
        parent
      } = this;

      if (!parent) {
        return;
      }

      const index = parent.items.indexOf(this);
      parent.setActive(index).then(() => {
        this.$emit('click', index);
        parent.$emit('change', index);
      });
    },

    setActive(active) {
      return this.setData({
        active
      });
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