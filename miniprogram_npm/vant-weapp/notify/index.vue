<template>
<van-transition name="slide-down" :show="showFun" :custom-class="'van-notify van-notify--' + type" :custom-style="'background:' + background + '; color: ' + color + '; z-index: ' + zIndex + ';'" @tap="onTap">
  <view v-if="safeAreaInsetTop" :style="'padding-top: ' + statusBarHeight + 'px'"></view>
  <text>{{ message }}</text>
</van-transition>
</template>

<script>
import { VantComponent } from '../common/component';
import { WHITE } from '../common/color';
import { safeArea } from '../mixins/safe-area';
import vanTransition from "../transition/index";

export default {
  data() {
    return {
      props: {
        message: String,
        background: String,
        type: {
          type: String,
          value: 'danger'
        },
        color: {
          type: String,
          value: WHITE
        },
        duration: {
          type: Number,
          value: 3000
        },
        zIndex: {
          type: Number,
          value: 110
        }
      },
      show: false
    };
  },

  components: {
    vanTransition
  },
  props: {},
  methods: {
    showFun() {
      const {
        duration,
        onOpened
      } = this;
      clearTimeout(this.timer);
      this.setData({
        show: true
      }, onOpened);

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      const {
        onClose
      } = this;
      clearTimeout(this.timer);
      this.setData({
        show: false
      }, onClose);
    },

    onTap(event) {
      const {
        onClick
      } = this;

      if (onClick) {
        onClick(event.detail);
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