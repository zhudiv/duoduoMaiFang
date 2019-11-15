<template>
<view class="custom-class van-row" :style="style">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      relation: {
        name: 'col',
        type: 'descendant',

        linked(target) {
          if (this.gutter) {
            target.setGutter(this.gutter);
          }
        }

      },
      props: {
        gutter: Number
      },
      style: ""
    };
  },

  components: {},
  props: {},
  methods: {
    mounted() {
      if (this.gutter) {
        this.setGutter();
      }
    },

    setGutter() {
      const {
        gutter
      } = this;
      const margin = `-${Number(gutter) / 2}px`;
      const style = gutter ? `margin-right: ${margin}; margin-left: ${margin};` : '';
      this.setData({
        style
      });
      this.getRelationNodes('../col/index').forEach(col => {
        col.setGutter(this.gutter);
      });
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