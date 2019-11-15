<template>
<view>
<view :class="'custom-class ' + utils.bem('slider', { disabled })" :style="( inactiveColor ? 'background:' + inactiveColor : '' )" @tap="onClick">
  <view class="van-slider__bar" :style="barStyle + '; ' + ( activeColor ? 'background:' + activeColor : '' )">
    <view class="van-slider__button-wrapper" @touchstart="onTouchStart" catch:touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
      <slot v-if="useButtonSlot" name="button"></slot>
      <view v-else class="van-slider__button"></view>
    </view>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { addUnit } from '../common/utils';
import utils from '../wxs/utils.js'

export default {
  data() {
    return {
      props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
          type: Number,
          value: 100
        },
        min: {
          type: Number,
          value: 0
        },
        step: {
          type: Number,
          value: 1
        },
        value: {
          type: Number,
          value: 0
        },
        barHeight: {
          type: null,
          value: '2px'
        }
      },
      value: "",
      barStyle: ""
    };
  },

  components: {},
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    created() {
      this.updateValue(this.value);
    },

    onTouchStart(event) {
      if (this.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = 'start';
    },

    onTouchMove(event) {
      if (this.disabled) return;

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      this.touchMove(event);
      this.dragStatus = 'draging';
      this.getRect('.van-slider').then(rect => {
        const diff = this.deltaX / rect.width * 100;
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      });
    },

    onTouchEnd() {
      if (this.disabled) return;

      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }
    },

    onClick(event) {
      if (this.disabled) return;
      const {
        min
      } = this;
      this.getRect('.van-slider').then(rect => {
        const value = (event.detail.x - rect.left) / rect.width * this.getRange() + min;
        this.updateValue(value, true);
      });
    },

    updateValue(value, end, drag) {
      value = this.format(value);
      const {
        barHeight,
        min
      } = this;
      const width = `${(value - min) * 100 / this.getRange()}%`;
      this.setData({
        value,
        barStyle: `width: ${width}; height: ${addUnit(barHeight)};`
      });

      if (drag) {
        this.$emit('drag', {
          value
        });
      }

      if (end) {
        this.$emit('change', value);
      }
    },

    getRange() {
      const {
        max,
        min
      } = this;
      return max - min;
    },

    format(value) {
      const {
        max,
        min,
        step
      } = this;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
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
  },
  watch: {
    value(value) {
      this.updateValue(value, false);
    }

  }
};
</script>
<style>
@import "./index.css";
</style>