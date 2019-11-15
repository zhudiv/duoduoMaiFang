<template>
<view class="i-class i-slide" capture-catch:touchstart="handleTap2" capture-catch:touchmove="handleTap3">
    1111
    
</view>
</template>

<script>
import iButton from "../button/index";
import iIcon from "../icon/index";

export default {
  data() {
    return {
      options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
      }
    };
  },

  components: {
    iButton,
    iIcon
  },
  props: {},
  methods: {
    handleTap2() {
      console.log(event, 1111111);
    },

    handleTap3() {},

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
