<template>
<view>
<scroll-view v-if="scroll" scroll-x="true" :class="'i-class i-tabs i-tabs-scroll ' + ( fixed ? 'i-tabs-fixed' : '' )"><slot></slot></scroll-view>
<view v-else :class="'i-class i-tabs ' + ( fixed ? 'i-tabs-fixed' : '' )"><slot></slot></view>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../tab/index': {
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
      }
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
    scroll: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    changeCurrent(val = this.current) {
      let items = this.getRelationNodes('../tab/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.scroll);
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.color);
        });
      }
    },

    emitEvent(key) {
      this.$emit('change', {
        key
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