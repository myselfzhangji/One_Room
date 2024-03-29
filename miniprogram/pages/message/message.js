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

  onShow: function() {
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
  },

  deletmsg:function(e){
    console.log('delete msg', e.currentTarget.id)
    commentInfo.doc(e.currentTarget.id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err =>{
        wx.showToast({
          title: '删除失败',
        })
      }
    })

    /* 删除完成之后，重新加载一次新的消息列表 */
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

  toRoomDetail:function(e){
    const id = e.currentTarget.id
    console.log('picid', id)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log(e)
  }
});