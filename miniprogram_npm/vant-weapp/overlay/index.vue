<template>
<van-transition :show="show" custom-class="van-overlay" :custom-style="'z-index: ' + zIndex + '; ' + customStyle" :duration="duration" @tap="onClick" catch:touchmove="noop"></van-transition>
</template>

<script>
import { VantComponent } from '../common/component';
import vanTransition from "../transition/index";

export default {
  data() {
    return {
      props: {
        show: Boolean,
        customStyle: String,
        duration: {
          type: null,
          value: 300
        },
        zIndex: {
          type: Number,
          value: 1
        }
      }
    };
  },

  components: {
    vanTransition
  },
  props: {},
  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {},

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