<template>
<view>


<form @submit="getInfo">
	<view class="cu-form-group margin-top">
		<view class="title">项目名</view>
		<view class="title" style="flex:1">{{projectName}}</view>
	</view>


  <view class="cu-form-group margin-top">
		<view class="title">地址选择</view>
		<picker mode="region" @change="RegionChange" :value="region" :custom-item="customItem">
			<view class="picker">
				{{region[0]}}，{{region[1]}}，{{region[2]}}
			</view>
		</picker>
	</view>
  <view class="cu-form-group">
		<view class="title">收货地址</view>
		<input placeholder="请输入您的具体位置" name="address"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">车位号</view>
		<input placeholder="(请输入车位）" name="num"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">身份证号</view>
		<input placeholder="请输入您的身份证" name="idCard"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">客户姓名</view>
		<input placeholder="请输入您的姓名" name="khname"></input>
	</view>
  <view class="cu-form-group">
		<view class="title">手机号码</view>
		<input placeholder="请输入您的手机号" name="phone"></input>
		<view class="cu-capsule radius">
			<view class="cu-tag bg-blue">
				+86
			</view>
			<view class="cu-tag line-blue">
				中国大陆
			</view>
		</view>
	</view>
  <view class="cu-form-group">
		<view class="title">验证码</view>
		<input placeholder="输入框带个按钮"></input>
		<button class="cu-btn bg-green shadow">验证码</button>
	</view>

  <button style="margin-top:60rpx;width:90%;background-color:#294D7D;color:white;z-index:10;border-radius:50rpx;" formType="submit">确定申请</button>
</form>
</view>
</template>

<script>
const api = require("../../configs/api.js");

export default {
  data() {
    return {
      region: ['浙江省', '宁波市', '鄞州区'],
      projectName: ''
    };
  },

  components: {},
  props: {},

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    that.projectName = getApp().globalData.projectInfo.name
    console.log(getApp().globalData.projectInfo.name);
    new (getApp().globalData.ToastPannel)();
  },
  methods: {
    RegionChange: function (e) {
      this.setData({
        region: e.detail.value
      });
    },
    getInfoBegin: function (e) {
      console.log('--------开始确认申请----------');
      var that = this;
			that.$api.getGiftsExchange({
				code: '1111',
				project: {
				  id: getApp().globalData.projectInfo.id
				},
				gifts: {
				  id: getApp().globalData.giftID
				},
				address: {
				  id: that.region[0] + that.region[1] + that.region[2]
				},
				addressDetail: e.detail.value.address,
				parkingCode: e.detail.value.num,
				ownerName: e.detail.value.khname,
				idCard: e.detail.value.idCard,
				phone: e.detail.value.phone,
				state: '1'
			}).then(res => {
				if(res.errCode == '0'){
					uni.showToast({
						title: '申请成功',
						duration: 2000,
						icon:'none'
					})
					uni.reLaunch({
						url:'/pages/index/index'
					})
				}else{
					uni.showToast({
						title: res.errMsg,
						duration: 2000,
						icon:'none'
					})
				}
				
			}).catch( res => {
				uni.showToast({
					title: '申请失败',
					duration: 2000,
					icon:'none'
				})
			})
			
      // api.get('llGiftsExchange/save', {
      //   code: '1111',
      //   project: {
      //     id: getApp().globalData.projectInfo.id
      //   },
      //   gifts: {
      //     id: getApp().globalData.gifts[0].id
      //   },
      //   address: {
      //     id: that.region[0] + that.region[1] + that.region[2]
      //   },
      //   addressDetail: e.detail.value.address,
      //   num: e.detail.value.num,
      //   name: e.detail.value.khname,
      //   idCard: e.detail.value.idCard,
      //   phone: e.detail.value.phone,
      //   state: '1'
      // }).then(res => {
      //   that.zdshowToast('申请成功，礼品即将发放给您', 2000);
      // }).catch(res => {
      //   that.zdshowToast('申请失败，请联系客服110', 2000);
      // });
    },
    // getInfo:function(e){
    //   var that = this;
    //   console.log('111111')
    //   console.log(e.detail.value.address)
    //   console.log(that.data.region[0] + that.data.region[1] + that.data.region[2])
    // },
    getInfo: function (e) {
      var that = this;
      console.log('11111111111111111');
      console.log(e.detail.value.address);

      if (!e.detail.value.address) {
        console.log('222222');
        that.zdshowToast('测试用，就看看有没输入详细地址', 2000);
        return;
      }

      that.getInfoBegin(e);
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
@import "./exchange.css";
</style>