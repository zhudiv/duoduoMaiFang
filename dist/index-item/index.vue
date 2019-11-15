<template>
<view>
<view class="i-index-item i-class">
    <view class="i-index-item-header">{{name}}</view>
    <view class="i-index-item-content">
        <slot></slot>
    </view>
</view>
</view>
</template>

<script>
import parse from './parse.js'

export default {
  data() {
    return {
      relations: {
        '../index/index': {
          type: 'parent'
        }
      },
      top: 0,
      height: 0,
      currentName: ''
    };
  },

  components: {},
  props: {
    name: {
      type: String,
      value: ''
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
    updateDataChange() {
      const className = '.i-index-item';
      const query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(res => {
        this.setData({
          top: res.top,
          height: res.height,
          currentName: this.name
        });
      }).exec();
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