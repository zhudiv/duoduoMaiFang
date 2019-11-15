<template>
<view :class="'i-class i-icon ' + ( type === '' ? '' : 'i-icon-' +  type ) + ' ' + custom" :style="'font-size: ' + size + 'px; ' + ( color ? 'color:' + color : '' )"></view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    type: {
      type: String,
      value: ''
    },
    custom: {
      type: String,
      value: ''
    },
    size: {
      type: Number,
      value: 14
    },
    color: {
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