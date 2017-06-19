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
      console.log('调用登录接口');
      //调用登录接口
      wx.login({
        success: function (res) {
          //登录成功  
          if (res.code) { 
          // 这里是用户的授权信息每次都不一样  
          var code = res.code;   
          wx.getUserInfo({
            success: function (res2) {
              console.log(res2)
              that.globalData.userInfo = res2.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              var username = res2.userInfo.nickName
              var img = res2.userInfo.avatarUrl
              console.log("code:" + code);
              console.log("username:" + username);
              console.log("img:" + img);
            }
          })
          }
          else{
            wx.showModal({
              title: '提示',
              content: '获取用户登录态失败！' + res.errMsg
            })  
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  getOpentId2(url, data) {
    // 调用登录接口  
    wx.login({
      // login流程  
      success: function (res) {
        console.log(res)
        //登录成功  
        if (res.code) {
          // 这里是用户的授权信息每次都不一样  
          var code = res.code;
          wx.getUserInfo({
            // getUserInfo流程  
            success: function (res2) {
              console.log(res2)
              //that.globalData.userInfo = res2.userInfo
              //typeof cb == "function" && cb(that.globalData.userInfo)
              var username = res2.userInfo.nickName
              var province = res2.userInfo.province
              var city = res2.userInfo.city
              var img = res2.userInfo.avatarUrl
              // 请求自己的服务器  
              console.log("code=" + code);
              console.log("username=" + username);
              console.log("img=" + img);

              wx.showModal({
                title: '欢迎您',
                content: '' + username
              })
              //Login(code, username, img);
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户登录态失败！' + res.errMsg
          })
        }
      }
    })
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
              console.log(res);
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