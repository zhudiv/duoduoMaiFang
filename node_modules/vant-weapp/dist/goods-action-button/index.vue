<template>
<van-button square :id="id" size="large" :lang="lang" :type="type" :color="color" :loading="loading" :disabled="disabled" :open-type="openType" custom-class="custom-class" :business-id="businessId" :session-from="sessionFrom" :app-parameter="appParameter" :send-message-img="sendMessageImg" :send-message-path="sendMessagePath" :show-message-card="showMessageCard" :send-message-title="sendMessageTitle" @click="onClick" @error="bindError" @contact="bindContact" @opensetting="bindOpenSetting" @getuserinfo="bindGetUserInfo" @getphonenumber="bindGetPhoneNumber" @launchapp="bindLaunchApp">
  {{ text }}
</van-button>
</template>

<script>
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import vanButton from "../button/index";

export default {
  data() {
    return {
      props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
          type: String,
          value: 'danger'
        }
      }
    };
  },

  components: {
    vanButton
  },
  props: {},
  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
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