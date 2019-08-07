// miniprogram/config.js.js
//小程序配置文件

// var apiUrl ="https://zjgsujiaoxue.applinzi.com/index.php/Api"
var apiUrl = "http://127.0.0.1/1/index.php/Api"
//var apiUrl ="https://testweixincode.applinzi.com/index.php/Api"
var appid = "wx40bb073b88636bbb"

var config = {
  apiUrl,
  appid,
  wxUrl: `${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  courseId: 10016
};

module.exports = config