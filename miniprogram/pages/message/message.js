// pages/message/message.js
const app = getApp()
const db = wx.cloud.database()
const msg = db.collection('message')

Page({
  data: {
    msgData: []
  },
  changeInputValue(ev) {
    this.setData({
      inputVal: ev.detail.value
    })
  },
  //删除留言
  DelMsg(ev) {
    var n = ev.target.dataset.index;

    var list = this.data.msgData;
    list.splice(n, 1);

    this.setData({
      msgData: list

    });
  },
  //添加留言
  addMsg() {
    var list = this.data.msgData;
    console.log('hdhjfhh',list)
    list.push({
      msg: this.data.inputVal
    });
    //更新
    this.setData({
      msgData: list,
      inputVal: ''
    });
    msg.add({
      data: {
        msg: list
      },
      success: res2 => {
        //console.log(res2)
        wx.showToast({
          title: '新增成功',
        })
      }
    })
  },
})