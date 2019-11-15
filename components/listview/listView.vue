<template>
<view name="listView" style="border-bottom: 1upx solid #F8F8F8;">
	<!-- <view style="display:inline-block">
		<image class="imageView" mode="aspectFill" src="{{src}}"></image>
  </view>
	<view style="display:inline-block">
		<text>宁波湾·星钻</text>
	</view> -->

	<view class="flex  p-xs margin-bottom-sm mb-sm align-center">
      <!-- <view class="flex-sub bg-grey padding-sm margin-xs radius"> -->
			<view class="flex-sub radius">
				<image class="imageView" mode="aspectFill" :src="item.pic"></image>
			</view>
      <view class="flex-twice bg-white radius" style="padding-left: 18upx;">
				<view>
					<text class="text-black text-bold padding-xs">{{item.name}}</text>
				</view>
				
				<!-- <view>
					<view >
						<view class="cu-tag bg-cyan light z-icon">零首付</view>
						<view class="cu-tag bg-orange light z-icon">送邻里币</view>
    				<view class="cu-tag bg-pink light z-icon">家电大礼包</view>
					</view>
				</view> -->

				<view class="flex padding-xs justify-start">
						<!-- <view wx:if="{{nameBack}}" class="cu-tag bg-cyan light  z-icon">{{nameBack}}</view> -->
						<view v-if="item.tagIds" class="cu-tag bg-orange light  z-icon" style="padding: 4upx 14upx">{{item.tagIds}}</view>
    				<!-- <view wx:if="{{tag3}}" class="cu-tag bg-pink light  z-icon">{{tag3}}</view> -->
				</view>
				<view>
					<text class="text-price text-red padding-xs">{{item.price}}</text>
				</view>
			</view>
    </view>
</view>
</template>


	<script> 
		
		export default {
			name: "listView",
				
			props: {
				item:'',
			}
		}
	</script> 
									