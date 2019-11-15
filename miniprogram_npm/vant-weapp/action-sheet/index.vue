<template>
<view>
<van-popup :show="show" position="bottom" :z-index="zIndex" :overlay="overlay" custom-class="van-action-sheet" :safe-area-inset-bottom="safeAreaInsetBottom" :close-on-click-overlay="closeOnClickOverlay" @close="onClickOverlay">
  <view v-if="title" class="van-hairline--bottom van-action-sheet__header">
    {{ title }}
    <van-icon name="close" custom-class="van-action-sheet__close" @click="onClose"></van-icon>
  </view>
  <view v-if="actions && actions.length">
    <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
    <button v-for="(item, index) in actions" :key="index" :open-type="item.openType" :class="utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) + ' van-hairline--top ' + item.className || ''" hover-class="van-action-sheet__item--hover" :data-index="index" @tap="onSelect">
      <block v-if="!item.loading">
        {{ item.name }}
        <text v-if="item.subname" class="van-action-sheet__subname">{{ item.subname }}</text>
      </block>
      <van-loading v-else size="20px"></van-loading>
    </button>
  </view>
  <slot></slot>
  <view v-if="cancelText" class="van-action-sheet__cancel" hover-class="van-action-sheet__cancel--hover" hover-stay-time="70" @tap="onCancel">
    {{ cancelText }}
  </view>
</van-popup>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
import utils from '../wxs/utils.js'
import vanIcon from "../icon/index";
import vanPopup from "../popup/index";
import vanLoading from "../loading/index";

export default {
  data() {
    return {
      props: {
        show: Boolean,
        title: String,
        cancelText: String,
        zIndex: {
          type: Number,
          value: 100
        },
        actions: {
          type: Array,
          value: []
        },
        overlay: {
          type: Boolean,
          value: true
        },
        closeOnClickOverlay: {
          type: Boolean,
          value: true
        },
        closeOnClickAction: {
          type: Boolean,
          value: true
        }
      }
    };
  },

  components: {
    vanIcon,
    vanPopup,
    vanLoading
  },
  props: {},

  onLoad() {
    this.utils = utils;
  },

  methods: {
    onSelect(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const item = this.actions[index];

      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);

        if (this.closeOnClickAction) {
          this.onClose();
        }
      }
    },

    onCancel() {
      this.$emit('cancel');
    },

    onClose() {
      this.$emit('close');
    },

    onClickOverlay() {
      this.$emit('click-overlay');
      this.onClose();
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