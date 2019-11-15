<template>
<view @tap="handleTap" :class="'i-class i-cell ' + ( isLastCell ? 'i-cell-last' : '' ) + ' ' + ( isLink ? 'i-cell-access' : '' )">
    <view class="i-cell-icon">
        <slot name="icon"></slot>
    </view>
    <view class="i-cell-bd">
        <view v-if="title" class="i-cell-text">{{ title }}</view>
        <view v-if="label" class="i-cell-desc">{{ label }}</view>
        <slot></slot>
    </view>
    <view @click.stop="navigateTo" class="i-cell-ft">
        <block v-if="value">{{ value }}</block>
        <block v-else>
            <slot name="footer"></slot>
        </block>
    </view>
</view>
</template>

<script>
const warn = (msg, getValue) => {
  console.warn(msg);
  console.log('接受到的值为：', getValue);
};

export default {
  data() {
    return {
      options: {
        multipleSlots: true
      },
      relations: {
        '../cell-group/index': {
          type: 'parent'
        }
      },
      isLastCell: true
    };
  },

  components: {},
  props: {
    // 左侧标题
    title: {
      type: String
    },
    // 标题下方的描述信息
    label: {
      type: String
    },
    // 右侧内容
    value: {
      type: String
    },
    // 只有点击 footer 区域才触发 tab 事件
    onlyTapFooter: {
      type: Boolean
    },
    // 是否展示右侧箭头并开启尝试以 url 跳转
    isLink: {
      type: null,
      value: ''
    },
    // 链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    url: {
      type: String,
      value: ''
    }
  },
  methods: {
    navigateTo() {
      const {
        url
      } = this;
      const type = typeof this.isLink;
      this.$emit('click', {});
      if (!this.isLink || !url || url === 'true' || url === 'false') return;

      if (type !== 'boolean' && type !== 'string') {
        warn('isLink 属性值必须是一个字符串或布尔值', this.isLink);
        return;
      }

      if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.linkType) === -1) {
        warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.linkType);
        return;
      }

      wx[this.linkType].call(wx, {
        url
      });
    },

    handleTap() {
      if (!this.onlyTapFooter) {
        this.navigateTo();
      }
    },

    updateIsLastCell(isLastCell) {
      this.setData({
        isLastCell
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