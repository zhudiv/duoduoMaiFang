<template>
<view>
<view :class="'custom-class ' + ( border ? 'van-hairline--top-bottom' : '' ) + ' ' + utils.bem('tabbar', { fixed, safe: isIPhoneX && safeAreaInsetBottom })" :style="( zIndex ? 'z-index: ' + zIndex : '' )">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs/utils.js'

export default {
  data() {
    return {
      relation: {
        name: 'tabbar-item',
        type: 'descendant',

        linked(target) {
          this.children.push(target);
          target.parent = this;
          target.updateFromParent();
        },

        unlinked(target) {
          this.children = this.children.filter(item => item !== target);
          this.updateChildren();
        }

      },
      props: {
        active: {
          type: null,
          observer: 'updateChildren'
        },
        activeColor: {
          type: String,
          observer: 'updateChildren'
        },
        inactiveColor: {
          type: String,
          observer: 'updateChildren'
        },
        fixed: {
          type: Boolean,
          value: true
        },
        border: {
          type: Boolean,
          value: true
        },
        zIndex: {
          type: Number,
          value: 1
        }
      }
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    beforeCreate() {
      this.children = [];
    },

    updateChildren() {
      const {
        children
      } = this;

      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(children.map(child => child.updateFromParent()));
    },

    onChange(child) {
      const index = this.children.indexOf(child);
      const active = child.data.name || index;

      if (active !== this.active) {
        this.$emit('change', active);
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