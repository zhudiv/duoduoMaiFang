//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Movies: [
      { 
        Url:'/images/lunbo1.png',
        Picture: '/images/lunbo1.png'
      },
      {
        Url: '/images/lunbo2.png',
        Picture: '/images/lunbo2.png'
      },
      {
        Url: '/images/lunbo3.png',
        Picture: '/images/lunbo3.png'
      },
      ], //轮播图

    CountDown:{
      day:"02",
      minutes:"04",
      seconds:"03"
    },

    Shoppings:[
      {
        src:'../../images/shopping1.jpg',
        hdcpName:'美的电饭煲',
        hdPrice:'299',
        hdhyPrice:'299',
        discountCoupon:'可用券99'
      },
      {
        src: '../../images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      },
      {
        src: '../../images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      },
      {
        src: '../../images/shopping1.jpg',
        hdcpName: '美的电饭煲',
        hdPrice: '299',
        hdhyPrice: '299',
        discountCoupon: '可用券99'
      },
      {
        src: '../../images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      },
      {
        src: '../../images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      },
      {
        src: '../../images/shopping1.jpg',
        hdcpName: '美的电饭煲',
        hdPrice: '299',
        hdhyPrice: '299',
        discountCoupon: '可用券99'
      },
      {
        src: '../../images/shopping2.jpg',
        hdcpName: '小米洗烘一体机',
        hdPrice: '2999',
        hdhyPrice: '2499',
        discountCoupon: '可用券300'
      },
      {
        src: '../../images/shopping3.jpg',
        hdcpName: '三星全面屏电视 ',
        hdPrice: '3899',
        hdhyPrice: '1999',
        discountCoupon: '可用券500'
      }
    ],

    navbar:["车位", "住宅"],
    currentNavbar: '0',

    carList:[
      {
        src:'../../images/cars1.jpg',
        carInfo_name:'宁波湾·星钻',
        carInfo_detail1:'零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price:'10000-20000'
      },
      {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars1.jpg',
        carInfo_name: '宁波湾·星钻',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars1.jpg',
        carInfo_name: '宁波湾·星钻',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars2.jpg',
        carInfo_name: '美的·鼓楼前',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars3.jpg',
        carInfo_name: '宝丰名苑',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      },
      {
        src: '../../images/cars4.jpg',
        carInfo_name: '蓝光·雍舜府',
        carInfo_detail1: '零首付',
        carInfo_detail2: '家电大礼包',
        carInfo_price: '10000-20000'
      }

    ],
    homeList: [
      {
        src: '../../images/homes1.jpg',
        homeInfo_name: '万达翡翠西湖',
        homeInfo_detail1: 1,
        homeInfo_detail2: 1,
        homeInfo_price: '12500元/㎡'
      },
      {
        src: '../../images/homes2.jpg',
        homeInfo_name: '绿城西府海棠',
        homeInfo_detail1: 2,
        homeInfo_detail2: 2,
        homeInfo_price: '13508元/㎡'
      },
      {
        src: '../../images/homes3.jpg',
        homeInfo_name: '新希望堇麟上府',
        homeInfo_detail1: 1,
        homeInfo_detail2: 1,
        homeInfo_price: '29500元/㎡'
      },
      {
        src: '../../images/homes4.jpg',
        homeInfo_name: '宁波恒大御海天下',
        homeInfo_detail1: 2,
        homeInfo_detail2: 2,
        homeInfo_price: '9500元/㎡'
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 切换 navbar
   */
  swichNav:function(e){
    console.log('navbar');
    var that = this;
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },

  goDetail:function(e){
    var that = this;
    that.setData({
      currentNavbar: e.currentTarget.dataset.idy
    })

    wx.navigateTo({
      url: '../projectList/projectList?currentNavbar=' + that.data.currentNavbar,
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    console.log(111);
  },

  testtest:function(e){
    
  }
})
