<template>
<view class="van-circle">
  <canvas class="van-circle__canvas" :style="style" canvas-id="van-circle"></canvas>
  <view v-if="!text" class="van-circle__text">
    <slot></slot>
  </view>
  <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { isObj } from '../common/utils';
import { BLUE, WHITE } from '../common/color';
function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

export default {
  data() {
    return {
      props: {
        text: String,
        lineCap: {
          type: String,
          value: 'round'
        },
        value: {
          type: Number,
          value: 0,
          observer: 'reRender'
        },
        speed: {
          type: Number,
          value: 50
        },
        size: {
          type: Number,
          value: 100,
          observer: 'setStyle'
        },
        fill: String,
        layerColor: {
          type: String,
          value: WHITE
        },
        color: {
          type: [String, Object],
          value: BLUE,
          observer: 'setHoverColor'
        },
        strokeWidth: {
          type: Number,
          value: 4
        },
        clockwise: {
          type: Boolean,
          value: true
        }
      },
      style: 'width: 100px; height: 100px;',
      hoverColor: BLUE
    };
  },

  components: {},
  props: {},
  methods: {
    getContext() {
      if (!this.ctx) {
        this.ctx = wx.createCanvasContext('van-circle', this);
      }

      return this.ctx;
    },

    setHoverColor() {
      const context = this.getContext();
      const {
        color,
        size
      } = this;
      let hoverColor = color;

      if (isObj(color)) {
        const LinearColor = context.createLinearGradient(size, 0, 0, 0);
        Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map(key => LinearColor.addColorStop(parseFloat(key) / 100, color[key]));
        hoverColor = LinearColor;
      }

      this.setData({
        hoverColor
      });
    },

    setStyle() {
      const {
        size
      } = this;
      const style = `width: ${size}px; height: ${size}px;`;
      this.setData({
        style
      });
    },

    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const {
        strokeWidth,
        lineCap,
        clockwise,
        size
      } = this;
      const position = size / 2;
      const radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();

      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },

    renderLayerCircle(context) {
      const {
        layerColor,
        fill
      } = this;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },

    renderHoverCircle(context, formatValue) {
      const {
        clockwise,
        hoverColor
      } = this; // 结束角度

      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle);
    },

    drawCircle(currentValue) {
      const context = this.getContext();
      const {
        size
      } = this;
      context.clearRect(0, 0, size, size);
      this.renderLayerCircle(context);
      const formatValue = format(currentValue);

      if (formatValue !== 0) {
        this.renderHoverCircle(context, formatValue);
      }

      context.draw();
    },

    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const {
        value,
        speed
      } = this;

      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }

      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(() => {
        if (this.currentValue !== value) {
          if (this.currentValue < value) {
            this.currentValue += STEP;
          } else {
            this.currentValue -= STEP;
          }

          this.drawCircle(this.currentValue);
        } else {
          this.clearInterval();
        }
      }, 1000 / speed);
    },

    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },

    created() {
      const {
        value
      } = this;
      this.currentValue = value;
      this.drawCircle(value);
    },

    destroyed() {
      this.ctx = null;
      this.clearInterval();
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