<template>
<view :class="'i-class i-cell i-input ' + ( error ? 'i-input-error' : '' ) + ' ' + ( mode === 'wrapped' ? 'i-input-wrapped' : '' )">
    <view v-if="title" class="i-cell-hd i-input-title">{{ title }}</view>
    <textarea v-if="type === 'textarea'" auto-height :disabled="disabled" :focus="autofocus" :value="value" :placeholder="placeholder" :maxlength="maxlength" :class="'i-input-input i-cell-bd ' + ( right ? 'i-input-input-right' : '' )" placeholder-class="i-input-placeholder" @input="handleInputChange" @focus="handleInputFocus" @blur="handleInputBlur"></textarea>
    <input v-else :type="type" :disabled="disabled" :focus="autofocus" :value="value" :placeholder="placeholder" :maxlength="maxlength" :class="'i-input-input i-cell-bd ' + ( right ? 'i-input-input-right' : '' )" placeholder-class="i-input-placeholder" @input="handleInputChange" @focus="handleInputFocus" @blur="handleInputBlur"></input>
</view>
</template>

<script>

export default {
  data() {
    return {
      value: ""
    };
  },

  components: {},
  props: {
    title: {
      type: String
    },
    // text || textarea || password || number
    type: {
      type: String,
      value: 'text'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    autofocus: {
      type: Boolean,
      value: false
    },
    mode: {
      type: String,
      value: 'normal'
    },
    right: {
      type: Boolean,
      value: false
    },
    error: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number
    }
  },
  methods: {
    handleInputChange(event) {
      const {
        detail = {}
      } = event;
      const {
        value = ''
      } = detail;
      this.setData({
        value
      });
      this.$emit('change', event);
    },

    handleInputFocus(event) {
      this.$emit('focus', event);
    },

    handleInputBlur(event) {
      this.$emit('blur', event);
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