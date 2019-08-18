// pages/message/message.js
const app = getApp()
const db = wx.cloud.database()
const commentInfo = db.collection('comments')

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["发出", "收到"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    showcomment: {},
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    let userOpenId = wx.getStorageSync('openid')
    //console.log('userOpenId', userOpenId)
    commentInfo.where({
      _openid: userOpenId
    }).get().then(res => {
      console.log('where', res)
      this.setData({
        showcomment: res.data
      })
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});