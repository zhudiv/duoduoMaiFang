<template>
<view>
<view class="van-rate custom-class" @touchmove="onTouchMove">
  <view class="van-rate__item" v-for="(item, index) in count" :key="index" :style="'font-size: ' + sizeWithUnit + ';padding-right: ' + ( index !== count - 1 ? gutterWithUnit : '' )">
    <van-icon :name="( index + 1 <= innerValue ? icon : voidIcon )" class="van-rate__icon" custom-class="icon-class" :data-score="index" :color="( disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor )" @click="onSelect"></van-icon>

    <van-icon v-if="allowHalf" :name="( index + 0.5 <= innerValue ? icon : voidIcon )" :class="utils.bem('rate__icon', ['half'])" custom-class="icon-class" :data-score="( index - 0.5 )" :color="( disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor )" @click="onSelect"></van-icon>
  </view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
          type: null,
          observer: 'setSizeWithUnit'
        },
        icon: {
          type: String,
          value: 'star'
        },
        voidIcon: {
          type: String,
          value: 'star-o'
        },
        color: {
          type: String,
          value: '#ffd21e'
        },
        voidColor: {
          type: String,
          value: '#c7c7c7'
        },
        disabledColor: {
          type: String,
          value: '#bdbdbd'
        },
        count: {
          type: Number,
          value: 5
        },
        gutter: {
          type: null,
          observer: 'setGutterWithUnit'
        },
        touchable: {
          type: Boolean,
          value: true
        }
      },
      innerValue: 0,
      gutterWithUnit: undefined,
      sizeWithUnit: '20px'
    };
  },

  components: {
    vanIcon
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    setSizeWithUnit(val) {
      this.setData({
        sizeWithUnit: addUnit(val)
      });
    },

    setGutterWithUnit(val) {
      this.setData({
        gutterWithUnit: addUnit(val)
      });
    },

    onSelect(event) {
      const {
        data
      } = this;
      const {
        score
      } = event.currentTarget.dataset;

      if (!data.disabled && !data.readonly) {
        this.setData({
          innerValue: score + 1
        });
        this.$emit('input', score + 1);
        this.$emit('change', score + 1);
      }
    },

    onTouchMove(event) {
      const {
        touchable
      } = this;
      if (!touchable) return;
      const {
        clientX,
        clientY
      } = event.touches[0];
      this.getRect('.van-rate__icon', true).then(list => {
        const target = list.sort(item => item.right - item.left).find(item => clientX >= item.left && clientX <= item.right && clientY >= item.top && clientY <= item.bottom);

        if (target != null) {
          this.onSelect(Object.assign(Object.assign({}, event), {
            currentTarget: target
          }));
        }
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
  },
  watch: {
    value(value) {
      if (value !== this.innerValue) {
        this.setData({
          innerValue: value
        });
      }
    }

  }
};
</script>
<style>
@import "./index.css";
</style>