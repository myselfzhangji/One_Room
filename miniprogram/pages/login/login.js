// miniprogram/pages/login/login.js
const app = getApp()
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    if_first_login: 0,
    userList: [],        //用户信息
    openId:"",
  },

  /*获取用户信息，微信昵称，微信头像等等*/
  getUserInfo: function (result) {
    wx.switchTab({
      url: '../index/index',
    })
    console.log('hello', result)
    this.setData({
      if_first_login: 1
    })
    wx.setStorageSync('if_first_login', this.data.if_first_login)
    wx.setStorageSync('avatar', result.detail.userInfo.avatarUrl)
    wx.setStorageSync('username', result.detail.userInfo.nickName)
    //console.log('if_first_login=',this.data.if_first_login)
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('erfd', res)
        this.setData({
          openId:res.result.openId
        })
        //console.log('openid', this.data.openId)
        wx.setStorageSync('openid', this.data.openId)
        userInfo.where({
          _openid: res.result.openId
        })
        userInfo.where({
          _openid: res.result.openId
        }).count().then(res => {
          //console.log('res', res.total)
          if (res.total == 0) {
            userInfo.add({
              data: result.detail.userInfo
            }).then(res => {
              //console.log(res)
              // wx.navigateTo({
              //   url: '../add/add',
              // })
            }).catch(err => {
              console.error(err)
            })
          } else {
            // wx.navigateTo({
            //   url: '../add/add',
            // })
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    userInfo.get().then(res => {
      //console.log('who a u',res.data)
      this.setData({
        userList: res.data
      })
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