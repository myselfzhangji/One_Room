// pages/release_room/show_release.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hint: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('emall').get({
      success: res => {
        console.log('kdjfkdjfjfl', res)
        this.setData({
          list: res.data
        })
      }
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
    return {
      title: 'One Room 一间房'
    }
    // db.collection('emall').get({
    //   success: res => {
    //     console.log('minminmin', res)
    //     console.log('hint', res.data[0].title)
    //     this.setData({
    //       hint: res.data[0].title
    //     })
    //     return {
    //       title: this.data.hint
    //     }
    //   }
    // })
  }
})