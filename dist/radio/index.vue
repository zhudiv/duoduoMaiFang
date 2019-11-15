<template>
<view class="i-class i-radio" @click.stop="radioChange">
    <i-cell i-class="i-radio-cell">
        <label>
            <radio :value="value" :checked="checked" :color="(checked?color:'')" :disabled="disabled" :class="'i-radio-radio ' + positionCls"></radio>
            <view class="i-radio-title">{{value}}</view>
        </label>
    </i-cell>
</view>
</template>

<script>
const prefixCls = 'i-radio';
import iCell from "../cell/index";

export default {
  data() {
    return {
      relations: {
        '../radio-group/index': {
          type: 'parent'
        }
      },
      checked: true,
      positionCls: `${prefixCls}-radio-left`
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

    radioChange() {
      if (this.disabled) return;
      const item = {
        current: !this.checked,
        value: this.value
      };
      const parent = this.getRelationNodes('../radio-group/index')[0];
      parent ? parent.emitEvent(item) : this.$emit('change', item);
    },

    setPosition() {
      this.setData({
        positionCls: this.position.indexOf('left') !== -1 ? `${prefixCls}-radio-left` : `${prefixCls}-radio-right`
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