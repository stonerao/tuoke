//app.js

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  getOpentId(url, data) {
    var login = new Promise((resolve, rej) => {
      wx.request({
        url: url,
        data: {
          sid: data
        },
        method: 'get',
        dataType: 'json',
        success: function (res) {
          console.log(res)
          resolve(res.data.data)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }).then((data) => {
      console.log(data)
      wx.login({
        success: function (loginCode) {
          var appid = data.appid; //填写微信小程序appid  
          var secret = data.appsecret; //填写微信小程序secret  

          //调用request请求api转换登录凭证  
          console.log(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${loginCode.code}`)
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=authorization_code&js_code=${loginCode.code}`,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.openid) //获取openid  
            }
          })
        }
      })
    })

    // wx.request({
    //   url:url,
    //   data:{
    //     sid:data
    //   }, 
    //   method: 'get',
    //   dataType: 'json',
    //   success: function(res) {
    //     console.log(res)
    //     // login
    //     wx.login({
    //       success: function (res) {
    //         if (res.code) {
    //           //发起网络请求
    //            console.log(res)
    //         } else {
    //           console.log('获取用户登录态失败！' + res.errMsg)
    //         }
    //       }
    //     });
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  }
})