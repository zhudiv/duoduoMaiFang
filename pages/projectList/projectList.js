// pages/projectList/projectList.js
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
				msg: 'this is a template',
				time: '2016-09-15'
			},
			{
				index: 0,
				src: 'https://www.vvwed.com/static/images/b-goodList/222.png',
				msg: 'this is a template',
				time: '2016-09-15'
			},
			{
				index: 0,
				src: 'https://www.vvwed.com/static/images/b-goodList/333.png',
				msg: 'this is a template',
				time: '2016-09-15'
			},
			{
				index: 0,
				src: 'https://www.vvwed.com/static/images/b-goodList/444.png',
				msg: 'this is a template',
				time: '2016-09-15'
			},
			{
				index: 0,
				src: 'https://www.vvwed.com/static/images/b-goodList/555.png',
				msg: 'this is a template',
				time: '2016-09-15'
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
	}
})