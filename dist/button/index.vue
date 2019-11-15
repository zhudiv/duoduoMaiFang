<template>
<button :class="'i-class i-btn ' + ( long ? 'i-btn-long' : '' ) + ' ' + ( 'i-btn-' + size ) + ' ' + ( 'i-btn-' + type ) + ' ' + ( 'i-btn-' + shape ) + ' ' + ( loading ? 'i-btn-loading' : '' ) + ' ' + ( disabled ? 'i-btn-disabled' : '') + ' ' + ( inline ? 'i-btn-inline' : '' )" hover-class="i-btn-hover" @tap="handleTap" :open-type="openType" :app-parameter="appParameter" :hover-stop-propagation="hoverStopPropagation" :hover-start-time="hoverStartTime" :hover-stay-time="hoverStayTime" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" @contact="bindcontact" @getuserinfo="bindgetuserinfo" @getphonenumber="bindgetphonenumber" @error="binderror" plain="true"><view class="i-btn-loading-inner" v-if="loading"></view><slot></slot></button>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    // default, primary, ghost, info, success, warning, error
    type: {
      type: String,
      value: ''
    },
    inline: {
      type: Boolean,
      value: false
    },
    // default, large, small
    size: {
      type: String,
      value: ''
    },
    // circle, square
    shape: {
      type: String,
      value: 'square'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    long: {
      type: Boolean,
      value: false
    },
    openType: String,
    appParameter: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },
  methods: {
    handleTap() {
      if (this.disabled) return false;
      this.$emit('click');
    },

    bindgetuserinfo({
      detail = {}
    } = {}) {
      this.$emit('getuserinfo', detail);
    },

    bindcontact({
      detail = {}
    } = {}) {
      this.$emit('contact', detail);
    },

    bindgetphonenumber({
      detail = {}
    } = {}) {
      this.$emit('getphonenumber', detail);
    },

    binderror({
      detail = {}
    } = {}) {
      this.$emit('error', detail);
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