// pages/projectList/projectList.js
const api = require('../../configs/api.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		current: 'tab1',
		current_scroll: 'tab1',
		TabCur: 0,
		scrollLeft: 0,
		tabs:[
			{
				name:'车位'
			},
			{
				name: '住宅'
			}
		],
		lists: [
			{
				index: 0,
				src:'https://www.vvwed.com/static/images/b-goodList/111.png',
				name: '宁波湾·星钻',
				tag1:'零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price:'10000~20000'
			},
			{
				index: 1,
				src: 'https://www.vvwed.com/static/images/b-goodList/222.png',
				name: '美的·鼓楼前',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~40000'
			},
			{
				index: 2,
				src: 'https://www.vvwed.com/static/images/b-goodList/333.png',
				name: '宝丰名苑',
				tag1: '零首付',
				tag2: '',
				tag3: '家电礼大包',
				price: '30000~20000'
			},
			{
				index: 3,
				src: 'https://www.vvwed.com/static/images/b-goodList/444.png',
				name: '蓝光·雍舜府',
				tag1: '零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~20000'
			},
			{
				index: 4,
				src: 'https://www.vvwed.com/static/images/b-goodList/555.png',
				name: '碧桂园都荟名邸',
				tag1: '零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~20000'
			}
		],
		houseLists: [
			{
				index: 0,
				src: 'https://www.vvwed.com/static/images/b-goodList/111.png',
				name: 'aaaaa',
				tag1: '零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '1000~20000'
			},
			{
				index: 1,
				src: 'https://www.vvwed.com/static/images/b-goodList/222.png',
				name: 'bbbbb',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~40000'
			},
			{
				index: 2,
				src: 'https://www.vvwed.com/static/images/b-goodList/333.png',
				name: 'cccc',
				tag1: '零首付',
				tag2: '',
				tag3: '家电礼大包',
				price: '30000~20000'
			},
			{
				index: 3,
				src: 'https://www.vvwed.com/static/images/b-goodList/444.png',
				name: '蓝光·雍舜府',
				tag1: '零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~20000'
			},
			{
				index: 4,
				src: 'https://www.vvwed.com/static/images/b-goodList/555.png',
				name: '碧桂园都荟名邸',
				tag1: '零首付',
				tag2: '送邻里币',
				tag3: '家电礼大包',
				price: '10000~20000'
			}
		],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    console.log('---------------------------onload----')
    var that = this;
    that.setData({
      TabCur: options.currentNavbar,
      scrollLeft: (options.currentNavbar - 1) * 60
    })

    api.get('llBuildingProject/data', {
      flag: 'C',
    }).then(
      xxx => {
        console.log(xxx);
        that.setData({
          lists: xxx
        })
      }
      
    ).catch();

    console.log('-----------');
    console.log(that.data.lists);
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
    console.log('---------------------------onshow----')
    console.log(this.data.lists);
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
	handleChange({ detail }) {
		this.setData({
			current: detail.key
		});
	},

	handleChangeScroll({ detail }) {
		this.setData({
			current_scroll: detail.key
		});
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
	},
  goGiftDetail:function(e){
    
    wx.navigateTo({
      url: '../projectDetail/projectDetail',
    })
  }
})