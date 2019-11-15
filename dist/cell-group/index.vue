<template>
<view class="i-class i-cell-group">
    <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../cell/index': {
          type: 'child',

          linked() {
            this._updateIsLastCellFun();
          },

          linkChanged() {
            this._updateIsLastCellFun();
          },

          unlinked() {
            this._updateIsLastCellFun();
          }

        }
      }
    };
  },

  components: {},
  props: {},
  methods: {
    _updateIsLastCellFun() {
      let cells = this.getRelationNodes('../cell/index');
      const len = cells.length;

      if (len > 0) {
        let lastIndex = len - 1;
        cells.forEach((cell, index) => {
          cell.updateIsLastCell(index === lastIndex);
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
