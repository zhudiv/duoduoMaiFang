<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="0" style="white-space: nowrap;">
		  <view  v-for="(item, index) of list" :key="index" wx:key @tap="tabSelect" :id="item.id" class="cu-item" :class="[item.id == id ? 'active' : 'noactive']">
		    {{item.name}}
		  </view>
		</scroll-view>
		
		
		<view class="margin-left margin-right"  style="margin-bottom: 120upx;margin-top: 44upx;margin-bottom: 24upx;border-bottom: 1upx solid #CCCCCC;">
					<view  v-for="(item,index) in goodsList" :key="index"  style="border-bottom: 2rpx solid #F0F1F3;" class="margin-top-sm" :data-id="item.id" @tap='goShoppingDetail(item.id)'>
						<view class="body" style="display: flex;">
							<view class="grace-margin" >
								<image :src="item.img" style="width: 200upx;height: 200upx;" mode="scaleToFill"></image>
							</view>
							<view style="margin-left: 20upx;">
								<view style="color: #333333;font-size: 28upx;font-weight: regular;">{{item.name}}</view>
								<view style="display: flex;align-items: center;">
									<image src="../../static/images/category/tag_vip_img.png" style="width: 60upx;height: 24upx;"></image>
									<text style="color: #294D7D;font-size: 28upx;font-weight: medium;">￥{{item.shopPrice}}</text>
								</view>
								<view style="color: #B3B3B3;font-size: 20upx;line-height: 28upx;font-weight: regular;text-decoration: line-through;">{{item.originalPrice}}</view>
								<view >
										<text style="color: #F55656;font-size: 16upx;line-height: 22upx;font-weight: regular;border: 1upx solid #F55656;">可用币{{item.linlibiDeduction}}</text>			
								</view>
							</view>
						</view>
						</view>
					</view>
		
				</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				selIndex:'0',
				pid:'',
				id:'',
				list:[],
				// list:[
				// 	{
				// 		name:'休闲零食',
				// 		index:0
				// 	},
				// 	{
				// 		name:'方面速食',
				// 		index:1
				// 	},
				// 	{
				// 		name:'糖果',
				// 		index:2
				// 	},
				// 	{
				// 		name:'酒',
				// 		index:3
				// 	},
				// 	{
				// 		name:'水',
				// 		index:4
				// 	},
				// 	{
				// 		name:'休闲零食',
				// 		index:5
				// 	},
				// 	{
				// 		name:'方面速食',
				// 		index:6
				// 	},
				// 	{
				// 		name:'糖果',
				// 		index:7
				// 	},
				// 	{
				// 		name:'酒',
				// 		index:8
				// 	},
				// 	{
				// 		name:'水',
				// 		index:9
				// 	}
				// ],
				goodsList:[]
				// goodsList:[
				// 	{
				// 		name:'法国进口红酒 卡伯纳小红鸟系列U+I干红葡萄酒13.5度750ml*6整箱',
				// 		pic:'http://fdd-ll.oss-cn-hangzhou.aliyuncs.com/Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg',
				// 		oldPrice:2800,
				// 		newPrice:3600,
				// 		coin:90,
				// 		id:'283910832'
				// 	},
				// 	{
				// 		name:'地平线8号（LEVEL8）行李箱拉杆箱 男女大容量托运箱28英寸PC箱',
				// 		pic:'http://fdd-ll.oss-cn-hangzhou.aliyuncs.com/Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg',
				// 		oldPrice:2800,
				// 		newPrice:3600,
				// 		coin:90,
				// 		id:'283910832'
				// 	}
				// ]
			}
		},
		
		onLoad(options) {
			console.log(options)
			// this.setTitle(options.title)
			this.pid = options.pid;
			this.id = options.id;
			this.getCategoryChild()
			
		},
		
			
		methods:{
			setTitle:function(title){
					
				wx.setNavigationBarTitle({
					title:title
				})
			},
			
			tabSelect:function(e){
				var that = this;
				console.log(e);
				console.log(e.currentTarget);
				that.id = e.currentTarget.id;
				that.getCategoryChildGoods(that.id);
			},
			
			goShoppingDetail:function(id){
				uni.navigateTo({
					url:'/pagesB/pages/productDetail/productDetail?id=' + id,
				})
			},
			
			getCategoryChild:function(){
				var that = this;
				that.$api.getCategoryChild({
						categoryId:this.pid
				}).then(res => {
					console.log(res);
					that.list = res.data;
				})
			},
			
			getCategoryChildGoods:function(id){
				var that = this;
				that.$api.getCategoryChildGoods({
						categoryId:id,
						pageNo:1,
						pageSize:100
				}).then(res => {
					console.log(res);
					that.goodsList = res.data.list;
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	
	.cu-item{
		font-size: 28upx;
		line-height: 40upx;
		font-weight: regular;
	}
	.noactive{
		color: #969799;

	}
	
	.active{
		color: #323233;
	}
</style>
