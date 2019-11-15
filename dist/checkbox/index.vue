<template>
<view class="i-class i-checkbox" @click.stop="checkboxChange">
    <i-cell i-class="i-checkbox-cell">
        <label>
            <radio :value="value" :checked="checked" :color="(checked?color:'')" :disabled="disabled" :class="'i-checkbox-radio ' + positionCls"></radio>
            <view class="i-checkbox-title">{{value}}</view>
        </label>
    </i-cell>
</view>
</template>

<script>
const prefixCls = 'i-checkbox';
import iCell from "../cell/index";

export default {
  data() {
    return {
      relations: {
        '../checkbox-group/index': {
          type: 'parent'
        }
      },
      checked: true,
      positionCls: `${prefixCls}-checkbox-left`
    };
  },

  components: {
    iCell
  },
  props: {
    value: {
      type: String,
      value: ''
    },
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: '#2d8cf0'
    },
    position: {
      type: String,
      value: 'left',
      //left right
      observer: 'setPosition'
    }
  },
  methods: {
    attached() {
      this.setPosition();
    },

    changeCurrent(current) {
      this.setData({
        checked: current
      });
    },

    checkboxChange() {
      if (this.disabled) return;
      const item = {
        current: !this.checked,
        value: this.value
      };
      const parent = this.getRelationNodes('../checkbox-group/index')[0];
      parent ? parent.emitEvent(item) : this.$emit('change', item);
    },

    setPosition() {
      this.setData({
        positionCls: this.position.indexOf('left') !== -1 ? `${prefixCls}-checkbox-left` : `${prefixCls}-checkbox-right`
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