<template>
<view>
<view class="i-class i-rate" @touchmove="handleTouchMove">
    <input type="text" :name="name" wx:value="{{value}}" :value="value" class="i-rate-hide-input"></input>
    <view v-for="(item, index) in count" :key="index" :class="'i-rate-star ' + parse.getCurrent( value,index )" :data-index="index" @tap="handleClick">
        <i-icon type="collection_fill" :size="size"></i-icon>
    </view>
    <view class="i-rate-text" v-if="value !== 0"><slot></slot></view>
</view>
</view>
</template>

<script>
import parse from './parse.js'
import iIcon from "../icon/index";

export default {
  data() {
    return {
      touchesStart: {
        pageX: 0
      }
    };
  },

  components: {
    iIcon
  },
  props: {
    count: {
      type: Number,
      value: 5
    },
    value: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      value: false
    },
    size: {
      type: Number,
      value: 20
    },
    name: {
      type: String,
      value: ''
    }
  },

  beforeMount() {
    this.parse = parse;
  },

  methods: {
    handleClick(e) {
      const data = this;

      if (data.disabled) {
        return;
      }

      const index = e.currentTarget.dataset.index;
      this.$emit('change', {
        index: index + 1
      });
    },

    handleTouchMove(e) {
      const data = this;

      if (data.disabled) {
        return;
      }

      if (!e.changedTouches[0]) {
        return;
      }

      const movePageX = e.changedTouches[0].pageX;
      const space = movePageX - data.touchesStart.pageX;

      if (space <= 0) {
        return;
      }

      let setIndex = Math.ceil(space / data.size);
      setIndex = setIndex > data.count ? data.count : setIndex;
      this.$emit('change', {
        index: setIndex
      });
    },

    ready() {
      const className = '.i-rate';
      var query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(res => {
        this.touchesStart.pageX = res.left || 0;
      }).exec();
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