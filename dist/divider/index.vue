<template>
<view>
<view class="i-divider i-class" :style="parse.getStyle(color,size,height)">
    <view class="i-divider-content" v-if="content !== ''">
        {{content}}
    </view>
    <view class="i-divider-content" v-else>
        <slot></slot>
    </view>
    <view class="i-divider-line" :style="'background:' + lineColor"></view>
</view>
</view>
</template>

<script>
import parse from './parse.js'

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    content: {
      type: String,
      value: ''
    },
    height: {
      type: Number,
      value: 48
    },
    color: {
      type: String,
      value: '#80848f'
    },
    lineColor: {
      type: String,
      value: '#e9eaec'
    },
    size: {
      type: String,
      value: 12
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
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