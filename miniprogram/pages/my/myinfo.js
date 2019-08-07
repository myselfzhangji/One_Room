const userUrl = require('../../config.js').userUrl
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    sex_array: ['保密', '男', '女']
  },

  choseImage: function () {
    this.openAlert('头像暂不支持修改')
  },

  openAlert: function (e) {
    wx.showToast({
      title: e,
      icon: "none"
    })
  },

  bind_statistic: function () {
    wx.navigateTo({
      url: './statistic?uid=' + this.data.userinfo.id,
    })
  },

  bind_mySubInfo(e) {
    console.log("4321", e)
    let type = e.currentTarget.dataset.type
    var _url
    if (type == 'My_certified_Info') {
      _url = "/pages/answer/answer_info/info?subject=&type=My_certified_Info"
    } else if (type == 'My_released_Room') {
      _url = "/pages/answer/answer_chapter/chapter?subject=&type=My_released_Room"
    } else if (type == 'My_comment') {
      _url = "/pages/answer/answer_classify/classify?subject=&type=My_comment"
    } else if (type == 'Contact_us') {
      _url = "/pages/answer/answer_classify/classify?subject=&type=Contact_us"
    } else if (type == 'Aobout_us') {
      _url = "/pages/answer/answer_classify/classify?subject=&type=Aobout_us"
    } else if (type == 'Authorization_settings') {
      _url = "/pages/answer/answer_classify/classify?subject=&type=Authorization_settings"
    }
    wx.navigateTo({
      url: _url,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo: wx.getStorageSync('userInfo')
    })
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
    this.setData({
      userinfo: wx.getStorageSync('userInfo')
    })
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

  }
})