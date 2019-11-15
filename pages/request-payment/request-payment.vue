<template>
<view>
<view class="container">
  <component is="head" title="'requestPayment'"></component>

  <view class="page-body">
    <view class="page-section">
      <view>支付金额</view>
      <view class="price">0.01</view>
      <view class="desc">实际接口应用中可自定义金额</view>
      <view class="btn-area">
        <button type="primary" @tap="requestPayment" :loading="loading">支付</button>
      </view>
    </view>
  </view>

  <component is="foot"></component>
</view>
</view>
</template>

<script>
//const paymentUrl = require('../../../../config').paymentUrl
const api = require("../../configs/api.js");

export default {
  data() {
    return {
      loading: false
    };
  },

  components: {},
  props: {},

  onShareAppMessage() {
    return {
      paymentUrl: '',
      title: '发起支付',
      path: 'page/API/pages/request-payment/request-payment'
    };
  },

  onLoad() {},

  methods: {
    requestPayment() {
      const self = this;
      self.setData({
        loading: true
      }); // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
      // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject

      getApp().globalData.getUserOpenId(function (err, openid) {
        api.require('apiName', {
          openid
        }).then(res => {
          console.log('unified order success, response is:', res);
          const payargs = res.data.payargs;
          wx.requestPayment({
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.package,
            signType: payargs.signType,
            paySign: payargs.paySign
          });
          self.setData({
            loading: false
          });
        }).catch(res => {
          console.log('err:', err);
          self.setData({
            loading: false
          });
        });
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
@import "./request-payment.css";
</style>