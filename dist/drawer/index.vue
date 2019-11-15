<template>
<view :class="'i-class i-drawer ' + ( visible ? 'i-drawer-show' : '' ) + ' ' + ( 'i-drawer-' + mode )">
    <view v-if="mask" class="i-drawer-mask" @tap="handleMaskClick"></view>
    <view class="i-drawer-container">
        <slot></slot>
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
    visible: {
      type: Boolean,
      value: false
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    mode: {
      type: String,
      value: 'left' // left right

    }
  },
  methods: {
    handleMaskClick() {
      if (!this.maskClosable) {
        return;
      }

      this.$emit('close', {});
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