// pages/release/release.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["发布房源", "查看我的发布"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    list: [],
    role: ['业主', '转租', '室友', '公寓'],
    clickRoleId: -1,
    rentMode: ['整租', '单间出租', '床位出租'],
    clickrentModeId: -1,
    comment: [{
      value: '限男生',
      selected: false,
      title: '限男生'
    }, {
      value: '限女生',
      selected: false,
      title: '限女生'
    }, {
      value: '可情侣',
      selected: false,
      title: '可情侣'
    }, {
      value: '可办居住证',
      selected: false,
      title: '可办居住证'
    }, {
      value: '可备案',
      selected: false,
      title: '可备案'
    }, {
      value: '不可带宠物',
      selected: false,
      title: '不可带宠物'
    }, {
      value: '带独卫',
      selected: false,
      title: '带独卫'
    }],
    subway: [{
      value: '1号线',
      selected: false,
      title: '1号线'
    }, {
      value: '2号线',
      selected: false,
      title: '2号线'
    }, {
      value: '3号线',
      selected: false,
      title: '3号线'
    }, {
      value: '4号线',
      selected: false,
      title: '4号线'
    }, {
      value: '5号线',
      selected: false,
      title: '5号线'
    }, {
      value: '6号线',
      selected: false,
      title: '6号线'
    }, {
      value: '7号线',
      selected: false,
      title: '7号线'
    }],
    price: 0,
    location:'',
    subway_station:'',
    filepath:'',
    cloudpath:'',
    date: '2019-08-15',
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  valuechange: function (res) {
    //console.log('value', res)
    if (res.detail.value == '') {
      if (res.target.id == 'price'){
        wx.showToast({
          title: '价格不能为空',
          icon: 'none'
        })
      }else if (res.target.id == 'location') {
        wx.showToast({
          title: '小区名称不能为空',
          icon: 'none'
        })
      }
      return
    }

    if (res.target.id == 'price'){
      this.setData({
        price: res.detail.value
      })
      //console.log('price', this.data.price)
    } else if (res.target.id == 'location') {
      this.setData({
        location: res.detail.value
      })
      //console.log('location', this.data.location)
    } else if (res.target.id == 'subway_station') {
      this.setData({
        subway_station: res.detail.value
      })
      //console.log('subway_station', this.data.subway_station)
    }
  },

  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    if (e.target.id == 'comment'){
      let string = "comment[" + e.target.dataset.index + "].selected"
      this.setData({
        [string]: !this.data.comment[e.target.dataset.index].selected
      })
      let detailValue = this.data.comment.filter(it => it.selected).map(it => it.value)
      console.log('所有选中的值为：', detailValue)
    } else if (e.target.id == 'subway'){
      let string = "subway[" + e.target.dataset.index + "].selected"
      this.setData({
        [string]: !this.data.subway[e.target.dataset.index].selected
      })
      let detailValue = this.data.subway.filter(it => it.selected).map(it => it.value)
      console.log('所有选中的值为：', detailValue)
    }
  },

  /**
   * 用户点击Button,字体变色.
   */
  chooseRole: function (res) {
    if (this.data.clickRoleId == res.currentTarget.id) {
      this.setData({
        clickRoleId: -1
      })
      return;
    }
    this.setData({
      clickRoleId: res.currentTarget.id
    })
  },

  chooseRentMode: function (res) {
    if (this.data.clickrentModeId == res.currentTarget.id) {
      this.setData({
        clickrentModeId: -1
      })
      return;
    }
    this.setData({
      clickrentModeId: res.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 4,
    //       sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
    //     });
    //   }
    // });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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

  addMyRoomInfo() {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // const tempFilePaths = res.tempFilePaths
        // const filePath = res.tempFilePaths[0]
        // const tempFile = filePath.split('.')
        // const cloudPath = 'room-' + tempFile[tempFile.length - 2] + '.jpg'
        this.setData({
          filepath: res.tempFilePaths[0],
        })
        console.log('filepath',this.data.filepath)
        const tempFile = res.tempFilePaths[0].split('.')
        this.setData({
          cloudpath: 'room-' + tempFile[tempFile.length - 2] + '.jpg',
        })
      },
      fail: err => {
        console.error(err)
      }
    })
  },

  release(e){
    //console.log('I am here', e)
    wx.cloud.uploadFile({
      cloudPath:this.data.cloudpath,  // 上传至云端的路径
      filePath:this.data.filepath,   // 小程序临时文件路径
      success: res => {
        console.log('I am here',res)
        db.collection('emall').add({
          data: {
            title: this.data.location + '出租',
            price: this.data.price + '/月',
            image: res.fileID,
            inDate: this.data.date,
          },
          success: res2 => {
            //console.log(res2)
            wx.showToast({
              title: '新增成功',
            })
          }
        })
      }
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   const tempFile = tempFilePaths[i].split('.')
        //   const tempcloudPath = 'room-' + tempFile[tempFile.length - 2] + '.jpg'
        //   wx.cloud.uploadFile({
        //     cloudPath: tempcloudPath, // 上传至云端的路径
        //     filePath: tempFilePaths[i], // 小程序临时文件路径
        //     success: res => {
        //       console.log(res)
        //       db.collection('emall').add({
        //         data: {
        //           title: this.data.location + '出租',
        //           price: this.data.price,
        //           image: res.fileID
        //         },
        //         success: res2 => {
        //           console.log(res2)
        //           wx.showToast({
        //             title: '新增成功',
        //           })
        //         }
        //       })
        //     },
        //     fail: console.error
        //   })
        // }
    })
  },

  getMall(e) {
    console.log(e)
    wx.navigateTo({
      url: './show_release',
    })
  },

})