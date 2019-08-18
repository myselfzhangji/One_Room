// pages/detail/detail.js
const app = getApp()
const db = wx.cloud.database()
const commentInfo = db.collection('comments')
var util = require('../../utils/util.js')
var pictureId = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detailInfo:{},
    commentTxt: '',
    comment: '',
    commentdata: {
      comment:[],
    },
    showcomment:{},
  },

  onShow: function (options){
    // commentInfo.where({
    //   picid: options.id
    // }).get().then(res => {
    //   console.log('where', res.data.length)
    //   this.setData({
    //     showcomment: res.data
    //   })
    //   console.log('length', this.data.showcomment)
    //   //wx.setStorageSync('showComment', this.data.showcomment)
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('option',options)
    pictureId = options.id
    //console.log('pictureId', pictureId)
    this.setData({
      id: options.id
    })
    // const carts = wx.getStorageSync('carts')
    // this.setData({
    //   detailInfo: carts
    // })
    const emallInfo = db.collection('emall').doc(options.id)
    emallInfo.get({
      success:res => {
        //console.log('is get1', res.data)
        this.setData({
          detailInfo:res.data
        })
        //console.log('is get', this.data.detailInfo)    
      }
    })

    // const comm = db.collection('comments')
    // commentInfo.doc(options.id).get({
    //   success: res => {
    //     console.log('is get1', res.data)
    //     this.setData({
    //       showcomment: res.data
    //     })
    //     //console.log('is get', this.data.detailInfo)    
    //   }
    // })
    commentInfo.where({
      picid: options.id
    }).get().then(res => {
      console.log('where', res.data.length)
      this.setData({
        showcomment: res.data
      })
      console.log('length', this.data.showcomment)
      //wx.setStorageSync('showComment', this.data.showcomment)
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

  },

  inputHandler: function (e) {
    //console.log(e)
    this.setData({
      commentTxt: e.detail.value
    })
  },

  confirm: function () {
    //console.log('pictureId', pictureId)
    let userOpenId = wx.getStorageSync('openid')
    //console.log('userOpenId', userOpenId)

    //发送评论
    let d = new Date();
    var data = {};
    let arr =  this.data.commentdata.comment;

    if (this.data.commentTxt) {
      data = {
        comment: this.data.commentTxt,
        username: wx.getStorageSync('username'),
        date: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
        time: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(),
        userId: userOpenId,
        //id: this.data.itemId,
        avatar: wx.getStorageSync('avatar')
      }
      arr.push(data)
      console.log('asdf', arr)
    } else
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })


    // if (!userOpenId) {

    //   wx.showToast({
    //     title: '您还未登录,请先登录',
    //     icon: 'none'
    //   })
    //   setTimeout(() => {
    //     wx.switchTab({
    //       url: '../me/me',
    //     })
    //   }, 1000)
    // } else {
      var cn = this.data.commentdata.comment.length + 1;
      // db.collection('comments').get({
      //   success: res => {
      //     console.log('comments get', res)
      //   }
      // })
      db.collection('comments').add({
        data:{
          commentinfo: this.data.commentTxt,
          picid: pictureId,
          username: wx.getStorageSync('username'),
          avatar: wx.getStorageSync('avatar'),
          date: data.date,
          time: data.time,
        },
        success: res => {
          console.log('comment新增成功')
        },
        fail: e => {
          console.log('comment新增失败')
        }
      })

      commentInfo.where({
        picid: pictureId
      }).get().then(res => {
        console.log('where', res.data.length)
        this.setData({
          showcomment: res.data
        })
        console.log('length', this.data.showcomment)
        //wx.setStorageSync('showComment', this.data.showcomment)
      })

      // wx.cloud.callFunction({
      //   name: 'comment',
      //   data: {
      //     comment: arr,
      //     id: this.data.itemId,
      //     commentNum: cn
      //   },
      //   success: res => {
      //     wx.showToast({
      //       title: '评论成功',
      //     })
      //     this.search()
      //   },
      //   fail: err => {
      //     wx.showToast({
      //       icon: 'none',
      //       title: '评论失败',
      //     })
      //     console.error('[云函数] [comment] 调用失败：', err)
      //   }
      // })
    // }
    console.log(data)
  }
})