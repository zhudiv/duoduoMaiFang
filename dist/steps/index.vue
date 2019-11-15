<template>
<view class="i-class i-steps">
    <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../step/index': {
          type: 'child',

          linked() {
            this._updateDataChangeFun();
          },

          linkChanged() {
            this._updateDataChangeFun();
          },

          unlinked() {
            this._updateDataChangeFun();
          }

        }
      }
    };
  },

  components: {},
  props: {
    current: {
      type: Number,
      value: -1,
      observer: '_updateDataChange'
    },
    status: {
      type: String,
      //wait、process、finish、error
      value: ''
    },
    direction: {
      type: String,
      //value has horizontal or vertical 
      value: 'horizontal'
    }
  },
  methods: {
    _updateDataChangeFun() {
      let steps = this.getRelationNodes('../step/index');
      const len = steps.length;

      if (len > 0) {
        steps.forEach((step, index) => {
          step.updateDataChange({
            len: len,
            index: index,
            current: this.current,
            direction: this.direction
          });
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