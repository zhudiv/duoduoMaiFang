<template>
<view :class="'i-class i-col ' + ( span ? 'i-col-span-' + span : '' ) + ' ' + ( offset ? 'i-col-offset-' + offset : '' )"><slot></slot></view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../row/index': {
          type: 'parent'
        }
      }
    };
  },

  components: {},
  props: {
    span: {
      value: 0,
      type: Number
    },
    offset: {
      value: 0,
      type: Number
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