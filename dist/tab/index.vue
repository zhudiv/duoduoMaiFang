<template>
<view :class="'i-class i-tabs-tab ' + ( scroll ? 'i-tabs-tab-scroll' : '' ) + ' ' + ( current ? 'i-tabs-tab-current' : '' )">
    <i-badge :dot="dot" :count="( dot ? 0 : count )">
        <view @tap="handleClickItem">
            <view :class="'i-tabs-tab-title ' + ( current ? 'i-tabs-tab-title-current' : '' )" v-if="current && currentColor" :style="'color: ' + currentColor">{{ title }}</view>
            <view :class="'i-tabs-tab-title ' + ( current ? 'i-tabs-tab-title-current' : '' )" v-else>{{ title }}</view>
        </view>
    </i-badge>
    <view class="i-tabs-tab-bar" v-if="current" :style="'background: ' + currentColor"></view>
</view>
</template>

<script>
import iBadge from "../badge/index";

export default {
  data() {
    return {
      relations: {
        '../tabs/index': {
          type: 'parent'
        }
      },
      current: false,
      currentColor: '',
      scroll: false
    };
  },

  components: {
    iBadge
  },
  props: {
    key: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    dot: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },
  methods: {
    changeCurrent(current) {
      this.setData({
        current
      });
    },

    changeCurrentColor(currentColor) {
      this.setData({
        currentColor
      });
    },

    changeScroll(scroll) {
      this.setData({
        scroll
      });
    },

    handleClickItem() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      parent.emitEvent(this.key);
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