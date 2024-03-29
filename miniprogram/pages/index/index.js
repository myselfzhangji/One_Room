//index.js
//获取应用实例

const app = getApp()
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')

Page({
  /* 一个商品信息可能对应多张图片
   * 在首页index显示页面，只显示第一张图片，在detail详情页面会显示所有图片
   */
  data: {
    list: [{}, {}],        //商品信息           
    //userList: [],        //用户信息
  },

 /* 添加到心愿单 */
  addCart(e){
    console.log('jdhjfhjkhjk',e)
    const {item} = e.currentTarget.dataset
    const i = app.globalData.carts.findIndex(v=>v._id==item._id)
    if (i > -1){
      //已经添加过一次购物车，数量加1
      app.globalData.carts[i].num +=1
      //console.log('app.globalData.carts.num', app.globalData.carts[i].num)
    } else {
      item.num = 1
      app.globalData.carts.push(item)
      console.log('carts', app.globalData.carts)
    }
    wx.setStorageSync('carts', app.globalData.carts)
    const ddd = wx.getStorageSync('carts')
    console.log('ddd', ddd)
  },

  /* 先将本地数据库和远程数据库进行同步
   * 解决如果远程数据库删除一个记录后，如果不同步的话，本地数据记录仍然存在报错的问题
   */
  onShow: function () {
    //wx.showTabBar()    //显示app.json定义的tarBar
    //console.log('12345')
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('1234', res)
        //e.detail.userInfo.openid = res.result.openid
        //需要openid
        //app.globalData.userInfo = e.detail.userInfo
        // this.setData({
        //   userInfo: e.detail.userInfo
        // })
        // wx.setStorageSync('userInfo', e.detail.userInfo)
      }
    })

    db.collection('emall').get({
      success: res => {
        console.log('current', res.data)
        wx.setStorageSync('carts', res.data)
      }
    })

    this.getMall(true)
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onPullDownRefresh(){
    this.getMall(true)
  },
  // onReachBottom(){
  //   this.page += 1
  //   this.getMall(true)
  // },
  getMall(isInit){
    const PAGE = 5
    //console.log('get emall')
    db.collection('emall').get({
      success: res => {
        //console.log('ujhgty', res.data)

        if(isInit){
          this.setData({
            list: res.data,
          })
          console.log('haredf', this.data.list)
        } else {
          this.setData({
            list: this.data.list.concat(res.data)
          })
          wx.stopPullDownRefresh()
        }
        wx.hideLoading()
      }
    })
    //console.log('haredf', this.data.list)
  },

  onLoad: function () {
    // wx.showShareMenu()
    // userInfo.get().then(res => {
    //   //console.log('who a u',res.data)
    //   this.setData({
    //     userList: res.data
    //   })
    // })
  },

  getUserInfo: function (result) {
    wx.switchTab({
      url: '../wish_list/wish_list',
    })
    //console.log('hello', result)
    this.setData({
      if_first_login:1
    })
    wx.setStorageSync('if_first_login', this.data.if_first_login)
    //console.log('if_first_login=',this.data.if_first_login)
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        //console.log('erfd', res)
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

  toDetail(e){
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
    console.log('step from index',e)
  }
})
