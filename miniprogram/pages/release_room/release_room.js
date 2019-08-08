//index.js
const app = getApp()
const db  = wx.cloud.database()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    imgUrl:'',
    count: 0
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        //const filePath = res.tempFilePaths[0]
        const filePath = res.tempFilePaths;
        that.setData({
          imgUrl: filePath
        })

        // 上传图片
        // 这部分可以自行处理图片的命名方式，这里图片进行了固定命名为 my-image
       // const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        const cloudPath = [];
        filePath.forEach ((item, i) => {
          cloudPath.push(that.data.count + '_' + i + filePath[i].match(/\.[^.]+?$/)[0])
          that.data.count++
        })
        console.log('cloudPath', cloudPath)

        filePath.forEach((item, i) =>{
          wx.cloud.uploadFile({
            cloudPath: cloudPath[i],
            filePath: filePath[i], 
            success: res => {
              console.log('[上传文件] 成功：', res)

              app.globalData.fileID = res.fileID
              app.globalData.cloudPath = cloudPath
              app.globalData.imagePath = filePath
              console.log('fileID', app.globalData.fileID)
              console.log('cloudPath', app.globalData.cloudPath)
              console.log('imagePath', app.globalData.imagePath)

              wx.navigateTo({
                url: '../storageConsole/storageConsole'
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

  /* 查看房源信息 */
  doViewRoomInfo: function () {
    db.collection('counters').get({
      success(res) {
        console.log('database', res)
      }
    })

    // const {
    //   fileID,
    //   cloudPath,
    //   imagePath,
    // } = app.globalData

    // console.log('xsw2', app.globalData.fileID)

    // this.setData({
    //   fileID,
    //   cloudPath,
    //   imagePath,
    // })

    // wx.cloud.downloadFile({
    //   fileID: 'cloud://test-kmay4.7465-test-kmay4-1259785893/my-image.png', // 文件 ID
    //   success: res => {
    //     // 返回临时文件路径
    //     console.log('aqwsxz',res.tempFilePath)
    //   },
    //   fail: console.error
    // })
  }
})
