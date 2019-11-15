<template>
<view :class="'i-class i-alert ' + 'i-alert-'+type + ' ' + (showIcon?'i-alert-with-icon':'') + ' ' + (desc?'i-alert-with-desc':'')" v-if="!closed">
    <view v-if="showIcon" class="i-alert-icon">
        <i-icon type="prompt" v-if="type === 'info'" :size="(desc?24:16)"></i-icon>
        <i-icon type="success" v-if="type === 'success'" :size="(desc?24:16)"></i-icon>
        <i-icon type="warning" v-if="type === 'warning'" :size="(desc?24:16)"></i-icon>
        <i-icon type="delete" v-if="type === 'error'" :size="(desc?24:16)"></i-icon>
    </view>
    <slot></slot>
    <view class="i-alert-desc">
        <slot name="desc"></slot>
    </view>
    <view class="i-alert-close" v-if="closable" @tap="handleTap">
        <i-icon type="close"></i-icon>
    </view>
</view>
</template>

<script>
import iIcon from "../icon/index";

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      },
      closed: false
    };
  },

  components: {
    iIcon
  },
  props: {
    //info, success, warning, error
    type: {
      type: String,
      value: 'info'
    },
    closable: {
      type: Boolean,
      value: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTap() {
      this.setData({
        closed: !this.closed
      });
      this.$emit('close');
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