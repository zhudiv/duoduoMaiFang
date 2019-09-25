/**
 * 用户相关服务
 */
const util = require('../utils/util.js')
const api = require('../configs/api.js');

/**
 * Promise封装wx.checkSession
 */
function checkSession(){
  return new Promise(function(resolve, reject){
    wx.checkSession({
      success:function(){
        resolve(true);
      },
      fail:function(){
        reject(false);
      }
    })
  });
}

/**
 * Promise封装wx.login
 */
function login(){
  console.log('login:')
  return new Promise(function(resolve, reject){
    wx.login({
      success:function(res){
        if(res.code){
          resolve(res);
        }else{
          reject(res);
        }
      },
      fail:function(err){
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登入
 */
function loginByWeixin(userInfo){
  console.log('loginByWeixin:' + userInfo);
  console.dir(userInfo);
  return new Promise(function(resolve, reject){
    return login().then((res) => {
      //登录远程服务器
      util.request(api.AuthLoginByWeixin,
      {
        code:res.code,
        userInfo:userInfo
      }, "POST").then(res => {
        if(res.errNo === 0){
          //存储用户信息
          console.log(res);
          wx.setStorageSync('userInfo', res.data);
          // wx.setStorageSync('token', res.data.token);
          resolve(res);
        } else {
          reject(res);
        }
        }).catch((err) => {
          reject(err);
        });
    }).catch((err) => {
      reject(err);
    })
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin(){
  return new Promise(function(resolve, reject){
    console.log('---------user.js------------')
    if (wx.getStorageSync('userInfo')){
      wx.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false)
      });
    }else{
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin
}