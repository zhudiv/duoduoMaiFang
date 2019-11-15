<template>
<view :class="'i-class i-message i-message-' + type + ' ' + ( visible ? 'i-message-show' : '' )">
    {{ content }}
</view>
</template>

<script>
const default_data = {
  visible: false,
  content: '',
  duration: 2,
  type: 'default' // default || success || warning || error

};
let timmer = null;

export default {
  data() {
    return {
      type: "",
      duration: "",
      visible: false
    };
  },

  components: {},
  props: {},
  methods: {
    handleShow(options) {
      const {
        type = 'default',
        duration = 2
      } = options;
      this.setData({ ...options,
        type,
        duration,
        visible: true
      });
      const d = this.duration * 1000;
      if (timmer) clearTimeout(timmer);

      if (d !== 0) {
        timmer = setTimeout(() => {
          this.handleHide();
          timmer = null;
        }, d);
      }
    },

    handleHide() {
      this.setData({ ...default_data
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