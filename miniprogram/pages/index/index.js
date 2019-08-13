//index.js
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo.get().then(res => {
      //console.log(res.data)
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
  navigatTo: function (event) {
  },
  getUserInfo: function (result) {
    //console.log('haha', result)
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        //console.log('haha', res)
        userInfo.where({
          _openid: res.result.openId
        }).count().then( res => {
          //console.log('res', res.total)
          if (res.total == 0){
            userInfo.add({
              data: result.detail.userInfo
            }).then(res => {
              //console.log('edfcg',res)
              wx.navigateTo({
                url: '../add/add',
              })
            }).catch(err => {
              console.error(err)
            })
          }else{
            wx.navigateTo({
              url: '../add/add',
            })
          }
        });
      
      }
    })
    
  }
})