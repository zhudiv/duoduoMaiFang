<template>
<view :class="'custom-class van-collapse ' + ( border ? 'van-hairline--top-bottom' : '' )">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      relation: {
        name: 'collapse-item',
        type: 'descendant',

        linked(child) {
          this.children.push(child);
        },

        unlinked(child) {
          this.children = this.children.filter(item => item !== child);
        }

      },
      props: {
        value: {
          type: null,
          observer: 'updateExpanded'
        },
        accordion: {
          type: Boolean,
          observer: 'updateExpanded'
        },
        border: {
          type: Boolean,
          value: true
        }
      }
    };
  },

  components: {},
  props: {},
  methods: {
    beforeCreate() {
      this.children = [];
    },

    updateExpanded() {
      this.children.forEach(child => {
        child.updateExpanded();
      });
    },

    switchFun(name, expanded) {
      const {
        accordion,
        value
      } = this;

      if (!accordion) {
        name = expanded ? (value || []).concat(name) : (value || []).filter(activeName => activeName !== name);
      } else {
        name = expanded ? name : '';
      }

      this.$emit('change', name);
      this.$emit('input', name);
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