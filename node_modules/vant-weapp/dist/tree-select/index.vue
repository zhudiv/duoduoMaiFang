<template>
<view>
<view class="van-tree-select" :style="'height: ' + mainHeight + 'px'">
  <scroll-view scroll-y class="van-tree-select__nav">
    <view v-for="(item, index) in items" :key="index" :class="'van-ellipsis main-item-class ' + utils.bem('tree-select__nitem', { active: mainActiveIndex === index, disabled: item.disabled }) + ' ' + ( mainActiveIndex === index ? 'main-active-class' : '' ) + ' ' + ( item.disabled ? 'main-disabled-class' : '' )" :data-index="index" @tap="onClickNav">
      {{ item.text }}
    </view>
  </scroll-view>
  <scroll-view scroll-y class="van-tree-select__content" :style="'height: ' + itemHeight + 'px'">
    <slot name="content"></slot>
    <view v-for="(item, id) in subItems" :key="id" :class="'van-ellipsis van-hairline--bottom content-item-class ' + utils.bem('tree-select__item', { active: wxs.isActive(activeId, item.id), disabled: item.disabled }) + ' ' + ( wxs.isActive(activeId, item.id) ? 'content-active-class' : '' ) + ' ' + ( item.disabled ? 'content-disabled-class' : '' )" :data-item="item" @tap="onSelectItem">
      {{ item.text }}
      <van-icon v-if="wxs.isActive(activeId, item.id)" name="checked" size="16px" class="van-tree-select__selected"></van-icon>
    </view>
  </scroll-view>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
const ITEM_HEIGHT = 44;
import utils from '../wxs/utils.js'
import wxs from './index.js'
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      props: {
        items: Array,
        activeId: null,
        mainActiveIndex: {
          type: Number,
          value: 0
        },
        maxHeight: {
          type: Number,
          value: 300
        },
        max: {
          type: Number,
          value: Infinity
        }
      },
      subItems: [],
      mainHeight: 0,
      itemHeight: 0
    };
  },

  components: {
    vanIcon
  },
  props: {},

  onLoad() {
    this.wxs = wxs;
    this.utils = utils;
  },

  methods: {
    // 当一个子项被选择时
    onSelectItem(event) {
      const {
        item
      } = event.currentTarget.dataset;
      const isArray = Array.isArray(this.activeId); // 判断有没有超出右侧选择的最大数

      const isOverMax = isArray && this.activeId.length >= this.max; // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件

      const isSelected = isArray ? this.activeId.indexOf(item.id) > -1 : this.activeId === item.id;

      if (!item.disabled && (!isOverMax || isSelected)) {
        this.$emit('click-item', item);
      }
    },

    // 当一个导航被点击时
    onClickNav(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const item = this.items[index];

      if (!item.disabled) {
        this.$emit('click-nav', {
          index
        });
      }
    },

    // 更新子项列表
    updateSubItems() {
      const {
        items,
        mainActiveIndex
      } = this;
      const {
        children = []
      } = items[mainActiveIndex] || {};
      this.updateItemHeight(children);
      return this.set({
        subItems: children
      });
    },

    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight() {
      const {
        items = [],
        subItems = []
      } = this;
      const maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
      this.setData({
        mainHeight: Math.min(maxHeight, this.maxHeight)
      });
    },

    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight(subItems) {
      const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.maxHeight);
      return this.setData({
        itemHeight
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
    items() {
      this.updateSubItems().then(() => {
        this.updateMainHeight();
      });
    },

    maxHeight() {
      this.updateItemHeight(this.subItems);
      this.updateMainHeight();
    }

  }
};
</script>
<style>
@import "./index.css";
</style>