// // API仓库，所有的API全部集中在这个文件里保存，方便日后修改

// //引入util里的request方法
import {
	get,
	post,
	upLoad,
	deletes
} from '../common/util'
module.exports = {
	// url: 'https://bear0625.cn/',
	//换取token
	getToken(params){
		return get('api/user/token', params)
	},
	// loginByOpenId 
	loginByOpenId(params) { //获取城市
		return post('api/user/loginByOpenId', params)
	},
	
	//获取用户openid
	getDetail(params){
		return post('api/user/getDetail', params)
	},
	
	
	//首页车位和邻里住宅入口
	getllBuildingProject(params){
		return get('api/llBuildingProject/data', params)
	},
	
	//获取项目的详情
	getllBuildingProjectForm(params){
		return get('api/llBuildingProject/form', params)
	},
	
	//兑换详情
	getGiftsExchange(params){
		return get('api/llGiftsExchange/save', params)
	},
	
	//业主超市首页
	getMarketData(params){
		return get('api/store/home', params)
	},
	
	//获取一级分类
	getCategory(params){
		return get('api/store/category', params)
	},
	
	//获取二级分类
	getCategoryChild(params){
		return get('api/store/category/child', params)
	},
	
	//获取分类下的商品列表
	getCategoryChildGoods(params){
		return get('api/store/category/goods', params)
	},
	
	//获取商品详细
	getBestGoods(params){
		return get('api/store/goods', params)
	}
	
}
