<template>
<view class="i-sticky-item">
    <view :class="'i-sticky-item-header i-class ' + ( isFixed === true ? 'i-sticky-fixed' : '' )">
        <view class="i-sticky-title">
            <slot name="title"></slot>
        </view>
    </view>
    <view class="i-index-item-content">
        <slot name="content"></slot>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      },
      relations: {
        '../sticky/index': {
          type: 'parent'
        }
      },
      top: 0,
      height: 0,
      isFixed: false,
      index: -1
    };
  },

  components: {},
  props: {},
  methods: {
    updateScrollTopChange(scrollTop) {
      const data = this;
      const top = data.top;
      const height = data.height;
      this.setData({
        isFixed: scrollTop >= top && scrollTop < top + height ? true : false
      });
    },

    updateDataChange(index) {
      const className = '.i-sticky-item';
      const query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(res => {
        if (res) {
          this.setData({
            top: res.top,
            height: res.height,
            index: index
          });
        }
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