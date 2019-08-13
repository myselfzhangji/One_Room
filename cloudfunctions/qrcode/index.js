// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got');
var appid = 'wx40bb073b88636bbb';
var appsecret = 'f294f115d44ba0151bc32ed00a755585';
var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + appsecret

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const token_response = await got.get(url)
  let token = JSON.parse(token_response.body).access_token;
  let fStream = await got('https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "path": "pages/photo/photo" + event
    })
  })
  return await cloud.uploadFile({
    cloudPath: 'qrcode.jpg',
    fileContent: fStream.body,
  })
}