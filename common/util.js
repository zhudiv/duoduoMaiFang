// var baseUrl = 'http://192.168.0.184:8080/a/' //定义域名+端口号+公共路径
// var baseUrl = 'http://192.168.0.131:8080/a/' //李修武测试
var baseUrl = 'https://www.0l5l.com:8080/a/'
var baseUrlNo = 'https://bear0625.cn/api' //定义域名+端口号+公共路径  去掉了最后一个/,和微信图片接口拼接用

// var baseUrl='/addons/hszy_zyfc/source/public/index.php/api/'


// 转换时间格式
var friendlyDate = function(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

// 封装get请求
var get = function(url, params = {},contenType="",method=""){ 
	url = baseUrl + url
	// var uniacid=87;
	// params.uniacid = uniacid;
	var token=uni.getStorageSync('token');
	params.token = token;
	return new Promise(function (resolve, reject) {//promise函数，具体自行百度，一两句话说不清楚
		// 网络请求发起前，显示加载动画
		uni.showLoading({
			title: '加载中'
		});
		// 发起网络请求
		uni.request({
			url: url, //网络请求的url（接口地址）
			data: params,//网络请求的参数
			method:method === "PUT" ? "PUT":"GET",//网络请求的类型
			header:contenType === "json" ? {'content-type':'application/json'} : {'content-type':'application/x-www-form-urlencoded'},
			success: function (res) {//网络请求成功的回调函数
				resolve(res.data)
			},
			fail: err => {//网络请求失败的回调
				if (err.errMsg === "request:fail timeout"){//这里判断一个超时的情况，不是超时，统一提示数据获取失败
					uni.showToast({
						title: '请求超时',
						duration: 2000,
						icon:'none'
					});
				}else{
					uni.showToast({
						title: '获取数据失败',
						duration: 2000,
						icon:'none'
					});
				reject(err)
				}  
			},
			complete:res=>{//不管是失败还是成功都会执行的回调
				uni.hideLoading(); //隐藏加载动画
			}
		});
	})
}

// 封装deletes请求
var deletes = function(url, params = {},contenType=""){ 
	url = baseUrl + url
	return new Promise(function (resolve, reject) {//promise函数，具体自行百度，一两句话说不清楚
		// 网络请求发起前，显示加载动画
		uni.showLoading({
			title: '加载中'
		});
		// 发起网络请求
		uni.request({
			url: url, //网络请求的url（接口地址）
			data: params,//网络请求的参数
			method:"delete",//网络请求的类型
			header:contenType === "json" ? {'content-type':'application/json'} : {'content-type':'application/x-www-form-urlencoded'},
			success: function (res) {//网络请求成功的回调函数
				if (res.statusCode == 200) { //网络请求状态码，200表示接通，可进行数据操作
					resolve(res.data)
				} else {					//否则展示对应的网络请求状态码，如500，404等等
					uni.showToast({
						title:res.statusCode,
						duration:500
					})
				}
		
			},
			fail: err => {//网络请求失败的回调
				if (err.errMsg === "request:fail timeout"){//这里判断一个超时的情况，不是超时，统一提示数据获取失败
					uni.showToast({
						title: '请求超时',
						duration: 2000,
						icon:'none'
					});
				}else{
					uni.showToast({
						title: '获取数据失败',
						duration: 2000,
						icon:'none'
					});
				reject(err)
				}  
			},
			complete:res=>{//不管是失败还是成功都会执行的回调
				uni.hideLoading(); //隐藏加载动画
			}
		});
	})
}

// 封装post请求
var post = function(url, params = {},contenType = ""){ 
	url = baseUrl + url
	var uniacid=87;
	params.uniacid = uniacid;
	return new Promise(function (resolve, reject) {//promise函数，具体自行百度，一两句话说不清楚
		// 网络请求发起前，显示加载动画
		uni.showLoading({
			title: '加载中'
		});
		// 发起网络请求
		uni.request({
			url: url, //网络请求的url（接口地址）
			data: params,//网络请求的参数
			method:"POST",//网络请求的类型，其实这里也可以写变量，来指定不同请求类型
			//传入“json”这个字符串就是json请求头，否则是form请求头，这里甚至可以写“四元运算添加更多请求头”
			header:contenType === "json" ? {'content-type':'application/json'} : {'content-type':'application/x-www-form-urlencoded'},
			success: function (res) {//网络请求成功的回调函数
					resolve(res.data)	
			},
			fail: err => {//网络请求失败的回调
				if (err.errMsg === "request:fail timeout"){//这里判断一个超时的情况，不是超时，统一提示数据获取失败
					uni.showToast({
						title: '请求超时',
						duration: 2000,
						icon:'none'
					});
				}else{
					uni.showToast({
						title: '获取数据失败',
						duration: 2000,
						icon:'none'
					});
				reject(err)
				}  
			},
			complete:res=>{//不管是失败还是成功都会执行的回调
				uni.hideLoading(); //隐藏加载动画
			}
		});
	})
}

//封装图片上传
var upLoad = function(url,img,params={}){
	url = baseUrl + url
	return new Promise(function (resolve, reject) {//promise函数，具体自行百度，一两句话说不清楚
		// 网络请求发起前，显示加载动画
		uni.showLoading({
			title: '加载中'
		});
		// 发起网络请求
		uni.uploadFile({
			url: url, 
			filePath: img,
			name: 'file',
			header:{"Content-Type": "multipart/form-data"},
			formData: params,

		});
	})
}

// 封装navigateTo跳转
var navigateTo = function(url){
	uni.navigateTo({
		url:url
	})
}

//封装跳转（销毁前一个页面，无法返回）
var redirectTo = function(url){
	uni.redirectTo({
		url:url
	})
}

// 封装switchTab跳转
var switchTab = function(url){
	uni.switchTab({
		url:url
	})
}

//封装navigateBack返回
var navigateBack = function(delta=Number){
	uni.navigateBack({
		delta:delta
	})
}


// 封装uni.showModal为alert
var alert = function(msg="",confirm,cancel){ //mgs是提示的内容，字符串格式；confirm,cancel要传入函数
	uni.showModal({
		title:'提示',	//title我定义死了，如果不想叫“提示”或者自定义，可以在上面加入title变量，并在这里写入title变量
		content:msg,	//提示的内容
		showCancel:cancel ? true : false,//是否显示取消按钮，如果没有传入点击取消按钮的回调函数，则不显示，否则显示
		success:res=>{
			if(res.confirm){ //如果用户点击了确定按钮
				if(confirm){ //如果confirm函数不为空，则执行该函数
					confirm()
				}
			}
			if(res.cancel){//如果用户点击了取消按钮
				if(cancel){//如果cancel函数不为空，则执行该函数
					cancel()
				}
			}
		}
	})
}

var formatTime = function(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
  
	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()
  
  
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
 var formatData = function(date) {
	 var year = date.getFullYear()
	 var month = date.getMonth() + 1
	 var day = date.getDate()
	 
	 return [year, month, day].map(formatNumber).join('')
 }
  
var formatNumber =  function(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
  }

var showToast = function(msg="",icon=""){
	uni.showToast({
		title: msg,
		duration: 2000,
		icon:icon
	});
}


module.exports = {
	formatTime,
	formatData,
	friendlyDate,
	get,
	post,
	deletes,
	baseUrl,
	baseUrlNo,
	alert,
	navigateTo,
	redirectTo,
	showToast,
	switchTab,
	upLoad,
	navigateBack
}
