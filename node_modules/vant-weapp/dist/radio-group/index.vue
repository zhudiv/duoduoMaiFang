<template>
<slot></slot>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      relation: {
        name: 'radio',
        type: 'descendant',

        linked(target) {
          this.children = this.children || [];
          this.children.push(target);
          this.updateChild(target);
        },

        unlinked(target) {
          this.children = this.children.filter(child => child !== target);
        }

      },
      props: {
        value: {
          type: null,
          observer: 'updateChildren'
        },
        disabled: {
          type: Boolean,
          observer: 'updateChildren'
        }
      },
      value: "",
      disabled: ""
    };
  },

  components: {},
  props: {},
  methods: {
    updateChildren() {
      (this.children || []).forEach(child => this.updateChild(child));
    },

    updateChild(child) {
      const {
        value,
        disabled
      } = this;
      child.setData({
        value,
        disabled: disabled || child.data.disabled
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