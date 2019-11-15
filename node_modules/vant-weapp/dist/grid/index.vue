<template>
<view :class="'van-grid ' + ( border && !gutter ? 'van-hairline--top' : '' )" :style="style">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      relation: {
        name: 'grid-item',
        type: 'descendant',

        linked(child) {
          this.children.push(child);
        },

        unlinked(child) {
          this.children = this.children.filter(item => item !== child);
        }

      },
      props: {
        square: {
          type: Boolean,
          observer: 'updateChildren'
        },
        gutter: {
          type: [Number, String],
          value: 0,
          observer: 'updateChildren'
        },
        clickable: {
          type: Boolean,
          observer: 'updateChildren'
        },
        columnNum: {
          type: Number,
          value: 4,
          observer: 'updateChildren'
        },
        center: {
          type: Boolean,
          value: true,
          observer: 'updateChildren'
        },
        border: {
          type: Boolean,
          value: true,
          observer: 'updateChildren'
        }
      },
      style: ""
    };
  },

  components: {},
  props: {},
  methods: {
    beforeCreate() {
      this.children = [];
    },

    created() {
      const {
        gutter
      } = this;

      if (gutter) {
        this.setData({
          style: `padding-left: ${gutter}px`
        });
      }
    },

    updateChildren() {
      this.children.forEach(child => {
        child.updateStyle();
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