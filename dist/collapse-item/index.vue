<template>
<view :id="name" class="i-class i-collapse-item ">
    <view class="i-collapse-item-title-wrap" @tap="trigger">
        <i-icon size="16" type="enter" :i-class="( showContent ? 'i-collapse-item-arrow-show' : 'i-collapse-item-arrow' )"></i-icon>
        <text class="i-collapse-item-title i-class-title">{{title}}</text>
    </view>
    <view :class="'i-collapse-item-content ' + showContent + '  i-class-content'">
        <slot name="content"></slot>
    </view>
</view>
</template>

<script>
import iIcon from "../icon/index";

export default {
  data() {
    return {
      relations: {
        '../collapse/index': {
          type: 'parent',
          linked: function (target) {
            const options = {
              accordion: target.data.accordion
            };

            if (target.data.name === this.name) {
              options.showContent = 'i-collapse-item-show-content';
            }

            this.setData(options);
          }
        }
      },
      showContent: '',
      accordion: false,
      options: {
        multipleSlots: true
      }
    };
  },

  components: {
    iIcon
  },
  props: {
    title: String,
    name: String
  },
  methods: {
    trigger(e) {
      const data = this;

      if (data.accordion) {
        this.$emit('collapse', {
          name: data.name
        }, {
          composed: true,
          bubbles: true
        });
      } else {
        this.setData({
          showContent: data.showContent ? '' : 'i-collapse-item-show-content'
        });
      }
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