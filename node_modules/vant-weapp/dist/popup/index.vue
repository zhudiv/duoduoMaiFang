<template>
<view>
<van-overlay v-if="overlay" :show="show" :z-index="zIndex" :custom-style="overlayStyle" :duration="duration" @click="onClickOverlay"></van-overlay>
<view v-if="inited" :class="'custom-class ' + classes + ' ' + utils.bem('popup', [position, { round, safe: isIPhoneX && safeAreaInsetBottom }])" :style="'z-index: ' + zIndex + '; -webkit-transition-duration:' + currentDuration + 'ms; transition-duration:' + currentDuration + 'ms; ' + ( display ? '' : 'display: none;' ) + ' ' + ( safeAreaInsetTop ? 'padding-top: ' + statusBarHeight + 'px;' : '' ) + ' ' + customStyle" @transitionend="onTransitionEnd">
  <slot></slot>
  <van-icon v-if="closeable" :name="closeIcon" :class="'van-popup__close-icon van-popup__close-icon--' + closeIconPosition" @tap="onClickCloseIcon"></van-icon>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";
import vanOverlay from "../overlay/index";

export default {
  data() {
    return {
      props: {
        round: Boolean,
        closeable: Boolean,
        customStyle: String,
        overlayStyle: String,
        transition: {
          type: String,
          observer: 'observeClass'
        },
        zIndex: {
          type: Number,
          value: 100
        },
        overlay: {
          type: Boolean,
          value: true
        },
        closeIcon: {
          type: String,
          value: 'cross'
        },
        closeIconPosition: {
          type: String,
          value: 'top-right'
        },
        closeOnClickOverlay: {
          type: Boolean,
          value: true
        },
        position: {
          type: String,
          value: 'center',
          observer: 'observeClass'
        }
      }
    };
  },

  components: {
    vanIcon,
    vanOverlay
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    created() {
      this.observeClass();
    },

    onClickCloseIcon() {
      this.$emit('close');
    },

    onClickOverlay() {
      this.$emit('click-overlay');

      if (this.closeOnClickOverlay) {
        this.$emit('close');
      }
    },

    observeClass() {
      const {
        transition,
        position
      } = this;
      const updateData = {
        name: transition || position
      };

      if (transition === 'none') {
        updateData.duration = 0;
      }

      this.setData(updateData);
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