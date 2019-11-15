<template>
<view class="i-class i-tab-bar-item">
    <i-badge :dot="dot" :count="( dot ? 0 : count )">
        <view>
            <i-icon v-if="icon || currentIcon" :i-class="'i-tab-bar-item-icon ' + ( current ? 'item-index--i-tab-bar-item-icon-current' : '' )" :color="( current ? currentColor : '' )" :type="( current ? currentIcon : icon )" size="22"></i-icon>
            <image v-else class="i-tab-bar-item-img" :src="( current ? currentImg : img )"></image>
            <view :class="'i-tab-bar-item-title ' + ( current ? 'i-tab-bar-item-title-current' : '' )" v-if="current && currentColor" :style="'color: ' + currentColor">{{ title }}</view>
            <view :class="'i-tab-bar-item-title ' + ( current ? 'i-tab-bar-item-title-current' : '' )" v-else>{{ title }}</view>
        </view>
    </i-badge>
</view>
</template>

<script>
import iBadge from "../badge/index";
import iIcon from "../icon/index";

export default {
  data() {
    return {
      relations: {
        '../tab-bar/index': {
          type: 'parent'
        }
      },
      current: false,
      currentColor: ''
    };
  },

  components: {
    iBadge,
    iIcon
  },
  props: {
    icon: {
      type: String,
      value: ''
    },
    currentIcon: {
      type: String,
      value: ''
    },
    img: {
      type: String,
      value: ''
    },
    currentImg: {
      type: String,
      value: ''
    },
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

    handleClickItem() {
      const parent = this.getRelationNodes('../tab-bar/index')[0];
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