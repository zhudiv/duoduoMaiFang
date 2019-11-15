<template>
<view>
<view :class="'i-as-mask i-class-mask ' + ( visible ? 'i-as-mask-show' : '' )" @tap="handleClickMask"></view>
<view :class="'i-class i-as ' + ( visible ? 'i-as-show' : '' )">
    <view class="i-as-header i-class-header"><slot name="header"></slot></view>
    <view class="i-as-actions">
        <view class="i-as-action-item" v-for="(item, index) in actions" :key="index">
            <i-button @click="handleClickItem" :data-index="index" :open-type="item.openType" type="ghost" size="large" long>
                <view class="i-as-btn-loading" v-if="item.loading"></view>
                <i-icon v-if="item.icon" :type="item.icon" i-class="i-as-btn-icon"></i-icon>
                <view class="i-as-btn-text" :style="( item.color ? 'color: ' + item.color : '' )">{{ item.name }}</view>
            </i-button>
        </view>
    </view>
    <view class="i-as-cancel" v-if="showCancel">
        <i-button i-class="i-as-cancel-btn" type="ghost" size="large" long="true" @click="handleClickCancel">{{ cancelText }}</i-button>
    </view>
</view>
</view>
</template>

<script>
import iButton from "../button/index";
import iIcon from "../icon/index";

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      }
    };
  },

  components: {
    iButton,
    iIcon
  },
  props: {
    visible: {
      type: Boolean,
      value: false
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    actions: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleClickMask() {
      if (!this.maskClosable) return;
      this.handleClickCancel();
    },

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