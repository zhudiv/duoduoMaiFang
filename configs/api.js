var WxApiRoot = 'http://127.0.0.1:8080/a/api/';



function post(url, data){
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;
//test
    wx.checkSession({
      success: res => {
        console.log('没过期');
      },
      fail: res => {
        console.log('过期');
      }
    })  
    wx.request({
      url: WxApiRoot + url,
      data:postData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // POST请求
      },
      success: res => {
        console.log('--------后台返回的数据-------------');
        console.log(res);
        if (res.data.errCode === '0'){
          
          resolve(res.data);
        }else{
          if(res.data.errMsg){
            reject(res.data.errMsg);
          }else{
            reject('服务器异常，稍后再试');
          }
        }
      },
      error:function(e){
        reject('服务器异常，稍后再试');
      }
    })

  });
  return promise;
}


function get(url, data) {
  var promise = new Promise((resolve, reject) => {
    var that = this;
    var postData = data;

    wx.request({
      url: WxApiRoot + url,
      data: postData,

      success: res => {
        console.log('--------res-------------');
        console.log(res);
        if (res.data.errCode === '0') {
          resolve(res.data.rows);
        } else if (res.data.errMsg) {
          reject(res.data.errMsg);
        } else {
          reject('服务器异常，稍后再试');
        }
      
    },
      error: function (e) {
        reject('服务器异常，稍后再试');
      }
    })

  });
  return promise;
}

module.exports = {
  getDetail: WxApiRoot + 'getDetail',
  // loginByOpenId: WxApiRoot + 'loginByOpenId',
  post: post,
  get:get
}