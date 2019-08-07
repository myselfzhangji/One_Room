// miniprogram/pages/wish_list/wish_list.js
var sliderWidth = 60; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["房源", "求租"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 4,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});