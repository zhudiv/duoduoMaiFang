<template>
<view>
<view :class="'i-modal-mask i-class-mask ' + ( visible ? 'i-modal-mask-show' : '' )"></view>
<view :class="'i-class i-modal ' + ( visible ? 'i-modal-show' : '' )">
    <view class="i-modal-main">
        <view class="i-modal-content">
            <view class="i-modal-title" v-if="title">{{ title }}</view>
            <view class="i-modal-body"><slot></slot></view>
            <view class="i-modal-actions" v-if="actions.length">
                <block v-if="actionMode === 'horizontal'">
                    <i-grid i-class="i-modal-grid">
                        <i-grid-item :i-class="( actions.length === (index + 1) ? 'i-modal-grid-item-last' : 'i-modal-grid-item' )" v-for="(item, index) in actions" :key="index">
                            <component is="button" :item="item" :index="index"></component>
                        </i-grid-item>
                    </i-grid>
                </block>
                <block v-else>
                    <view class="i-modal-action-vertical" v-for="(item, index) in actions" :key="index">
                        <component is="button" :item="item" :index="index"></component>
                    </view>
                </block>
            </view>
            <view class="i-modal-actions" v-else>
                <i-grid i-class="i-modal-grid" v-if="showOk || showCancel">
                    <i-grid-item i-class="i-modal-grid-item" v-if="showCancel">
                        <i-button i-class="i-modal-btn-cancel" long type="ghost" @click="handleClickCancel">{{ cancelText }}</i-button>
                    </i-grid-item>
                    <i-grid-item i-class="i-modal-grid-item-last" v-if="showOk">
                        <i-button i-class="i-modal-btn-ok" long type="ghost" @click="handleClickOk">{{ okText }}</i-button>
                    </i-grid-item>
                </i-grid>
            </view>
        </view>
    </view>
</view>
</view>
</template>

<script>
import iGrid from "../grid/index";
import iGridItem from "../grid-item/index";
import iButton from "../button/index";
import iIcon from "../icon/index";

export default {
  data() {
    return {};
  },

  components: {
    iGrid,
    iGridItem,
    iButton,
    iIcon
  },
  props: {
    visible: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    showOk: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    okText: {
      type: String,
      value: '确定'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    // 按钮组，有此值时，不显示 ok 和 cancel 按钮
    actions: {
      type: Array,
      value: []
    },
    // horizontal || vertical
    actionMode: {
      type: String,
      value: 'horizontal'
    }
  },
  methods: {
    handleClickItem({
      currentTarget = {}
    }) {
      const dataset = currentTarget.dataset || {};
      const {
        index
      } = dataset;
      this.$emit('click', {
        index
      });
    },

    handleClickOk() {
      this.$emit('ok');
    },

    handleClickCancel() {
      this.$emit('cancel');
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