<template>
	<view class="navbar"  style="width: 100%;height: 600rpx;background-image: url(http://www.vvwed.com/static/llCimages/me_bg@2x.png);background-repeat:no-repeat; background-size:100% 100%;">
		<view :style="{height:statusBarHeight}">
			
		</view>
		<view class='title-container'>

			<view class='title'>我的</view>
		</view>

		<view style="background-color: rgba(255, 255, 255, 0.95);width: 93%;height: 400upx;margin: 36upx auto;border-radius: 20upx;text-align: center;padding-top: 22upx;" >
			<view>
				<image src="/static/images/my/me_head_ic@2x.png" style="width: 144upx;height: 144upx;" mode=""></image>
			</view>
			<view style="margin-top: 32upx;">
				<text style="color: #333333;font-size: 30upx;line-height: 42upx;">登录</text>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;padding-left: 40upx;padding-right: 40upx;">
				<view style="display: flex;flex-direction: column;align-items: center;">
						<view>
							<text class="infoText">0</text>
						</view>
						<view>
							<text class="infoText">所得邻里币(元)</text>
						</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
						<view>
							<text class="infoText">0</text>
						</view>
						<view>
							<text class="infoText">邻里币余额(元)</text>
						</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
						<view>
							<text class="infoText">0</text>
						</view>
						<view>
							<text class="infoText">共节省金额(元)</text>
						</view>
				</view>
				
			</view>
			
		</view>
	</view>

</template>

<script>
	export default {
		props: ['user'],
		data() {
			return {
				statusBarHeight: wx.getSystemInfoSync().statusBarHeight + 'px',
				navigationBarHeight: (wx.getSystemInfoSync().statusBarHeight + 44) + 'px',
				userInfo:this.user
			};
		},
		onLoad() {
		},
		onShow() {
		},
		methods:{
			goSetting:function(e){
				if(this.userInfo.storename == null || this.userInfo.storename == ''){
					uni.navigateTo({
						url:'/pagesA/pages/my/setting?status=' + this.userInfo.status
					})
				}else{
					uni.navigateTo({
						url:'/pagesA/pages/shopDetail/shopDetail?flag=' + 1 + '&id=' + this.userInfo.store_id
					})
				}
				
			}
		},
		watch:{
			user(newValue, oldValue) {
				this.userInfo = newValue

　　　　},
　　　　deep: true
		}
		
	}
</script>

<style>
.navbar {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
  color: white;
}

.title-container {
	height: 40px;
	display: flex;
	align-items: center;
	position: relative;
}

.info-container{
	height: 100rpx;
	display: flex;
}

.capsule {
	margin-left: 10px;
	height: 30px;
	background: rgba(255, 255, 255, 0.6);
	border: 1px solid #fff;
	border-radius: 16px;
	display: flex;
	align-items: center;
}

.capsule > view {
	width: 45px;
	height: 60%;
	position: relative;
}

.capsule > view:nth-child(2) {
	border-left: 1px solid #fff;
}

.capsule image {
	width: 50%;
	height: 100%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}

.title {
	color: #FFFFFF;
  font-weight: Regular;
  font-size: 37rpx;
  line-height: 52rpx;

	position: absolute;
	top: 6px;
	left: 104px;
	right: 104px;
	height: 30px;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
  /* font-weight: Bold; */
}

.infoText{
	font-size: 24upx;
	line-height: 34upx;
	color: #333333;
}
</style>
