<template>
<view class="i-class i-page">
    <view class="i-page-prev" v-if="mode === 'button'">
        <i-button i-class="i-page-button" type="ghost" @click="handlePrev" :disabled="current === 1"><slot name="prev"></slot></i-button>
    </view>
    <view class="i-page-number" v-if="mode !== 'pointer' && !simple">
        <view class="i-page-number-current">{{ current }}</view>/{{total}}
    </view>
    <view class="i-page-pointer" v-if="mode === 'pointer'">
        <view :class="'i-page-pointer-dot ' + ( (index + 1) === current ? 'current' : '' )" v-for="(item, index) in total" :key="index"></view>
    </view>
    <view class="i-page-next" v-if="mode === 'button'">
        <i-button i-class="i-page-button" type="ghost" @click="handleNext" :disabled="current === total"><slot name="next"></slot></i-button>
    </view>
</view>
</template>

<script>
import iButton from "../button/index";

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      }
    };
  },

  components: {
    iButton
  },
  props: {
    // button || number || pointer
    mode: {
      type: String,
      value: 'button'
    },
    current: {
      type: Number,
      value: 1
    },
    total: {
      type: Number,
      value: 0
    },
    // 是否隐藏数值
    simple: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleChange(type) {
      this.$emit('change', {
        type: type
      });
    },

    handlePrev() {
      this.handleChange('prev');
    },

    handleNext() {
      this.handleChange('next');
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