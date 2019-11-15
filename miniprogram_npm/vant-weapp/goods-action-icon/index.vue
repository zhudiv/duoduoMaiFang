<template>
<van-button square :id="id" size="large" :lang="lang" :loading="loading" :disabled="disabled" :open-type="openType" :business-id="businessId" custom-class="van-goods-action-icon" :session-from="sessionFrom" :app-parameter="appParameter" :send-message-img="sendMessageImg" :send-message-path="sendMessagePath" :show-message-card="showMessageCard" :send-message-title="sendMessageTitle" @click="onClick" @error="bindError" @contact="bindContact" @opensetting="bindOpenSetting" @getuserinfo="bindGetUserInfo" @getphonenumber="bindGetPhoneNumber" @launchapp="bindLaunchApp">
  <view class="van-goods-action-icon__content van-hairline--right">
    <van-icon v-if="icon" size="20px" :name="icon" :info="info" class="van-goods-action-icon__icon" custom-class="icon-class"></van-icon>
    <slot name="icon"></slot>
    <text class="text-class">{{ text }}</text>
  </view>
</van-button>
</template>

<script>
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import vanIcon from "../icon/index";
import vanButton from "../button/index";

export default {
  data() {
    return {
      props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
      }
    };
  },

  components: {
    vanIcon,
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