<template>
<view :class="'i-class i-tab-bar ' + ( fixed ? 'i-tab-bar-fixed' : '' )">
    <slot></slot>
    <view class="i-tab-bar-list">
        <view class="i-tab-bar-layer" v-for="(item, index) in list" :key="index" :data-key="item.key" @tap="handleClickItem" :style="'width: ' + ( 100 / list.length ) + '%'"></view>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../tab-bar-item/index': {
          type: 'child',

          linked() {
            this.changeCurrent();
          },

          linkChanged() {
            this.changeCurrent();
          },

          unlinked() {
            this.changeCurrent();
          }

        }
      },
      list: []
    };
  },

  components: {},
  props: {
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    },
    color: {
      type: String,
      value: ''
    },
    fixed: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    changeCurrent(val = this.current) {
      let items = this.getRelationNodes('../tab-bar-item/index');
      const len = items.length;

      if (len > 0) {
        const list = [];
        items.forEach(item => {
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.color);
          list.push({
            key: item.data.key
          });
        });
        this.setData({
          list: list
        });
      }
    },

    emitEvent(key) {
      this.$emit('change', {
        key
      });
    },

    handleClickItem(e) {
      const key = e.currentTarget.dataset.key;
      this.emitEvent(key);
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