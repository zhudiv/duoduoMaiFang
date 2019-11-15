<template>
<i-cell-group class="i-class">
    <slot></slot>
</i-cell-group>
</template>

<script>
import iCellGroup from "../cell-group/index";

export default {
  data() {
    return {
      relations: {
        '../checkbox/index': {
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

  components: {
    iCellGroup
  },
  props: {
    current: {
      type: Array,
      value: [],
      observer: 'changeCurrent'
    }
  },
  methods: {
    changeCurrent(val = this.current) {
      let items = this.getRelationNodes('../checkbox/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeCurrent(val.indexOf(item.data.value) !== -1);
        });
      }
    },

    emitEvent(current) {
      this.$emit('change', current);
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
