<template>
<view>
<view :class="'i-class i-step-item ' + parse.getClass(status,current,index) + ' ' + ( direction === 'vertical' ? 'i-step-vertical' : 'i-step-horizontal' )" :style="parse.getItemStyle(len,direction)">
    <view class="i-step-item-ico">
        <view class="i-step-ico" v-if="parse.noIco(status,current,index,icon) ">{{ index+1 }}</view>
        <view class="i-step-ico" v-else>
            <i-icon i-class="i-step-ico-in" :type="parse.getIcoClass(status,icon)"></i-icon>
        </view>
        <view class="i-step-line" v-if="index !== len - 1"></view>
    </view>
    <view class="i-step-item-main">
        <view class="i-step-item-title" v-if="title !== ''">
            {{title}}
        </view>
        <view class="i-step-item-title" v-else>
            <slot name="title"></slot>
        </view>
        <view class="i-step-item-content" v-if="content !== ''">
            {{content}}
        </view>
        <view class="i-step-item-content" v-else>
            <slot name="content"></slot>
        </view>
    </view>
</view>
</view>
</template>

<script>
import parse from './parse.js'
import iIcon from "../icon/index";

export default {
  data() {
    return {
      options: {
        // 在组件定义时的选项中启用多slot支持
        multipleSlots: true
      },
      relations: {
        '../steps/index': {
          type: 'parent'
        }
      },
      //step length
      len: 1,
      //current in step index
      index: 0,
      //parent component select current index
      current: 0,
      //css direction
      direction: 'horizontal'
    };
  },

  components: {
    iIcon
  },
  props: {
    status: {
      type: String,
      //wait、process、finish、error
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
    updateDataChange(options) {
      this.setData({
        len: options.len,
        index: options.index,
        current: options.current,
        direction: options.direction
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
  }
};
</script>
<style>
@import "./index.css";
</style>