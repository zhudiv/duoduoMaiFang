<template>
<view class="i-class i-collapse" @collapse="clickfn">
  <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../collapse-item/index': {
          type: 'child'
        }
      },
      showContent: ""
    };
  },

  components: {},
  props: {
    name: String,
    accordion: Boolean
  },
  methods: {
    clickfn(e) {
      const params = e.detail;
      const allList = this.getRelationNodes('../collapse-item/index');
      allList.forEach(item => {
        if (params.name === item.data.name) {
          item.setData({
            showContent: 'i-collapse-item-show-content'
          });
        } else {
          item.setData({
            showContent: ''
          });
        }
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
