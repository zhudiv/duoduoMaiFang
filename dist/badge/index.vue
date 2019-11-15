<template>
<view class="i-class i-badge">
    <slot></slot>
    <view class="i-badge-dot" v-if="dot"></view>
    <view class="i-badge-count i-class-alone" v-else-if="count !== 0">{{ finalCount }}</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      finalCount: 0
    };
  },

  components: {},
  props: {
    count: {
      type: Number,
      value: 0,
      observer: 'finalCount'
    },
    overflowCount: {
      type: Number,
      value: 99
    },
    dot: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    finalCountFun() {
      this.setData({
        finalCount: parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
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