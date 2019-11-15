<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id"  class="f-item"  @click="tabtap(item)" style="height: 80upx;text-align: center;vertical-align: middle;">
				<view :class="{xuanzhong: item.id === currentId}">
					{{item.name}}
				</view>
				
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in flist" :key="item.id" class="s-list bg-white" :id="'main-'+item.id" style="border-radius: 20upx;margin:40upx 20upx 0 20upx;padding-top: 20upx;padding-bottom: 40upx;">
				<text style="text-align: center;color: #999999;font-size: 24upx;font-weight: regular;">——  {{item.name}}  ——</text>
<!-- 				<view class="t-list" style="display: flex;flex-wrap: wrap;justify-content: center;"> -->
					<!-- <view @click="navToList(item.id, titem.id)" v-for="sitem in slist" :key="sitem.id" v-if="titem.parentId === item.id" class="t-item" >
						<image :src="titem.picture"></image>
						<text>{{titem.name}}</text>
					</view> -->
					
					<view style="display: flex;width: 100%;flex-wrap: wrap;justify-content: space-between;align-content: center;align-items: center;">
						<view v-for="sitem in slist" :key="sitem.id" v-if="sitem.parentId === item.id" :data-id="sitem.id" :data-pid="sitem.parentId" style="width: 30%;display: inline-flex;flex-direction: column;align-items: center;" @tap="goategoryDetail">
							<image :src="sitem.img" style="width: 120upx;height: 120upx;display: block;margin-top: 26upx;"></image>
							<text style="color: #333333;font-size: 20upx;font-weight: regular;margin-top: 12upx;">{{sitem.name}}</text>
						</view>
						
					</view >
					
			<!-- 	</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
				// jsondata:[{"id":"0d30e792359f0292f40c002c54","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:19:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:19:59","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,455198aa56134ecaac29e4c4a6af29ce,","name":"4级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"70b7f66f3680065e8868d0c18c"},{"id":"22eebc4b3db37e768d0ba0bd12","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:05:03","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:36","parentIds":"0,","name":"酒水饮料","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","grade":5,"filterAttr":"","parentId":"0"},{"id":"455198ac3aac29e4c4a6af29ce","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:18:36","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:18:36","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,","name":"三级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b213db37e768d0ba0bd12"},{"id":"5ee4787e37bc963b04b2a0ad18","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:55:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:47","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"零食","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"2","showInNav":"1","type":"2","isShow":"0","grade":5,"filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"70b7f66f3680065e8868d0c18c","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:10","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:10","parentIds":"0,","name":"测试分类","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","filterAttr":"","parentId":"0"},{"id":"e507aff736a96ca9ab985b2f57","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:07:08","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:07:08","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"测试测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"e9f0a8c03d8735d61b679adb06","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:33","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:33","parentIds":"0,70b7f66dfa584ef680065e8868d0c18c,","name":"goods","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b213db37e768d0ba0bd12"},{"id":"0d30e79221359f0292f40c002c54","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:19:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:19:59","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,455198aa56134ecaac29e4c4a6af29ce,","name":"4级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"70b7f66f3680065e8868d0c18c"},{"id":"22eebc4b213db37e768d0ba0bd12","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:05:03","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:36","parentIds":"0,","name":"酒水饮料","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","grade":5,"filterAttr":"","parentId":"0"},{"id":"455198ac213aac29e4c4a6af29ce","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:18:36","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:18:36","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,","name":"三级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b213db37e768d0ba0bd12"},{"id":"5ee4787e2137bc963b04b2a0ad18","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:55:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:47","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"零食","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"2","showInNav":"1","type":"2","isShow":"0","grade":5,"filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"70b7f66f213680065e8868d0c18c","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:10","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:10","parentIds":"0,","name":"测试分类","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","filterAttr":"","parentId":"0"},{"id":"e507aff72136a96ca9ab985b2f57","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:07:08","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:07:08","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"测试测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"e9f0a8c0213d8735d61b679adb06","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:33","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:33","parentIds":"0,70b7f66dfa584ef680065e8868d0c18c,","name":"goods","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b213db37e768d0ba0bd12"},{"id":"0d30e79ad10d44259f0292f40c002c54","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:19:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:19:59","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,455198aa56134ecaac29e4c4a6af29ce,","name":"4级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"70b7f66f3680065e8868d0c18c"},{"id":"22eebc4cf2cb44bdb37e768d0ba0bd12","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:05:03","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:36","parentIds":"0,","name":"酒水饮料","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","grade":5,"filterAttr":"","parentId":"0"},{"id":"435babb95e864824bcb35cb4fd6b1a54","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-10 21:16:25","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-10 21:16:25","parentIds":"0,22eebc4b3db37e768d0ba0bd12,","name":"图片上传测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"455198aa56134ecaac29e4c4a6af29ce","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-06 20:18:36","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-06 20:18:36","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,e507aff78a734776a96ca9ab985b2f57,","name":"三级测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"70b7f66f3680065e8868d0c18c"},{"id":"5ee4787c5a6b4ce7bc963b04b2a0ad18","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-10-15 18:55:59","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-10-15 21:57:47","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"零食","sort":30,"hasChildren":false,"keywords":"关键字","catDesc":"描述","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"模板文件","measureUnit":"2","showInNav":"1","type":"2","isShow":"0","grade":5,"filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"70b7f66dfa584ef680065e8868d0c18c","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:10","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:10","parentIds":"0,","name":"测试分类","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"1","isShow":"1","filterAttr":"","parentId":"0"},{"id":"e507aff78a734776a96ca9ab985b2f57","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:07:08","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:07:08","parentIds":"0,22eebc4cf2cb44bdb37e768d0ba0bd12,","name":"测试测试","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b3db37e768d0ba0bd12"},{"id":"e9f0a8cc8b6c4d0d8735d61b679adb06","remarks":"","createBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"createDate":"2019-11-05 17:04:33","updateBy":{"id":"1","loginFlag":"1","idCard":"","admin":true,"roleNames":""},"updateDate":"2019-11-05 17:04:33","parentIds":"0,70b7f66dfa584ef680065e8868d0c18c,","name":"goods","sort":30,"hasChildren":false,"keywords":"","catDesc":"","img":"Neighborhood-service/base/llGoodCategory/2019/11/timg.jpg","templateFile":"","measureUnit":"1","showInNav":"1","type":"2","isShow":"1","filterAttr":"","parentId":"22eebc4b213db37e768d0ba0bd12"}]
			jsondata:[],
			}
		},
		onShow() {
			// let list = this.jsondata;
			// console.log(list)
			// list.forEach(item => {
			// 	console.log(item)
			// 	console.log(item.id)
			// 	console.log(item.type)
			// 	if(item.type === "1"){
			// 		this.flist.push(item)
			// 	}else if(item.type === "2"){
			// 		if(item.img){
			// 			item.img = 'http://fdd-ll.oss-cn-hangzhou.aliyuncs.com/' + item.img;
			// 		}
			// 		this.slist.push(item)
			// 	}else{
					
			// 	}
			// })
			
		},
		onLoad(){
			this.loadData();
			
		},
		methods: {
			async loadData(){
				// let list = await this.$api.json('cateList');
				// list.forEach(item=>{
				// 	if(!item.pid){
				// 		this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
				// 	}else if(!item.picture){
				// 		this.slist.push(item); //没有图的是2级分类
				// 	}else{
				// 		this.tlist.push(item); //3级分类
				// 	}
				// }) 
				this.$api.getCategory().then(res => {
					console.log(res)
					console.log(res.data.categoryList)
					this.jsondata = res.data.categoryList;
					this.dataExchange(res.data.categoryList);
				})
			},
			
			dataExchange:function(e){
				let list = this.jsondata;
				list.forEach(item => {
					// console.log(item)
					// console.log(item.id)
					// console.log(item.type)
					if(item.type === "1"){
						this.flist.push(item)
					}else if(item.type === "2"){
						this.slist.push(item)
					}else{
						
					}
				})
			},
			//一级分类点击
			tabtap(item){
				console.log('-------------tabtap-----------')
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem=>sitem.parentId === item.id);
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].parentId;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				console.log('1111111111111111111')
				let h = 0;
				this.slist.forEach(item=>{
					console.log(item)
					let view = uni.createSelectorQuery().select("#main-" + item.parentId);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				uni.navigateTo({
					url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
				})
			},
			
			goategoryDetail:function(e){
				console.log(e);
				console.log(e.currentTarget.dataset.id);
				console.log(e.currentTarget.dataset.pid);
				uni.navigateTo({
					url:'categoryDetail?id=' + e.currentTarget.dataset.id + '&pid=' + e.currentTarget.dataset.pid
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	
	.s-list{
		text-align: center;
	}
	
	.xuanzhong{
		background-color: #294D7D;
		color:#FFFFFF;
		border-radius: 60upx;
		width: 160upx;
		height: 52upx;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
		text-align: center;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: #333333;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		/* padding-left: 20upx; */
		flex-direction: column;
		align-items: center;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
