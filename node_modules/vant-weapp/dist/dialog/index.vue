<template>
<van-popup :show="show" :z-index="zIndex" :overlay="overlay" :custom-class="'van-dialog ' + className" :transition="transition" :custom-style="customStyle" :close-on-click-overlay="closeOnClickOverlay" @close="onClickOverlay">
  <view v-if="title || useTitleSlot " :class="'van-dialog__header ' + ( message || useSlot ? '' : 'van-dialog--isolated' )">
    <slot v-if="useTitleSlot" name="title"></slot>
    <block v-else-if="title"> {{ title }}</block>
  </view>

  <slot v-if="useSlot"></slot>
  <view v-else-if="message" :class="'van-dialog__message ' + ( title ? 'van-dialog__message--has-title' : '' ) + ' ' + ( messageAlign ? 'van-dialog__message--' + messageAlign : '' )">
    <text class="van-dialog__message-text">{{ message }}</text>
  </view>

  <view class="van-hairline--top van-dialog__footer">
    <van-button v-if="showCancelButton" size="large" :loading="loading.cancel" class="van-dialog__button van-hairline--right" custom-class="van-dialog__cancel" :custom-style="'color: ' + cancelButtonColor" @click="onCancel">
      {{ cancelButtonText }}
    </van-button>
    <van-button v-if="showConfirmButton" size="large" class="van-dialog__button" :loading="loading.confirm" custom-class="van-dialog__confirm" :custom-style="'color: ' + confirmButtonColor" :open-type="confirmButtonOpenType" :lang="lang" :business-id="businessId" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" :app-parameter="appParameter" @click="onConfirm" @getuserinfo="bindGetUserInfo" @contact="bindContact" @getphonenumber="bindGetPhoneNumber" @error="bindError" @launchapp="bindLaunchApp" @opensetting="bindOpenSetting">
      {{ confirmButtonText }}
    </van-button>
  </view>
</van-popup>
</template>

<script>
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { GRAY, BLUE } from '../common/color';
import vanPopup from "../popup/index";
import vanButton from "../button/index";

export default {
  data() {
    return {
      props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        zIndex: {
          type: Number,
          value: 2000
        },
        confirmButtonText: {
          type: String,
          value: '确认'
        },
        cancelButtonText: {
          type: String,
          value: '取消'
        },
        confirmButtonColor: {
          type: String,
          value: BLUE
        },
        cancelButtonColor: {
          type: String,
          value: GRAY
        },
        showConfirmButton: {
          type: Boolean,
          value: true
        },
        overlay: {
          type: Boolean,
          value: true
        },
        transition: {
          type: String,
          value: 'scale'
        }
      },
      loading: {
        confirm: false,
        cancel: false
      },
      show: false
    };
  },

  components: {
    vanPopup,
    vanButton
  },
  props: {},
  methods: {
    onConfirm() {
      this.handleAction('confirm');
    },

    onCancel() {
      this.handleAction('cancel');
    },

    onClickOverlay() {
      this.onClose('overlay');
    },

    handleAction(action) {
      if (this.asyncClose) {
        this.setData({
          [`loading.${action}`]: true
        });
      }

      this.onClose(action);
    },

    close() {
      this.setData({
        show: false
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },

    onClose(action) {
      if (!this.asyncClose) {
        this.close();
      }

      this.$emit('close', action); // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

      this.$emit(action, {
        dialog: this
      });
      const callback = this[action === 'confirm' ? 'onConfirm' : 'onCancel'];

      if (callback) {
        callback(this);
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
  },
  watch: {
    show(show) {
      !show && this.stopLoading();
    }

  }
};
</script>
<style>
@import "./index.css";
</style>