<template>
<view class="i-class i-grid-item" :style="'width: ' + width"><slot></slot></view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../grid/index': {
          type: 'parent'
        },
        '../grid-icon/index': {
          type: 'child'
        }
      },
      width: '33.33%'
    };
  },

  components: {},
  props: {},
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