<template>
<view class="i-sticky i-class">
    <slot></slot>
</view>
</template>

<script>

export default {
  data() {
    return {
      relations: {
        '../sticky-item/index': {
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
      },
      timer: null,
      itemLength: 0
    };
  },

  components: {},
  props: {
    scrollTop: {
      type: Number,

      observer(val) {
        this._updateScrollTopChangeFun();
      }

    }
  },
  methods: {
    _updateScrollTopChangeFun() {
      const stickies = this.getRelationNodes('../sticky-item/index');

      if (stickies.length > 0) {
        stickies.forEach(item => {
          if (item) {
            item.updateScrollTopChange(this.scrollTop);
          }
        });
      }
    },

    _updateDataChangeFun() {
      const stickies = this.getRelationNodes('../sticky-item/index');

      if (stickies.length > 0) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.setData({
            timer: null
          });
        }

        this.timer = setTimeout(() => {
          stickies.forEach((item, index) => {
            if (item) {
              item.updateDataChange(index);
            }
          });
        }, 0);
        this.setData({
          timer: this.timer
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
