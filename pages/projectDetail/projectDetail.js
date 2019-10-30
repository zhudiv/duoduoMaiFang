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
    imaggeDetailList:[],
    tabs: ['地下一层', '地下二层', '储物间'],
    imageLists: [
    {
      name:'地下一层',
        src:'https://www.vvwed.com/static/images/detailList/lunbo1.png'
    },
    {
      name: '地下二层',
      src: 'https://www.vvwed.com/static/images/detailList/lunbo2.jpg'
    },
    {
      name: '储物间',
      src: 'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
    }],

    giftLists2:[],
    giftLists3:[],
    giftLists:[
      {
        name:'礼品一',
        id:'11111',
        images:[
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
        ]
      },
      {
        name: '礼品二',
        images: [
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
        ]
      },
      {
        name: '礼品三',
        images: [
          'https://www.vvwed.com/static/images/detailList/lunbo1.png',
          'https://www.vvwed.com/static/images/detailList/lunbo2.jpg',
          'https://www.vvwed.com/static/images/detailList/lunbo3.jpg'
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      imaggeDetailList: that.data.giftLists[0].images
    })

    api.get('llBuildingProject/form', {
      flag: 'C',
      id:'5b3b98a5eb554cecb3d0b3c3d87a36bc'
    }).then(
      res => {
        console.log('-------------llBuildingProject/form-----------------');
        console.log(res);
        that.setData({
          giftLists2:res.giftsList
        })
        api.get('llBuildingProject/data',{
          flag:'C',
        }).then(
          res => {
            console.log('-------------llBuildingProject/data-----------------');
            console.log(res);
            api.get('llGifts/get', {
              flag: 'C',
              id:'83e02566e1fe45a282a102d4c2047b71'
            }

            ).then(
              res => {
                console.log('-------------llGifts/get-----------------');
                console.log(res.llGoodsList);
                // that.setData({
                //   imaggeDetailList: res.llGoodsList
                // })
              }
            )
          }
        )
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
      imaggeDetailList: that.data.giftLists[e.currentTarget.dataset.id].images
    })

  
    api.get('llGifts/get', {
      flag: 'C',
      id:e.currentTarget.dataset.imgid
    }).then(res => {
      console.log(res.llGoodsList);
      that.setData({
        giftLists3: res.llGoodsList
      })
      app.globalData.gifts = that.data.giftLists3;
    }).catch();
  },
  goGiftDetail:function(e){
    wx.navigateTo({
      url: '../giftDetail/giftDetail',
    })
  }
})