<template>
<view class="i-class i-grid"><slot></slot></view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../grid-item/index': {
          type: 'child',

          linked() {
            this.setGridItemWidth();
          },

          linkChanged() {
            this.setGridItemWidth();
          },

          unlinked() {
            this.setGridItemWidth();
          }

        }
      }
    };
  },

  components: {},
  props: {},
  methods: {
    setGridItemWidth() {
      const nodes = this.getRelationNodes('../grid-item/index'); // const len = nodes.length;
      // if (len < 3) {
      //     nodes.forEach(item => {
      //         item.setData({
      //             'width': '33.33%'
      //         });
      //     });
      // } else {
      //     const width = 100 / nodes.length;
      //     nodes.forEach(item => {
      //         item.setData({
      //             'width': width + '%'
      //         });
      //     });
      // }

      const width = 100 / nodes.length;
      nodes.forEach(item => {
        item.setData({
          'width': width + '%'
        });
      });
    },

    ready() {
      this.setGridItemWidth();
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