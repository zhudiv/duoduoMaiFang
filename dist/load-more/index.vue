<template>
<view :class="'i-class i-load-more ' + ( loading ? '' : 'i-load-more-line' )">
    <view class="i-load-more-loading" v-if="loading"></view>
    <view class="i-load-more-tip">
        <view v-if="tip !== ''">{{ tip }}</view>
        <view v-else-if="tip === '' && loading">正在加载</view>
        <view class="i-load-more-empty" v-else></view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    loading: {
      type: Boolean,
      value: true
    },
    tip: {
      type: String,
      value: ''
    }
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