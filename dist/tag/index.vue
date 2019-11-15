<template>
<view>
<view :class="'i-class i-tag ' + parse.getClass(color,type,checked,checkable) + ' ' + (checkable ? '' : 'i-tag-disable')" @tap="tapTag">
    <slot></slot>
</view>
</view>
</template>

<script>
import parse from './parse.js'

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    //slot name
    name: {
      type: String,
      value: ''
    },
    //can click or not click
    checkable: {
      type: Boolean,
      value: false
    },
    //is current choose
    checked: {
      type: Boolean,
      value: true
    },
    //background and color setting
    color: {
      type: String,
      value: 'default'
    },
    //control fill or not
    type: {
      type: String,
      value: 'dot'
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
    tapTag() {
      const data = this;

      if (data.checkable) {
        const checked = data.checked ? false : true;
        this.$emit('change', {
          name: data.name || '',
          checked: checked
        });
      }
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