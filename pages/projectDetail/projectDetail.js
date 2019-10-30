// pages/projectDetail/projectDetail.js
const api = require('../../configs/api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    giftTabCur: 0,
    allInfo:'',
    imageDetailList:[],
    tabs: ['地下一层', '地下二层', '储物间'],
    imageLists:[],
    // imageLists: [
    // {
    //   name:'地下一层',
    //   src:'https://www.vvwed.com/static/images/detailList/lunbo1.png'
    // },
    // {
    //   name: '地下二层',
    //   src: 'https://www.vvwed.com/static/images/detailList/lunbo2.jpg'
    // },
    // {
    //   name: '储物间',
    //   src: 'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
    // }],
    // giftsList:[
    //   {
    //     id: '',
    //     name:'',
    //     llgoodsList:[
      // {
      //   name: '地下一层',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo1.png'
      // },{
      //   name: '地下一层',
      //   src: 'https://www.vvwed.com/static/images/detailList/lunbo1.png'
      // }
    //     ]
    //   },
    //   {
    //     name: '',
    //     images: [
    //     ]
    //   },
    //   {
    //     name: '',
    //     images: [
    //     ]
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1111111111111111');
    console.log(options);
    var that = this;
    that.setData({
      // imageDetailList: that.data.giftLists[0].images
    })

    api.get('llBuildingProject/form', {
      flag: 'C',
      id: options.id
    }).then(
      res => {
        that.setData({
          allInfo:res,
          imageLists:res.carList,
          llGiftsList:res.giftsList,
          giftsLists3: res.giftsList[0].llGoodsList
        })
        app.globalData.projectInfo = that.data.allInfo;
        // api.get('llBuildingProject/data',{
        //   flag:'C',
        // }).then(
        //   res => {
        //     api.get('llGifts/get', {
        //       flag: 'C',
        //       id:'83e02566e1fe45a282a102d4c2047b71'
        //     }

        //     ).then(
        //       res => {
        //         console.log(res.llGoodsList);
        //       }
        //     )
        //   }
        // )
      }
      
    ).catch();
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
  tabSelect:function(e){
    var that = this;
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  giftTabSelect: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      giftTabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      // imageDetailList: that.data.llGiftsList[e.currentTarget.dataset.id].id
      giftsLists3: that.data.llGiftsList[e.currentTarget.dataset.id].llGoodsList
    })

  
    // api.get('llGifts/get', {
    //   flag: 'C',
    //   id:e.currentTarget.dataset.imgid
    // }).then(res => {
    //   console.log(res.llGoodsList);
    //   that.setData({
    //     giftsLists3: res.llGoodsList
    //   })
    //   app.globalData.gifts = that.data.giftsLists3;
    // }).catch();
  },
  goGiftDetail:function(e){
    var that = this;
    app.globalData.gifts = that.data.llGiftsList[that.data.giftTabCur].llGoodsList
    wx.navigateTo({
      url: '../giftDetail/giftDetail'
    })
  }
})