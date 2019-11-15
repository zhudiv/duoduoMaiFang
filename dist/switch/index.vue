<template>
<view>
<view :class="'i-class i-switch ' + parse.setSize(size) + ' ' + parse.setCurrent(value,disabled)" @tap="toggle">
    <input type="text" :name="name" wx:value="{{value}}" :value="value" class="i-switch-hide-input"></input>
    <view class="i-switch-inner" v-if="value === true">
        <slot name="open"></slot>
    </view>
    <view class="i-switch-inner" v-else>
        <slot name="close"></slot>
    </view>
</view>
</view>
</template>

<script>
import parse from './parse.js'

export default {
  data() {
    return {
      options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
      }
    };
  },

  components: {},
  props: {
    value: {
      type: Boolean,
      value: false
    },
    //large small default
    size: {
      type: String,
      value: 'default'
    },
    // is or not disable
    disabled: {
      type: Boolean,
      value: false
    },
    // hidden inut name
    name: {
      type: String,
      value: ''
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
    toggle() {
      if (this.disabled) return;
      const data = this;
      const value = data.value ? false : true;
      this.$emit('change', {
        value: value
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