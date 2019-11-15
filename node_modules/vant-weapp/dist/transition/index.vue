<template>
<view v-if="inited" :class="'van-transition custom-class ' + classes" :style="'-webkit-transition-duration:' + currentDuration + 'ms; transition-duration:' + currentDuration + 'ms; ' + ( display ? '' : 'display: none;' ) + ' ' + customStyle" @transitionend="onTransitionEnd">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';

export default {
  data() {
    return {};
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