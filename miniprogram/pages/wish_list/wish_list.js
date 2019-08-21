// pages/signin/signin.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    carts: [{}],
    list: [{}],
  },

  //获取全局的carts变量值
  onShow: function () {
    console.log('carts1', app.globalData.carts)
    var tmep = wx.getStorageSync('carts')
    console.log('tmep', tmep)
    this.setData({
      list: app.globalData.carts
    })
    console.log('list content', this.data.list)
  },

  deletWishList:function(e){
    console.log('delete', e)
    var mergelist = app.globalData.carts
    console.log('mergelist', mergelist)
    for (var i = 0; i < mergelist.length; i++){
      if (e.target.id == mergelist[i]._id){
        mergelist.splice(i,1)
      }
    }
    app.globalData.carts = mergelist
    console.log('app', app.globalData.carts)
    wx.setStorageSync('carts', mergelist)
    console.log('now app', wx.getStorageSync('carts'))
    this.setData({
      list: mergelist
    })
    console.log('new list', this.data.list)
  },
  // onShow: function () {
  //   console.log('carts1', app.globalData.carts)
  //   this.setData({
  //     list: app.globalData.carts
  //   })
  //   //console.log('list1111', this.data.list)
  //   db.collection('emall').get({
  //     success: res => {
  //       console.log('gtfghgjhjgjh', res)
  //       if (res.data.length == 0) {
  //         //wx.setStorageSync('carts', null)
  //         wx.showToast({
  //           title: '暂无心愿单',
  //         })
  //         this.setData({
  //           list: ''
  //         })
  //       } else {
  //         var begin = 0;
  //         //console.log('56789876', app.globalData.carts.length)
  //         for (var i = 0; i < app.globalData.carts.length; i++){
  //           console.log('i=', i)
  //           /* 先获取一个本地数据库内容，遍历远程数据库中是否存在这个本地数据记录
  //            * 如果存在这个记录，则保留
  //            * 如果不存在这个数据记录，则删除本地数据记录
  //            */
  //           for (var j = 0; j < res.data.length; j++){
  //             //console.log('gb_id', app.globalData.carts[i]._id)
  //             //console.log('emall_id', res.data[j]._id)
  //             if (app.globalData.carts[i]._id == res.data[j]._id){
  //               // this.setData({
  //               //   list: res.data,
  //               // })
  //               // this.data.list[begin] = deepcopy(res.data[j]);
  //               // begin++;
  //               continue;
  //             }
  //           }
  //           /* 遍历了整个远程数据记录，都未发现本地的这个数据记录
  //            * 删除掉本地该数据记录
  //            */
  //           if (j == res.data.length){
  //             this.data.list.splice(i, 1)
  //           }
  //         }
  //         //console.log('list[0]', this.data.list[0])
  //       }
  //     }
  //   })
  // },


  onLoad: function () {
    // db.collection('emall').get({
    //   success: res => {
    //     console.log('kdjfkdjfjfl', res)
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  toDetail(e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
    console.log('step from index', e)
  }
});