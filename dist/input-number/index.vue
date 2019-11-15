<template>
<view :class="'i-class i-input-number i-input-number-size-' + size">
    <view :class="'i-input-number-minus ' + ( value <= min ? 'i-input-number-disabled' : '' )" :data-disabled="value <= min" @tap="handleMinus">-</view>
    <input :class="'i-input-number-text ' + ( min >= max ? 'i-input-number-disabled' : '' )" type="number" :value="value" :disabled="min >= max" @blur="handleBlur"></input>
    <view :class="'i-input-number-plus ' + ( value >= max ? 'i-input-number-disabled' : '' )" :data-disabled="value >= max" @tap="handlePlus">+</view>
</view>
</template>

<script>
function addNum(num1, num2) {
  let sq1, sq2, m;

  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }

  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }

  m = Math.pow(10, Math.max(sq1, sq2));
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    // small || default || large
    size: String,
    value: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: -Infinity
    },
    max: {
      type: Number,
      value: Infinity
    },
    step: {
      type: Number,
      value: 1
    }
  },
  methods: {
    handleChangeStep(e, type) {
      const {
        dataset = {}
      } = e.currentTarget;
      const {
        disabled
      } = dataset;
      const {
        step
      } = this;
      let {
        value
      } = this;
      if (disabled) return null;

      if (type === 'minus') {
        value = addNum(value, -step);
      } else if (type === 'plus') {
        value = addNum(value, step);
      }

      if (value < this.min || value > this.max) return null;
      this.handleEmit(value, type);
    },

    handleMinus(e) {
      this.handleChangeStep(e, 'minus');
    },

    handlePlus(e) {
      this.handleChangeStep(e, 'plus');
    },

    handleBlur(e) {
      let {
        value
      } = e.detail;
      const {
        min,
        max
      } = this;

      if (!value) {
        setTimeout(() => {
          this.handleEmit(value);
        }, 16);
        return;
      }

      value = +value;

      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.handleEmit(value);
    },

    handleEmit(value, type) {
      const data = {
        value: value
      };
      if (type) data.type = type;
      this.$emit('change', data);
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