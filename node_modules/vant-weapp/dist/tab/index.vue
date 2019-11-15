<template>
<view>
<view v-if="animated || inited" :class="'custom-class ' + utils.bem('tab__pane', { active, inactive: !active })" :style="( animated || active ? '' : 'display: none;' ) + ' ' + ( width ? 'width:' + width + 'px;' : '' )">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import utils from '../wxs/utils.js'

export default {
  data() {
    return {
      relation: {
        name: 'tabs',
        type: 'ancestor'
      },
      props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String
      },
      width: null,
      inited: false,
      active: false,
      animated: false
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    update() {
      const parent = this.getRelationNodes('../tabs/index')[0];

      if (parent) {
        parent.updateTabs();
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