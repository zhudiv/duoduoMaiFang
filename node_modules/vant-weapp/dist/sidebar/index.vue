<template>
<view class="van-sidebar van-hairline--top-bottom custom-class">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      relation: {
        name: 'sidebar-item',
        type: 'descendant',

        linked(target) {
          this.items.push(target);
          this.setActive(this.active);
        },

        unlinked(target) {
          this.items = this.items.filter(item => item !== target);
          this.setActive(this.active);
        }

      },
      props: {
        active: {
          type: Number,
          value: 0,
          observer: 'setActive'
        }
      }
    };
  },

  components: {},
  props: {},
  methods: {
    beforeCreate() {
      this.items = [];
      this.currentActive = -1;
    },

    setActive(active) {
      const {
        items,
        currentActive
      } = this;

      if (!items.length) {
        return Promise.resolve();
      }

      this.currentActive = active;
      const stack = [];

      if (currentActive !== active && items[currentActive]) {
        stack.push(items[currentActive].setActive(false));
      }

      if (items[active]) {
        stack.push(items[active].setActive(true));
      }

      return Promise.all(stack);
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